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
if (!jqueryLoaded) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
	head.appendChild(script);
	if (script.readyState && script.onload !== null) {
		script.onreadystatechange = function() {
			if (this.readyState == 'complete') mce_preload_check();
		}
	}
}

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
var $currentForm;

function mce_preload_check() {
	if (mce_preload_checks > 40) return;
	mce_preload_checks++;
	try {
		var jqueryLoaded = jQuery;
	} catch (err) {
		setTimeout('mce_preload_check();', 250);
		return;
	}
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
		$('input[type=email]').focus(function() {
			$(this).removeClass('mce_inline_error, error');
		});
		var options = {
			errorClass: 'mce_inline_error',
			errorElement: 'div',
			onkeyup: function() {},
			onfocusout: function() {},
			onblur: function() {}
		};
		$("form.validate").unbind('submit'); //remove the validator so we can get into beforeSubmit on the ajaxform, which then calls the validator
		options = {
			url: '//balancedpayments.us2.list-manage.com/subscribe/post-json?u=30382d347d3689814ca424c89&id=' + $("#mc-embedded-subscribe-form").attr('data-id') + '&c=?',
			type: 'GET',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			beforeSubmit: function(arr, $form, options) {
				// save the target form
				$currentForm = $form;
				$currentForm.find('#mce_tmp_error_msg').remove();

				$currentForm.parent().each(
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
				return $currentForm.validate(options).form();
			},
			success: mce_success_cb
		};

		// submit multiple mailchimp forms on a page
		$("form.validate").each(function() {
		  $(this).ajaxForm(options);
		});
	});
}

function mce_success_cb(resp) {
	$currentForm.find('#mce-success-response').hide();
	$currentForm.find('#mce-error-response').hide();
	if (resp.result == "success") {
		$currentForm.parents('.notify-me').find('.title').hide();
		$currentForm.parents('.notify-me').find('.mc-field-group').hide();
		$currentForm.find('#mce-' + resp.result + '-response').fadeIn(200);
		$currentForm.find('#mce-' + resp.result + '-response').html("To complete the process, please click the link in the email we just sent you.");
		$currentForm.find('#mc-embedded-subscribe-form').each(function() {
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
				$currentForm.find('#mce-' + resp.result + '-response').show();
				$currentForm.find('#mce-' + resp.result + '-response').html(msg);
			} else {
				err_id = 'mce_tmp_error_msg';
				html = '<div id="' + err_id + '" style="' + err_style + '"> ' + msg + '</div>';

				var input_id = '#mc_embed_signup';
				var f = $currentForm.parent();
				if (ftypes[index] == 'address') {
					input_id = '#mce-' + fnames[index] + '-addr1';
					f = f.parent().parent().get(0);
				} else if (ftypes[index] == 'date') {
					input_id = '#mce-' + fnames[index] + '-month';
					f = f.parent().parent().get(0);
				} else {
					input_id = '#mce-' + fnames[index];
					f = f.parent().parent().get(0);
				}
				if (f) {
					$(f).append(html);
					$currentForm.find(input_id).focus();
				} else {
					$currentForm.find('#mce-' + resp.result + '-response').show();
					$currentForm.find('#mce-' + resp.result + '-response').html(msg);
				}
			}
		} catch (e) {
			$currentForm.find('#mce-' + resp.result + '-response').show();
			$currentForm.find('#mce-' + resp.result + '-response').html(msg);
		}
		$('form.validate').each(function() {
			this.reset();
		});
	}
}
