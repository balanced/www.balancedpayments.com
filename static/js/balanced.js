/*global testimonials:true */

(function(ctx) {
	var balanced = ctx.balanced = {
		menu: function() {
			$(".toggle-child-menu, .sidebar-child-menu-left .icon-x").click(function(e) {
				e.preventDefault();

				$("body, html").css("overflow-x", "hidden");
				$(".sidebar-child-menu-left ul").not("#sidebar-child-menu-left-product").css("display", "none");
				$("#sidebar-child-menu-left-product").css("display", "block");
				$(".global-wrapper, .sidebar-child-menu-left").toggleClass("expanded");
			});

			var $menu = $('#menu'),
				$menulink = $('#mobile-menu'),
				$menuTrigger = $('.has-submenu > a');

			$menulink.click(function(e) {
				e.preventDefault();

				$menulink.toggleClass('active');
				$menu.toggleClass('active');
			});

			$(document.body).on('click touchstart touchmove', function(e) {
				var $self = $(e.target);
				if ($self.is('.site-nav') || $self.parents().filter('.site-nav').length > 0) {
					return;
				}

				$menulink.removeClass('active');
				$menu.removeClass('active');
			});

			$menuTrigger.click(function(e) {
				e.preventDefault();

				var $this = $(this);
				$this.toggleClass('active').next('ul').toggleClass('active');
			});

			// $(document).pjax('[data-pjax] a, a[data-pjax]', '#pjax-container');
		},
		achDebits: function() {
			var carousel = $.fn.carousel && $(".carousel").carousel({
				interval: false
			});

			$(".how-it-works .step-boxes a").on('click', function(e) {
				var step = parseInt($(e.currentTarget).find(".box").attr("data-step"), 10);

				if (step) {
					$(".carousel").carousel(step - 1);
				}
			});

			$(".carousel").on("slid", function(e) {
				var step = parseInt($("#how-it-works-carousel .carousel-inner .item.active").attr("data-step"), 10);

				if (step) {
					$(".how-it-works .step-boxes .box").removeClass("box-active");
					$(".how-it-works .step-boxes [data-step=" + step + "]").addClass("box-active");
				}
			});
		},
		customers: function() {
			$('.customer-wall .masonry').isotope({
				itemSelector: '.card',
				sortBy: 'random'
			});

			$('.customer-wall-header .nav li').on('click', function(evt) {
				evt.preventDefault();

				var $this = $(this);
				var filter = $this.attr('data-filter');

				if (filter) {
					$('.customer-wall .masonry').isotope({
						filter: '.' + filter
					});
				} else {
					$('.customer-wall .masonry').isotope({
						filter: '*'
					});
				}

				$this.addClass('selected').siblings().removeClass('selected');
			});

			$.each(testimonials, function(k, testimonial) {
				var i = new Image();
				i.src = testimonial.background;

				var g = new Image();
				g.src = testimonial.thumb;

				var t = new Image();
				t.src = testimonial.logo;
			});

			$('.video-testimonial-image .watch-video').on('click', function(evt) {
				evt.preventDefault();

				var $videoTestimonial = $('.video-testimonial-image');
				$videoTestimonial.addClass('video-playing');

				var $selected = $videoTestimonial.find('.thumb-container .thumb.selected');
				var id = $selected.attr('id');

				var $iframe = $('.video-modal iframe').attr('src', '//www.youtube.com/embed/' + testimonials[id].ytVideoId + '?rel=0');
				$('.video-modal').modal('show').off('hide.balanced').on('hide.balanced', function() {
					$videoTestimonial.removeClass('video-playing');
					$iframe.attr('src', '');
				});
			});

			$('.video-testimonial-image .thumb-container .thumb').on('click', function(evt) {
				evt.preventDefault();

				var $this = $(this);
				if ($this.hasClass('selected')) {
					return;
				}

				var id = $this.attr('id');

				if (!testimonials[id]) {
					return;
				}

				var testimonial = testimonials[id];

				var $videoTestimonial = $('.video-testimonial-image');
				$videoTestimonial.find('.background-image:hidden')
					.css({
						'background-image': 'url(' + testimonial.background + ')',
						'z-index': '-1'
					})
					.fadeIn('slow', function() {
						$(this).siblings('.background-image').hide();
						$(this).css('z-index', '-2');
					});

				var $banner = $videoTestimonial.find('.banner');
				$banner.find('.banner-content-text').html(testimonial.description);
				$banner.find('.banner-logo img').attr('src', testimonial.logo);
				$banner.find('.banner-video-thumbnail img').attr('src', testimonial.thumb);

				$this.addClass('selected').siblings().removeClass('selected');
			});
		},
		openCompany: function() {
			var totalRepos = 0;
			var completedContributorRequests = 0;

			var onCompleteRepos = function(response) {
				if (response.status === 200) {
					var repos = response.responseJSON;
					repos = repos.sort(function(a, b) {
						return b.watchers_count - a.watchers_count;
					});

					for (var i = 0, l = repos.length; i < l; i++) {
						// Don't include forks
						if (repos[i].fork) {
							continue;
						}

						totalRepos++;

						// Fire off ajax request to get contributors
						ajaxOptions.complete = onCompleteContributors;
						jQuery.ajax(repos[i].contributors_url, ajaxOptions);

						var $template = $("section.github .repos .repos-container .repo-template").clone().removeClass("repo-template");

						if (i === 0) {
							$template.addClass("first");
						}

						$template.find("p.name a").attr("href", repos[i].html_url).html(repos[i].name);
						$template.find("p.description").html(repos[i].description);
						$template.find("p.lang").html(repos[i].language);
						$template.find("p.stars span").html(repos[i].watchers_count);

						$("section.github .repos .repos-container").append($template);
					}

					$("section.github .repos .loading").css("display", "none");
					$("section.github .repos .counts h1").html(totalRepos);
				}
			};

			var onCompleteContributors = function(response) {
				completedContributorRequests++;

				if (response.status === 200) {
					var contributors = response.responseJSON;

					for (var i = 0; i < contributors.length; i++) {
						// Don't add the same user more than once
						if ($("section.github .contributors .contributors-container #" + contributors[i].id).length === 0) {
							var userId = contributors[i].id;
							var login = contributors[i].login;
							var url = contributors[i].html_url;
							var avatarUrl = contributors[i].avatar_url;

							var $template = $("section.github .contributors .contributors-container .contributor-template").clone().removeClass("contributor-template");

							$template.attr("id", userId);
							$template.find("a").attr("href", url);
							$template.find("img.avatar").attr("src", avatarUrl).attr("alt", login);
							$template.find("p.user").html(login);

							$("section.github .contributors .contributors-container").append($template);
						}
					}
				}

				if (completedContributorRequests === totalRepos) {
					var totalContributors = $("section.github .contributors .contributors-container .contributor").not(".contributor-template").length;
					$("section.github .contributors .loading").css("display", "none");
					$("section.github .contributors .counts h1").html(totalContributors);
				}
			};

			var ajaxOptions = {
				crossDomain: true,
				dataType: 'json',
				timeout: 5000,
				cache: false,
				data: {
					per_page: 100
				},
				headers: {
					'Authorization': 'token 5db390dd3591d5f7d3646ce5cf62245328fe4ee3'
				}
			};

			ajaxOptions.complete = onCompleteRepos;
			jQuery.ajax("https://api.github.com/orgs/balanced/repos", ajaxOptions);
		},
		payouts: function() {
			var $routingNumber = $('.routing-number'),
				$routingNumberInput = $routingNumber.find('input');

			function validateRoutingNumber(routingNumber, cb) {
				if (!routingNumber || !routingNumber.length || routingNumber.length !== 9) {
					return cb();
				}

				$.ajax({
					url: 'https://js.balancedpayments.com/v1/bank_accounts/routing_numbers/' + routingNumber,
					dataType: 'json',
					success: function(data) {
						return cb(data);
					},
					error: function() {
						return cb();
					}
				});
			}

			function routingNumberValidationSuccess(bankInfo) {
				$routingNumber.addClass('success').removeClass('error').find('.description span').html('Bank: ' + bankInfo.customer_name);
			}

			function routingNumberValidationError() {
				$routingNumber.addClass('error').removeClass('success').find('.description span').html('<strong>Invalid Routing Number:</strong> Please enter a valid 9-digit routing number.');
			}

			$routingNumberInput.on('blur', function(event) {
				var val = $routingNumberInput.val();

				validateRoutingNumber(val, function(bankInfo) {
					if (bankInfo) {
						routingNumberValidationSuccess(bankInfo);
					} else {
						routingNumberValidationError();
					}
				});
			});

			$routingNumberInput.on('keyup', function(event) {
				var val = $routingNumberInput.val();

				validateRoutingNumber(val, function(bankInfo) {
					if (bankInfo) {
						routingNumberValidationSuccess(bankInfo);
					} else {
						$routingNumber.removeClass('success').find('.description span').html('Enter your 9-digit routing number.');
					}
				});
			});
		},
		pricing: function() {
			var calculateEstimatedRates = function() {
				var volume = $(".calculator form input[name='estimatedVolume']").val();

				volume = parseInt(volume.replace(/[^\d\.]/g, ''), 10);

				if (isNaN(volume)) {
					$(".effective-rate-value").text("");
					return "";
				}

				var vol100k = 0.029 * Math.min(volume, 100000);
				var vol400k = 0.027 * (volume > 100000 ? Math.min(volume - 100000, 400000) : 0);
				var vol500kplus = 0.024 * (volume > 500000 ? (volume - 500000) : 0);

				var rateText = "2.9% + 30¢";

				if (volume > 100000) {
					var rate = (vol100k + vol400k + vol500kplus) / volume;
					rateText = (rate * 100).toFixed(2) + "% + 30¢";
				}

				$(".effective-rate-value").text(rateText);
				return rateText;
			};

			calculateEstimatedRates();

			$(".calculator form input").on('input', function() {
				calculateEstimatedRates();
			});
		},
		international: function() {
			function animateInView(elem, animation) {
				$(elem).one('inview', function(event, isInView, visiblePartX, visiblePartY) {
					if (isInView) {
						$(elem).addClass(animation);
					}
				});
			}

			function resizeCover() {
				var windowWidth = $(window).width();
				if (windowWidth > 960) {
					$(".background-image").css("background-size", windowWidth);
				} else {
					$(".background-image").css("background-size", "auto 510px");
				}
			}

			// animate icons 
			animateInView(".benefit1", "slide-up");
			animateInView(".benefit2", "slide-up");

			$('.forex-map').one('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView) {
					$('.animate-cad').addClass('bounce-down');

					setTimeout(function() {
						$('.animate-eur').addClass('bounce-down');

						setTimeout(function() {
							$('.animate-brl').addClass('bounce-down');
						}, 200);
					}, 200);
				}
			});


			// toggle currency list
			$(".forex .view-all, .forex .close").click(function(e) {
				e.preventDefault();
				$(".currency-list").slideToggle(200);
				$(".view-all").toggleClass("open");
			});

			// resize cover image. TODO: make it generally avaible to other pages.
			resizeCover();
			$(window).resize(resizeCover);
		},
		mailchimp: function() {
			var fnames = new Array();
			var ftypes = new Array();
			fnames[0] = 'EMAIL';
			ftypes[0] = 'email';
			fnames[1] = 'FNAME';
			ftypes[1] = 'text';
			fnames[2] = 'LNAME';
			ftypes[2] = 'text';
			try {
				var jqueryLoaded = jQuery;
				jqueryLoaded = true;
			} catch (err) {
				var jqueryLoaded = false;
			}
			var head = document.getElementsByTagName('head')[0];

			var err_style = '';
			try {
				err_style = mc_custom_error_style;
			} catch (e) {
				err_style = '#mc_embed_signup input.mce_inline_error{border-color:#6B0505;} #mc_embed_signup div.mce_inline_error{margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff;}';
			}
			var head = document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = err_style;
			} else {
				style.appendChild(document.createTextNode(err_style));
			}
			head.appendChild(style);
			setTimeout('mce_preload_check();', 250);

			var mce_preload_checks = 0;

			function mce_preload_check() {
				if (mce_preload_checks > 40) return;
				mce_preload_checks++;
				try {
					var jqueryLoaded = jQuery;
				} catch (err) {
					setTimeout('mce_preload_check();', 250);
					return;
				}
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'http://downloads.mailchimp.com/js/jquery.form-n-validate.js';
				head.appendChild(script);
				try {
					var validatorLoaded = jQuery("#fake-form").validate({});
				} catch (err) {
					setTimeout('mce_preload_check();', 250);
					return;
				}
				mce_init_form();
			}

			function mce_init_form() {
				jQuery(document).ready(function($) {
					$('#mce-EMAIL').focus(function() {
						$(this).removeClass('mce_inline_error');
					});
					var options = {
						errorClass: 'mce_inline_error',
						errorElement: 'div',
						onkeyup: function() {},
						onfocusout: function() {},
						onblur: function() {}
					};
					var mce_validator = $("#mc-embedded-subscribe-form").validate(options);
					$("#mc-embedded-subscribe-form").unbind('submit'); //remove the validator so we can get into beforeSubmit on the ajaxform, which then calls the validator
					options = {
						url: 'http://balancedpayments.us2.list-manage.com/subscribe/post-json?u=30382d347d3689814ca424c89&id=c8d0241856&c=?',
						type: 'GET',
						dataType: 'json',
						contentType: "application/json; charset=utf-8",
						beforeSubmit: function() {
							$('#mce_tmp_error_msg').remove();
							$('.datefield', '#mc_embed_signup').each(
								function() {
									var txt = 'filled';
									var fields = new Array();
									var i = 0;
									$(':text', this).each(
										function() {
											fields[i] = this;
											i++;
										});
									$(':hidden', this).each(
										function() {
											var bday = false;
											if (fields.length == 2) {
												bday = true;
												fields[2] = {
													'value': 1970
												}; //trick birthdays into having years
											}
											if (fields[0].value == 'MM' && fields[1].value == 'DD' && (fields[2].value == 'YYYY' || (bday && fields[2].value == 1970))) {
												this.value = '';
											} else if (fields[0].value == '' && fields[1].value == '' && (fields[2].value == '' || (bday && fields[2].value == 1970))) {
												this.value = '';
											} else {
												if (/\[day\]/.test(fields[0].name)) {
													this.value = fields[1].value + '/' + fields[0].value + '/' + fields[2].value;
												} else {
													this.value = fields[0].value + '/' + fields[1].value + '/' + fields[2].value;
												}
											}
										});
								});
							$('.phonefield-us', '#mc_embed_signup').each(
								function() {
									var fields = new Array();
									var i = 0;
									$(':text', this).each(
										function() {
											fields[i] = this;
											i++;
										});
									$(':hidden', this).each(
										function() {
											if (fields[0].value.length != 3 || fields[1].value.length != 3 || fields[2].value.length != 4) {
												this.value = '';
											} else {
												this.value = 'filled';
											}
										});
								});
							return mce_validator.form();
						},
						success: mce_success_cb
					};
					$('#mc-embedded-subscribe-form').ajaxForm(options);
				});
			}

			function mce_success_cb(resp) {
				$('#mce-success-response').hide();
				$('#mce-error-response').hide();
				if (resp.result == "success") {
					$('.notify-me .title').hide();
					$('.notify-me .mc-field-group').hide();
					$('#mce-' + resp.result + '-response').fadeIn(200);
					$('#mce-' + resp.result + '-response').html("To complete the process, please click the link in the email we just sent you.");
					$('#mc-embedded-subscribe-form').each(function() {
						this.reset();
					});
				} else {
					var index = -1;
					var msg;
					try {
						var parts = resp.msg.split(' - ', 2);
						if (parts[1] == undefined) {
							msg = resp.msg;
						} else {
							i = parseInt(parts[0]);
							if (i.toString() == parts[0]) {
								index = parts[0];
								msg = parts[1];
							} else {
								index = -1;
								msg = resp.msg;
							}
						}
					} catch (e) {
						index = -1;
						msg = resp.msg;
					}
					try {
						if (index == -1) {
							$('#mce-' + resp.result + '-response').show();
							$('#mce-' + resp.result + '-response').html(msg);
						} else {
							err_id = 'mce_tmp_error_msg';
							html = '<div id="' + err_id + '" style="' + err_style + '"> ' + msg + '</div>';

							var input_id = '#mc_embed_signup';
							var f = $(input_id);
							if (ftypes[index] == 'address') {
								input_id = '#mce-' + fnames[index] + '-addr1';
								f = $(input_id).parent().parent().get(0);
							} else if (ftypes[index] == 'date') {
								input_id = '#mce-' + fnames[index] + '-month';
								f = $(input_id).parent().parent().get(0);
							} else {
								input_id = '#mce-' + fnames[index];
								f = $().parent(input_id).get(0);
							}
							if (f) {
								$(f).append(html);
								$(input_id).focus();
							} else {
								$('#mce-' + resp.result + '-response').show();
								$('#mce-' + resp.result + '-response').html(msg);
							}
						}
					} catch (e) {
						$('#mce-' + resp.result + '-response').show();
						$('#mce-' + resp.result + '-response').html(msg);
					}
					$('#mc-embedded-subscribe-form').each(function() {
						this.reset();
					});
				}
			}
		}
	};
}(window));

$(balanced.menu);
