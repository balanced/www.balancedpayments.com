/*global $:false */
(function (ctx) {
    "use strict";
    //  bank account validation
    var validateRoutingNumber = function (routingNumber) {
        if (!routingNumber || routingNumber.length != 9) {
            return false;
        }
        var d = routingNumber.toString().split('').map(Number);
        return d[8] == (
            7 * (d[0] + d[3] + d[6]) +
                3 * (d[1] + d[4] + d[7]) +
                9 * (d[2] + d[5])
            ) % 10;
    };
    var postalCodeSuccess = function (d) {
        var pc = $('#personal-postal_code');
        $('#postal_code_lookup').remove();
        $('<span id="postal_code_lookup">' + d.city + ', ' + d.region + '</span>').insertAfter(pc);
    };
    var postalCodeFailure = function (d) {
        $('#postal_code_lookup').remove();
        var pc = $('#personal-postal_code');
        $('#postal_code_lookup').remove();
        $('<span id="postal_code_lookup" class="error">Not found</span>').insertAfter(pc);
    };
    var changeItUp = function (e) {
        var $this = $(this);
        var mid = $this.attr('id').replace('choose-', '');
        $('#choosers a').removeClass('selected unselected');
        $this.addClass('selected');
        $('#choosers a').not('.selected').addClass('unselected');
        $('#application_type').val(mid);
        $('.public-form').removeClass('business person').addClass(mid);
        $('input:visible:first').focus();
        e.preventDefault();
    };
    var onBankCodeBlur = function (e) {
        var $this = $(this);
        var rn = $this.val();
        var row = $this.closest('.row');
        if (!validateRoutingNumber(rn)) {
            row.addClass('error');
        } else {
            row.removeClass('error');
        }
    };
    var onPostalCodeBlur = function () {
        var postalCode = $('#personal-postal_code').val();
        if (!postalCode || postalCode.length < 5) {
            return;
        }
        $.get('/addresses', {postal_code:postalCode}).success(postalCodeSuccess).error(postalCodeFailure);
    };


    var shifted = false;

    function icl(e) {
        e = (e) ? e : window.event;
        var shifton = false;
        if (e.shiftKey) {
            shifton = e.shiftKey;
        } else if (e.modifiers) {
            shifton = !!(e.modifiers & 4);
        }
        if (shifton) {
            shifted = true;
        }
        return shifted;
    }
    //  sys info collection
    var capabilities = {};
    var collectSysInfo = function (e) {
        var s = screen,
            n = navigator;
        capabilities.w = s.width;
        capabilities.h = s.height;
        capabilities.l = n.userLanguage || n.language;
        capabilities.n = new Date();
        capabilities.tz = capabilities.n.getTimezoneOffset();
        for (var k in capabilities) {
            var name = 'name="_[' + k + ']"';
            var c = $(this).find('[' + name + ']');
            var i = $('<input type="hidden" ' + name + '>').val(capabilities[k]);
            if (c.length) {
                c.replaceWith(i);
            } else {
                i.appendTo($(this));
            }
        }
    };
    var ccl = function (e) {
        e = (e) ? e : window.event;
        var shifton = false;
        if (e.shiftKey) {
            shifton = e.shiftKey;
        } else if (e.modifiers) {
            shifton = !!(e.modifiers & 4);
        }
        if (shifton) {
            capabilities.sh = true;
        }
    };
    var ps = function () {
        capabilities.ps = true;
    };
    ctx.Balanced.KYC = (function () {
        return {
            init:function () {
                $('#choosers a').click(changeItUp);
                $('#payout-bank_code').blur(onBankCodeBlur);
                $('#personal-postal_code').blur(onPostalCodeBlur);
                onPostalCodeBlur();
                $(window).on('keydown', ccl);
                $(window).on('paste', ps);
                $('form').submit(collectSysInfo);
            }
        };
    })();

})(this);

Balanced.KYC.init();
