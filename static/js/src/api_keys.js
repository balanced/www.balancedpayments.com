Balanced.APIKeys = (function () {
    var apiKeyForm = $('#api-secret-form');
    var $wse;
    var verify = function (e) {
        var $this = $(this);
        $wse = $this.closest('.with-sub-error');
        setValid();
        var value = $('[name="secret"]', apiKeyForm).val();
        if (value.length != 32) {
            setInvalid();
        } else {
            $.post($('form', apiKeyForm).attr('action'), {
                secret: value
            }).success(callback).error(callback);
        }
        e.preventDefault();
    }, setInvalid = function () {
        $('input', apiKeyForm).focus();
        $wse.subError('show', 'Invalid api key secret', function () {
            $('.control-group', apiKeyForm).addClass('error');
        });
    }, setValid = function () {
        $wse.subError('hide');
        $('.control-group', apiKeyForm).removeClass('error');
    }, callback = function (d) {
        switch(d.status) {
            case 404:
            case 500:
                setInvalid();
                break;
            default:
                setValid();
                apiKeyForm.closest('.empty-marketplace').hide();
                break;
        }
    };
    return {
        init:function () {
            apiKeyForm.each(function(i, v) {
                var $v = $(v);
                $v.submit(verify);
                $('.btn-bal', $v).click(verify);
            });
        },
        destroy:function (data) {
            var $li = data.field.closest('li');
            $li.fadeOut();
        }
    };
})();
