(function() {
	var MARKETPLACE_URI = '/v1/marketplaces/TEST-MP5JtbXVDZkSGruOJyNasPqy'; // some crap with document.location
	var SERVER_ROOT = 'https://api.balancedpayments.com';
	var SERVER_URL = SERVER_ROOT + MARKETPLACE_URI;

	var URL = 'https://api.balancedpayments.com/v1/api_keys';

	function addQueryParamsToUrl(url, params){
		var paramStr = $.param(params);
		return (url.indexOf('?') != -1 ? url.split('?')[0] + '?' + paramStr + '&' + url.split('?')[1] : (url.indexOf('#') != -1 ? url.split('#')[0] + '?' + paramStr + '#' + url.split('#')[1] : url + '?' + paramStr));
	}

	function pick(obj) {
		var copy = {};
		var keys = Array.prototype.slice.call(arguments, 1);

		$.each(keys, function(i, key) {
			if (key in obj) {
				copy[key] = obj[key];
			}
		});

		return copy;
	}

	function leftPad(number, targetLength) {
		var output = Math.floor(number) + '';

		while (output.length < targetLength) {
			output = '0' + output;
		}

		return output;
	}

	function fillInFormWithQueryParams($form, queryParams) {
		var applicationType = queryParams['merchant[type]'];
		if (applicationType) {
			$('.application-type a.' + applicationType).trigger('click');
		}

		function fillInWithQueryParam(selector, keys) {
			$.each(keys, function (i, key) {
				if (queryParams[key]) {
					$form.find(selector).val(queryParams[key]);
					return false;
				}
			});
		}

		fillInWithQueryParam('#email_address', ['email_address']);
		fillInWithQueryParam('#name', ['name', 'merchant[person[name]]', 'person[name]', 'merchant[name]']);
		fillInWithQueryParam('#phone_number', ['name', 'merchant[name]', 'merchant[person[name]]']);
		fillInWithQueryParam('#street_address', ['name', 'merchant[name]', 'merchant[person[name]]']);
		fillInWithQueryParam('#postal_code', ['name', 'merchant[name]', 'merchant[person[name]]']);

		// Bank Account
		fillInWithQueryParam('#account_name', ['account_name', 'bank_account[name]', 'merchant[account_name]']);
		fillInWithQueryParam('#account_number', ['account_number', 'bank_account[account_number]', 'merchant[account_number]']);
		fillInWithQueryParam('#routing_number', ['routing_number', 'bank_account[routing_number]', 'merchant[routing_number]']);
		fillInWithQueryParam('#account_type', ['account_type', 'bank_account[account_type]', 'merchant[account_type]']);
		fillInWithQueryParam('#ssn_last4', ['tax_id', 'merchant[person[tax_id]]', 'person[tax_id]', 'merchant[tax_id]']);

		if (applicationType === 'business') {
			fillInWithQueryParam('#ein', ['tax_id', 'merchant[tax_id]']);
			fillInWithQueryParam('#business_name', ['name', 'merchant[name]']);
		}

		var dob = queryParams['dob'] || queryParams['merchant[dob]'] || queryParams['merchant[person[dob]]'];
		if (dob) {
			var dobParts = dob.split('-');

			$form.find('#dob_year').val(dobParts[0] || '');
			$form.find('#dob_month').val(dobParts[2] || '');
			$form.find('#dob_day').val(dobParts[1] || '');
		}
	}

	var ipInfo = null;
	setTimeout(function () {
		$.getJSON('//smart-ip.net/geoip-json?callback=?', function(data) {
			ipInfo = data;
		});
	}, 1000);

	function getCapabilities() {
		var capabilities = {
			'screen_width': $(window).width(),
			'screen_length': $(window).height(),
			'user_agent': window.navigator.userAgent
		};

		if (ipInfo) {
			capabilities.system_timezone = ipInfo.timezone;
			capabilities.ip_address = ipInfo.host;
		}

		return capabilities;
	}

	balanced.init(MARKETPLACE_URI);
	var queryParams = $.parseParams(document.location.search);
	var redirectUri = queryParams.redirect_uri;
	console.log(queryParams);

	if (!redirectUri) {
		// TODO: if no redirect url, what do we show?
		return;
	}

	$(document).ready(function () {
		var $form = $('form.full-page-form');

		$('.application-type a').on('click', function (evt) {
			evt.preventDefault();

			var $toUnHide = $form.find('fieldset.hide');
			var $self = $(this);
			$('.application-type a').removeClass('selected');
			$self.addClass('selected');

			if (!$self.hasClass('business')) {
				$form.find('fieldset.business-info').addClass('hide');
				$toUnHide = $toUnHide.not('.business-info');
			}

			$toUnHide.removeClass('hide');
			return false;
		});

		fillInFormWithQueryParams($form, queryParams);

		$form.on('submit', function (evt) {
			evt.preventDefault();

			var form = $form.serializeObject();
			var applicationType = $form.find('.person').hasClass('selected') ? 'person' : $form.find('.business').hasClass('selected') ? 'business' : false;

			if (!applicationType) {
				return false;
			}

			if (form['terms-and-conditions'] !== 'on') {
				addError('.terms .control-group');
			} else {
				removeError('.terms .control-group');
			}

			if (form['dob_month'] && form['dob_day'] && form['dob_year']) {
				var month = parseInt(form['dob_month'], 10);
				var day = parseInt(form['dob_day'], 10);
				var year = parseInt(form['dob_year'], 10);

				if ((month < 1 || month > 12) || (day < 1 || day > 31) || (form['dob_year'].length < 4 || year < 1900 || year > (new Date().getFullYear()))) {
					addError('.personal-info .dob', 'Oops, the date appears malformed.');
				} else {
					form['dob'] = form['dob_year'] + '-' + leftPad(month, 2) + '-' + leftPad(day, 2);
				}
			}

			if (!form['email_address']) {
				addError('.personal-info .email_address', 'This field is required.')
			} else {
				removeError('.personal-info .email_address');
			}

			var base = {
				type: applicationType,
				email_address: form.email_address
			};

			if (MARKETPLACE_URI.indexOf('TEST') >= 0) {
				base['production'] = false;
			}


			var bankAccount = pick(form, 'routing_number', 'account_number');
			bankAccount.name = form.account_name;
			bankAccount.type = form.account_type;

			var personal = pick(form, 'phone_number', 'postal_code', 'street_address', 'name', 'dob');
			personal.tax_id = form.ssn_last4;
			console.log('personal', personal);

			if (applicationType === 'business') {
				var business = pick(form, 'phone_number', 'postal_code', 'street_address');
				business.name = form.business_name;
				business.tax_id = form.ein;

				if (form.region) {
					personal.region = form.region;
					business.region = form.region;
				}

				base.person = personal;
				base = $.extend(base, business);
				console.log('business', business);
			} else {
				if (form.region) {
					personal.region = form.region;
				}

				base = $.extend(base, personal);
			}

			console.log('base', base);

			if (!bankAccount.routing_number || !bankAccount.account_number) {
				bankAccount = {};
			}

			var jsonObj = {
				email_address: base.email_address,
				merchant: base,
				bank_account: bankAccount,
				name: base.name,
				meta: getCapabilities()
			};

			console.log('json', jsonObj);

			if ($form.find('.control-group.error').length >= 1) {
				return false;
			} else {
				$.ajax({
					url: URL,
					type: 'POST',
					data: jsonObj,
					dataType: 'json',
					success: function (data) {
						console.log('success', data);
						var merchant = data.merchant;
						if (merchant) {
							window.location = addQueryParamsToUrl(redirectUri, [{ email_address: merchant.email_address }, { merchant_uri: merchant.uri }]);
						} else {
							// There are errors validating the document
						}
					},
					error: function () {
						console.log('error', arguments);
					}
				});
			}

			return false;
		});

		function addError(selector, errorMessage) {
			var $group = $form.find(selector).addClass('error');

			if (errorMessage) {
				var $label = $group.find('label');
				$label.data('originalHtml', $label.html());
				$label.html(errorMessage);
			}
		}

		function removeError(selector) {
			var $group = $form.find(selector).removeClass('error');
			var $label = $group.find('label');
			var originalHtml = $label.data('originalHtml');

			if (originalHtml) {
				$label.html(originalHtml);
			}
		}

		$form.find('[data-toggle="popover"]').popover({
			html: true,
			content: '<img class="check_image_tool_tip" src="/images/check_image_tool_tip.png"/>'
		});

		$(document.body).on('click', function (evt) {
			var $target = $(evt.target);

			if (!$target.is('.popover') && !$target.parents('.popover').length && !$target.is('[data-toggle="popover"]')) {
				$form.find('[data-toggle="popover"]').popover('hide');
			}
		});
	});
}());
