/*global testimonials:true */

(function(ctx) {
	function animateInView(elem, animation) {
		$(elem).one('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {
				$(elem).addClass(animation);
			}
		});
	}

	function fadeInInView(elem) {
		$(elem).one('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {
				$(elem).fadeIn(1000);
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

			resizeCover();
			$(window).resize(resizeCover);
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
				}
			};

			ajaxOptions.complete = onCompleteRepos;
			jQuery.ajax("https://api.github.com/orgs/balanced/repos?client_id=bda58293b5d9ede74ab7&client_secret=62cfb784097a180bcb5169d9528a23538340ecf0", ajaxOptions);
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
			// animate icons
			animateInView(".benefit1", "slide-up");
			animateInView(".benefit2", "slide-up");

			$('.intro-image').one('inview', function(event, isInView, visiblePartX, visiblePartY) {
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

		},
		pushToCard: function() {
			// display github issues
			var repos = {};
			var repos_length = 0;
			var count = 0;

			var populateIssues = function(issues) {
				count++;
				var open_count = 0;
				var closed_count = 0;

				_.each(issues, function(issue) {
					_.each(issue.labels, function(label) {
						var repo_name = issue.html_url.split('/')[4];

						if (!_.has(repos, repo_name)) {
							repos[repo_name] = {};
						}

						if (!_.has(repos[repo_name], 'issues')) {
							repos[repo_name]['issues'] = {};
						}

						if (!_.has(repos[repo_name]['issues'], issue.title)) {
							repos[repo_name]['issues'][issue.title] = {};
						}

						if (issue.state === 'open') {
							open_count++;
						} else {
							closed_count++;
						}

						var days_ago = moment(new Date(issue.created_at)).fromNow();

						repos[repo_name]['issues'][issue.title] = {
							title: issue.title,
							html_url: issue.html_url,
							author: issue.user.login,
							created_at: days_ago,
							status: issue.state
						};
						repos[repo_name]['repo_name'] = repo_name;
						repos[repo_name]['open_count'] = open_count;
						repos[repo_name]['closed_count'] = closed_count;
					});
				});

				if (count === repos_length) {
					$(".loading").fadeOut(200);

					// sort repos by number of open & closed issues
					repos = _.sortBy(repos, function(repo) {
						return -(repo.open_count + repo.closed_count); // sort descending
					});

					_.each(repos, function(repo, repo_name) {
						var $repoTemplate = $(".github table.items tr.repo-template").clone().removeClass('repo-template');
						$repoTemplate.find(".repo-name").text(repo.repo_name);
						$repoTemplate.find(".completed").text(repo.closed_count);
						$repoTemplate.find(".remaining").text(repo.open_count);
						$repoTemplate.attr('data-repo', repo.repo_name);
						$repoTemplate.appendTo('tbody').fadeIn(300);
						$("tbody").append('<tr class="issues" data-repo="' + repo.repo_name + '"><td colspan="3"></td></tr>');

						_.each(repo.issues, function(issue) {

							var $issueTemplate = $(".github table.items div.issue-template").clone().removeClass('issue-template');
							$issueTemplate.find("a.issue-name").attr("href", issue.html_url);
							$issueTemplate.find("a.issue-name").text(issue.title);
							$issueTemplate.find(".author").text(issue.author);
							$issueTemplate.find(".created-at").text(issue.created_at);
							$issueTemplate.find(".status").text(issue.status);
							$issueTemplate.find(".status").addClass(issue.status);
							$('tbody tr.issues[data-repo="' + repo.repo_name + '"] td').append($issueTemplate);
						});
					});

					$(".issue-name").each(function() {
						if ($(this).width() > 400) {
							$(this).css({
								width: "60%",
								display: "inline-block",
								float: "left",
								marginRight: 0
							});
						}
					});
				}
			};

			// pull github issues
			$.ajax({
				url: 'https://api.github.com/orgs/balanced/repos?client_id=bda58293b5d9ede74ab7&client_secret=62cfb784097a180bcb5169d9528a23538340ecf0',
				dataType: 'json',
				success: function(response) {
					var repos = response.sort(function(a, b) {
						return b.watchers_count - a.watchers_count;
					});
					for (var i = 0, l = repos.length; i < l; i++) {
						if (repos[i].fork) {
							continue;
						}
						repos_length += 1;

						var issues_url = repos[i].issues_url.split('{')[0]; // remove name from issues/{name}

						$.ajax({
							url: issues_url + '?labels=push+to+card&state=all&client_id=bda58293b5d9ede74ab7&client_secret=62cfb784097a180bcb5169d9528a23538340ecf0',
							dataType: 'json',
							timeout: 5000,
							cache: false,
							success: populateIssues
						});
					}
				}
			});

			// animation
			animateInView(".benefit", "slide-up");

			$('.intro-image').one('inview', function(event, isInView, visiblePartX, visiblePartY) {
				$('.title-wrapper').animate({
					opacity: 1
				}, 1000);
				$('.mp-icon, .card-in-hand-icon').addClass("slide-in");

				setTimeout(function() {
					$('.mp-icon, .card-in-hand-icon').removeClass("slide-in");
					$('.money.first, .money.second, .money.third').addClass("slide-down-right");
				}, 600);
			});

			// expand/collapse github repos
			$('.github').click(".repo", function(e) {
				var $repo = $(e.target).parent();
				$repo.toggleClass('expanded');
				var $issues = $('.issues[data-repo="' + $repo.attr('data-repo') + '"]');

				if ($issues.hasClass('expanded')) {
					$issues.find('div').slideUp(200, function() {
						$issues.removeClass('expanded');
					});
				} else {
					$issues.addClass('expanded');
					$issues.find('div').slideDown(200);
				}
			});

			var expandedAll = false;
			$('.show-all').click(function(e) {
				e.preventDefault();
				if (expandedAll) {
					$('.issues td div').slideUp(200, function() {
						$('.repo, .issues').removeClass('expanded');
					});
					$(e.currentTarget).text("Show all issues");
				} else {
					$('.repo, .issues').addClass('expanded');
					$('.issues td div').slideDown(200);
					$(e.currentTarget).text("Hide all issues");
				}
				expandedAll = !expandedAll;
			});
		}
	};
}(window));

$(balanced.menu);
