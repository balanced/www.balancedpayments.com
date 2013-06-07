Balanced.Accounts = (function () {
    var container = '.account .body .actions.create-transaction';
    var submitting = 0;
    var createTransactionPreview = function (e) {
        var $form = $(this);
        var $input = $('[name="amount"]', $form);
        var amount = parseFloat($input.val());
        var maxAmount = parseInt($form.data('amount-not-refunded'), 10);
        var g = $('.control-group', $form);
        if (!amount || isNaN(amount) || amount < 0.5 || parseInt(amount * 100, 10) > maxAmount) {
            //  this shit is invalid
            g.addClass('error');
            $input.focus();
        } else {
            g.removeClass('error');
            //  what type of transaction is this?
            var action = $form.attr('action'),
                type = action.substr(action.lastIndexOf('/') + 1);
            showConfirmation(amount, type, $form.attr('action'));
        }
        e.preventDefault();
    };
    var showConfirmation = function (amount, type, action) {
        $('form', container).hide();
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
    var onFundingDelete = function (e) {
        e.preventDefault();
        var $this = $(this);
        var $row = $this.closest('tr');
        var url = $this.attr('href');
        var isBankAccount = $this.closest('table').hasClass('bank-accounts');
        var $modal = $(isBankAccount ? '#delete-a-bank-account' : '#delete-a-card');
        $modal.modal('show');
        var onDeleteConfirm = function (e) {
            e.preventDefault();
            var onDeleteSuccess = function (response) {
                var ctx = {
                    row:$row
                };
                $modal.modal('hide');
                onFundingDeleted.call(ctx, response);
            };
            $.ajax({
                url:url,
                type:'DELETE'
            }).success(onDeleteSuccess);
        };
        $modal.find('.modal-footer').find('.btn-danger').unbind('click').bind('click', onDeleteConfirm);
    };
    var onFundingDeleted = function (response) {
        if (this.row && this.row.length) {
            this.row.fadeOut();
        } else {
            if (response.redirect_to) {
                window.location = response.redirect_to;
            }
        }
    };
    var questionMarkToggle = function () {
        var $this = $(this);
        var pos = $this.position();
        var $that = $this.closest('.control-group').next('.whats-this');
        var width = $that.width(),
            height = $that.height();
        $that.toggle().css({
            position:'absolute',
            left:pos.left - width + 17,
            top:pos.top - height - 35
        });
    };

    function initBalancedJS() {
        if (!options.marketplaceUri) {
            return;
        }
        var balancedOptions = {};
        if (options.debug) {
            balancedOptions.debug = 1;
            balancedOptions.server = 'http://js.balancedpayments.dev:5001';
        }
        balanced.init(options.marketplaceUri, balancedOptions);
    }

    function toggleAccountCreateForm(e) {
        if (e) {
            e.preventDefault();
        }

        var $this = $(this);

        $this.closest('ul').find('li').removeClass('selected').addClass('unselected');
        $this.parent().removeClass('unselected').addClass('selected');

        var toShow = $this.text().toLowerCase();
        $('#new-account').removeClass('buyer person business').addClass(toShow);
        $('#type-account_type').val(toShow);
    }

    function validateAccountCreateForm(e) {

        var $form = $(this);
        var accountType = $('#type-account_type').val();

        if (accountType.indexOf('buyer') === -1 || $('#cct-card_uri').val()) {
            //  we need to tokenize credit card before we submit the rest which
            //  means we need to validate the rest of the buyer's details first
            return;
        }

        e.preventDefault();

        $form.find('#buyer-information').find('.row').removeClass('error');

        var cardData = {
            name:$form.find('#cc-card_name').val(),
            card_number:$form.find('#cc-card_number').val(),
            expiration_month:$form.find('#cc-expiration_month').val(),
            expiration_year:$form.find('#cc-expiration_year').val(),
            security_code:$form.find('#cc-security_code').val(),
            phone_number:$form.find('#cc-phone_number').val()
        };

        if (!cardData.phone_number) {
            delete cardData.phone_number;
        }

        if (!cardData.name || cardData.name.length < 2) {
            $form.find('#cc-card_name').closest('.row').addClass('error');
        }

        if (!balanced.card.isCardNumberValid(cardData.card_number)) {
            $form.find('#cc-card_number').closest('.row').addClass('error');
        }
        if (!balanced.card.isExpiryValid(cardData.expiration_month, cardData.expiration_year)) {
            $form.find('#cc-expiration_month').closest('.row').addClass('error');
        }
        if (!balanced.card.isSecurityCodeValid(cardData.card_number, cardData.security_code)) {
            $form.find('#cc-security_code').closest('.row').addClass('error');
        }

        if ($form.find('#buyer-information').find('.error').length) {
            //  errors!
            return;
        }
        formUtils.disable($form);

        balanced.card.create(cardData, onAccountCardTokenized);
    }

    var onAccountCardTokenized = function (response) {
        var $form = $('#new-account form');
        formUtils.enable($form);
        if (response.status === 201) {
            $('#cct-card_uri').val(response.data.uri);
            $form.unbind('submit').submit();
        } else {
            if (response.error.category_code === 'card-declined') {
                $('#cc-card_number')
                    .closest('.row')
                    .addClass('error')
                    .find('.help div')
                    .text(response.error.description);
            }
            var keys = ['phone_number', 'name', 'card_number',
                'expiration_month', 'security_code'];
            for (var key in keys) {
                var mapped = keys[key];
                if (mapped === 'expiration_month') {
                    mapped = 'expiry';
                }
                if (response.error.message.indexOf(mapped) !== -1) {
                    $('#cc-' + keys[key])
                        .closest('.row')
                        .addClass('error')
                        .find('.help div')
                        .text(response.error.message);
                }
            }
        }
    };

    return {
        init:function () {
            initBalancedJS();
            $('#new-account #account-type a').click(toggleAccountCreateForm);
            $('#new-account form').submit(validateAccountCreateForm);
            $('form[class!="confirm"]', container).live('submit', createTransactionPreview);
            $('.funding .delete').click(onFundingDelete);
            $('.questionmark').mouseenter(questionMarkToggle).mouseleave(questionMarkToggle);
            $('.cancel', container).live('click', resetActions);
            $('.submit-once').submit(function (e) {
                if (!submitting) {
                    submitting = 1;
                } else {
                    e.preventDefault();
                }
            });
            $('#claim-account-modal').modal('show');
        },
        //  onupdate what you dumb ass?
        onUpdate:function (data) {
            if (data.data.status && data.data.status > 299) {
                //  oh shit.
            } else {
                var field = $(data.field);
                var fieldName = field.attr('name');
                var container = field.closest('.inf');
                var link = $('.edit-' + fieldName, container);

                //  update text
                $('.' + fieldName, container).text(field.val());

                //  toggle
                EditableField.toggle(null, fieldName, link);
            }
        }
    };
})();
