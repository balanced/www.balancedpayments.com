Balanced.Transactions = (function () {
    var container = '.transaction.debit .body .actions';
    var onRefund = function (e) {
        var $form = $(this);
        var amount = parseFloat($('[name="amount"]', $form).val());
        var maxAmount = parseInt($form.data('amount-not-refunded'), 10);
        var g = $('.control-group', $form);
        if (!amount || isNaN(amount) || parseInt(amount * 100, 10) < 50 || parseInt(amount * 100, 10) > maxAmount) {
            //  this shit is invalid
            g.addClass('error');
        } else {
            g.removeClass('error');
            createRefundPreview($form, 'Refunds', amount, $form.attr('action'));
        }
        e.preventDefault();
    };
    var createRefundPreview = function ($form, type, amount, action) {
        $form.hide();
        var $confirm = $('.confirm', container);
        $('.title', $confirm).text(type.substr(0, 1).toUpperCase() + type.substr(1, type.length - 2));
        $('[name="amount"]', $confirm).val(amount.toFixed(2));
        $confirm.show().attr('action', action);
        $(container).addClass('focus');
    };
    var resetActions = function (e) {
        $('form', container).show();
        $('.confirm', container).hide();
        $(container).removeClass('focus');
        e.preventDefault();
    };
    var initTransactionDetail = function () {
        //  refund form
        $('form[class!="confirm"]', container).live('submit', onRefund);
        $('.cancel', container).live('click', resetActions);
        $('.transaction[data-uri]').click(function (e) {
            $('.transaction[data-uri]').removeClass('active');
            window.history.replaceState({}, '', $(this).data('uri'));
            $(this).addClass('active');
        });
    };
    var showProgressWhileLoadingTransactions = function (e) {
        $('#populator').children().toggle();
        $('.rott').rotator('start');
        $('.empty-marketplace > h3').text('populating');
    };
    var initPayASeller = function () {
        var $form = $('form', '#pay-a-seller');
        var validators = {
            account_name: ['required'],
            amount: ['required', 'decimal', '>=0.5'],
            bank_code: ['required',
                balanced.bankAccount.validateRoutingNumber],
            account_number: ['required']
        };
        $form.modalValidator({
            validators: validators
        });
    };
    var initRefundADebit = function () {
        var $form = $('#refund-a-debit form');
        var validators = {
            'amount': ['required', 'decimal', '>=0.5']
        };
        $form.modalValidator({
            validators: validators
        });
    };
    var initCaptureAHold = function () {
        var $form = $('#capture-a-hold form');
        var validators = {
            'amount': ['required', 'decimal', '>=0.5']
        };
        $form.modalValidator({
            validators: validators
        });
    };
    return {
        init: function (options) {
            initTransactionDetail();
            initPayASeller();
            initRefundADebit();
            initCaptureAHold();
            $('#populator').submit(showProgressWhileLoadingTransactions);
        },
        //  callback when updating a transaction detail field
        onUpdate: function (data) {
            if (data.data.status && data.data.status > 299) {
                //  oh shit.
            } else {
                var t = $(data.field);
                var container = t.closest('.span4');
                $('span.description', container).toggle().text(t.val());
                $('form', container).toggle();
                $('button', container).hide();
                $('a', container).text('Edit');
            }
        }
    };
})();
