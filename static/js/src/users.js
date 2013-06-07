Balanced.User = (function () {
    var quickSignupForm = $('.quick-signup');
    var $wse;
    var validateQuickSignup = function (e) {
        var $form = $(this).closest('.quick-signup');
        $wse = $form.closest('.with-sub-error');
        var isValid = true;

        $wse.subError('hide');
        $('input', $form).each(function (i, v) {
            var $v = $(v);
            $v.closest('.control-group').removeClass('error');
            if (!$v.is(':hidden') && !$v.val()) {
                $v.closest('.control-group').addClass('error');
                isValid = false;
            }
        });

        var emailAddress = $('[name="email_address"]', $form);
        if (!validate.email(emailAddress.val())) {
            emailAddress.closest('.control-group').addClass('error');
            if (isValid) {
                $wse.subError('show', 'Email address not valid.');
            }
            isValid = false;
        }

        e.preventDefault();
        if (!isValid) {
            //  return false to stop bootstrap closing the form
            return false;
        }

        if ($(this).attr('type') !== 'reset') {
            $.post($form.attr('action'), $form.serialize()).success(successCallback).error(errorCallback);
        }
    };
    var errorCallback = function (data) {
        if (data.status === 401) {
            var isSignup = quickSignupForm.closest('#new-account-form').length;
            var message = isSignup ? 'This email address is already being used.' : 'The email and/or password entered is incorrect.';
            $wse.subError('show', message);
        }
    };
    var successCallback = function (d) {
        if (d.uri) {
            document.location = d.uri;
        } else {
            document.location = '/dashboard';
        }
    };
    var showResetPassword = function (e) {
        var $this = $(this);
        var cg = $('#password').closest('.control-group');
        var $form = $this.closest('form');
        $wse = $this.closest('.with-sub-error').subError('hide');
        cg.css({height:cg.height() });
        $('> *', cg).toggle();
        $('.pri', cg).hide();
        $('<span class="pri">You will receive an email with instructions.</span>').appendTo(cg);
        $this.toggle();
        $('.btn-bal', $this.parent()).text('Reset');
        $form.attr('action', $this.attr('href'));
        $('input:visible', $form).focus();
        $('.control-group', $form).removeClass('error');
        $('button', $form).off('click');
        $form.off('submit').submit(resetPasswordSubmit);
        if (e) {
            e.preventDefault();
        }
    };
    var resetPasswordSubmit = function (e) {
        var $this = $(this);
        $wse = $this.closest('.with-sub-error').subError('hide');
        var emailAddress = $('[name="email_address"]', $this);
        if (!validate.email(emailAddress.val())) {
            emailAddress.closest('.control-group').addClass('error');
            $wse.subError('clear').subError('show', 'Email address not valid.');
        } else {
            $.post($this.attr('action'), {
                email_address:emailAddress.val()
            }).success(resetPasswordSuccess).error(resetPasswordError);
        }
        e.preventDefault();
    };
    var resetPasswordSuccess = function () {
        document.location = '/';
    };
    var resetPasswordError = function () {
        $('.with-sub-error').subError('clear').subError('show', 'There is no account associated with this email address.');
    };
    return {
        init:function () {
            quickSignupForm.each(function (i, v) {
                var $v = $(v);
                $v.submit(validateQuickSignup);
                $('button', $v).click(validateQuickSignup);
                $('.linky[href="/settings/password/reset"]', quickSignupForm).click(showResetPassword);
                if (document.location.hash.indexOf('reset-password') >= 0) {
                    showResetPassword();
                }
            });
        }
    };
})();
