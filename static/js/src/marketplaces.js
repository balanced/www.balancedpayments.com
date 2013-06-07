Balanced.Marketplaces = (function () {
    var $form = $('form.merchant-bank-account-details');
    var PREFIX = 'ac-';
    var toggleBankingDetails = function (e) {
        $('.merchant-bank-account-details').toggle().closest('.actions').toggleClass('focus');
        $('.with-sub-error').subError('hide');
        if (e) {
            e.preventDefault();
        }
    };
    var submitBankingDetails = function (e) {
        var $this = $(this);
        //  validate for presence of data
        //  validate for correctness of bank code and account number
        //  submit and handle any returned errors
        e.preventDefault();
        $form.find('input:visible').each(function (i, v) {
            $(v).fieldError('hide');
        });
        $.ajax({
            url: $this.attr('action'),
            type: 'PUT',
            data: $this.serialize()
        }).success(success).error(error);
    };
    var success = function (data) {
        $('.with-sub-error').subError('hide', 0);

        //  merge from form to page
        $form.find('input:visible').each(function (i, v) {
            var $v = $(v);
            var name = $v.attr('name').replace(PREFIX, '');
            var container = $form.closest('.actions');
            $('span.' + name, container).text(data.merchant.payout_method[name]);
        });
        toggleBankingDetails();
    };
    var error = function (response) {
        //  FIXME: why is this not returned as json in the first place?
        var result = JSON.parse(response.responseText);
        var message = result.exception.description;
        var fields = $form.find('input:visible');
        for (var i = 0; i < fields.length; i++) {
            var $field = $(fields[i]);
            var fieldName = $field.attr('name');
            $field.fieldError('hide');
            if (message.indexOf(fieldName.replace(PREFIX, '')) >= 0) {
                $field.fieldError('show');
            }
        }
        $('.with-sub-error').subError('clear').subError('show', result.exception.description);
    };
    var changeItUp = function (e) {
        e.preventDefault();
        var $this = $(this);
        var mapping = {
            'choose-existing': '#existing-marketplace',
            'choose-test': '#new-marketplace'
        };
        var id = mapping[$this.attr('id')];
        $('#new-marketplace-selector .former').hide();
        $(id).show();
        $this.closest('.body').find('a').removeClass('selected').addClass('unselected');
        $this.addClass('selected').removeClass('unselected');
        e.preventDefault();
    };
    var initFundingInstrumentSelector = function ($form) {
        var onChange = function (e) {
            var v = $form.find('.item-selector :selected');
            $form.find('.item-name').text(v.data('name'));
            $form.find('.item-type').text(v.data('type'));
        };
        onChange();
        $form.find('.item-selector').change(onChange);
    };
    var initConfirmABankAccount = function () {
        var $form = $('.confirm-a-bank-account').find('form');
        var validators = {
            first_amount: ['required', 'decimal'],
            second_amount: ['required', 'decimal']
        };
        $form.submit(function (e) {
            var $form = $(this);
            var data = formLib.validate($form, validators);
            e.preventDefault();
            if (data.errors) {
                return;
            }
            formLib.disable($form);
            $.ajax({
                url: $form.attr('action'),
                type: $form.attr('method'),
                data: data.data
            }).done(function (d) {
                console.log(d);
                if (d.state === 'verified') {
                    location.reload(true);
                    return;
                }
                formLib.enable($form);
                formLib.focus($form);
                if (d.remaining_attempts > 0) {
                    var msg = 'one or both amounts entered is incorrect';
                    formLib.addErrorToField($form, 'second_amount', msg);
                } else {
                    $('.confirm-a-bank-account').modal('hide');
                    $('#confirm-a-bank-account-failed').modal('show');
                }
            }).error(function (d) {
                    var error = $.parseJSON(d.responseText);
                    formLib.enable($form);
                    if (error.additional) {
                        for (var field in error.additional) {
                            formLib.addErrorToField($form, field);
                        }
                    }
                    console.info(error);
                });
        });
    };
    var initCreateABankAccount = function () {
        var $form = $('#add-a-bank-account').find('form');
        var validators = {
            caba_name: ['required'],
            caba_bank_code: ['required',
                balanced.bankAccount.validateRoutingNumber],
            caba_account_number: ['required']
        };
        var success = function (d) {
            location.reload(true);
        };
        $form.submit(function (e) {
            var $form = $(this);
            var data = formLib.validate($form, validators);
            e.preventDefault();
            if (data.errors) {
                return;
            }
            var error = function (d) {
                var error = $.parseJSON(d.responseText);
                console.log(error);
                formLib.enable($form);
                if (error.additional) {
                    for (var field in error.additional) {
                        formLib.addErrorToField($form, field);
                    }
                }
                console.info(error);
            };
            formLib.disable($form);
            $.ajax({
                url: $form.attr('action'),
                type: $form.attr('method'),
                data: data.data
            }).done(success).error(error);
        });
    };
    var initMakeDefault = function () {
        $('.make-default').click(function (e) {
            e.preventDefault();
            var $t = $(this);
            var uri = $t.closest('[data-uri]').data('uri');
            console.log(uri);
            $.ajax(uri.replace('/v1', ''), {
                data: {
                    'default': true
                }, type: 'PUT'
            }).success(function (d) {
                    $t.addClass('default').closest('[data-uri]').siblings().find('a').removeClass('default');
                });
        });
    };
    var initCardForm = function (formId, prefix, success) {
        var $form = $(formId).find('form');
        success = success || function () {
            location.reload(true);
        };
        var cardCallback = function (response) {
            console.log(response);
            switch (response.status) {
                case 402:
                    formLib.enable($form);
                    formLib.addErrorToField($form, prefix + 'card_number', 'This card has been declined');
                    formLib.focus($form);
                    break;
                case 201:
                    var els = $form.find('[data-context]').find('input,select');
                    var data = {
                        funding_uri: response.data.uri
                    };
                    for (var i = 0; i < els.length; i++) {
                        var $el = $(els[i]);
                        data[$el.attr('name')] = $el.val();
                    }
                    $.post($form.attr('action'), data, null, 'json').success(success);
                    break;
                default:
                    formLib.enable($form);
                    for (var field in response.error) {
                        if (field === 'expiration') {
                            formLib.addErrorToField($form, prefix + 'expiration_month');
                            formLib.addErrorToField($form, prefix + 'expiration_year');
                        }
                        console.log(prefix + field);
                        formLib.addErrorToField($form, prefix + field);
                    }
                    formLib.focus($form);
                    break;
            }
        };
        $form.submit(function (e) {
            var $form = $(this);
            formLib.clear($form);
            $('#' + prefix + 'card_number').parent().find('help-inline').remove();
            var data = formLib.serialize($form);
            e.preventDefault();
            formLib.disable($form);
            balanced.card.create({
                "name": data[prefix + 'name'],
                "card_number": data[prefix + 'card_number'],
                "expiration_month": data[prefix + 'expiration_month'],
                "expiration_year": data[prefix + 'expiration_year'],
                "security_code": data[prefix + 'security_code']
            }, cardCallback);
        });
    };
    var initInitialDeposit = function () {
        initCardForm('#initial-deposit', 'idf-', function (d) {
            if (d.next) {
                window.location = d.next;
            } else {
                $('#idf-card_number').closest('.row').addClass('error');
                formLib.enable($('#initial-deposit form'));
            }
        });
    };
    var initCreateACardAccount = function () {
        initCardForm('#add-a-card', 'cac_');
    };
    var initPayABankAccount = function () {
        var $form = $('#pay-a-bank-account form');
        var validators = {
            'baccf-amount': ['required', 'decimal', '>=0.5'],
            'baccf-account-name': ['required']
        };
        $form.modalValidator({
            validators: validators
        });
    };
    var initAddAHold = function () {
        var $form = $('#add-a-hold form');
        initFundingInstrumentSelector($form);
        var validators = {
            'caah-amount': ['required', 'decimal', '>=0.5']
        };
        $form.modalValidator({
            validators: validators
        });
    };
    var initAddADebit = function () {
        var $form = $('#add-a-debit form');
        initFundingInstrumentSelector($form);
        var validators = {
            'aad-amount': ['required', 'decimal', '>=0.5']
        };
        $form.modalValidator({
            validators: validators
        });
    };
    var initAddACredit = function () {
        var $form = $('#add-a-credit form');
        initFundingInstrumentSelector($form);
        var validators = {
            'aac-amount': ['required', 'decimal', '>=0.5']
        };
        $form.modalValidator({
            validators: validators
        });
    };

    function initAddFunds() {
        var $form = $('#add-funds form');
        initFundingInstrumentSelector($form);
        var validators = {
            'af-amount': ['required', 'decimal', '>=0.5']
        };
        $form.modalValidator({
            validators: validators
        });
    }

    function initWithdrawFunds() {
        var $form = $('#withdraw-funds form');
        initFundingInstrumentSelector($form);
        var validators = {
            'wf-amount': ['required', 'decimal', '>=0.5']
        };
        $form.modalValidator({
            validators: validators
        });
    }

    function initChangeInvoiceFundingSource() {
        var $form = $('#change-invoice-funding-instrument form');
        initFundingInstrumentSelector($form);
        $form.submit(function (e) {
            e.preventDefault();
            $.ajax($form.attr('action'), {
                type: $form.attr('method'),
                data: formLib.serialize($form)
            }).complete(function (r) {
                window.location = r.redirect_to;
            });
        });
    }

    return {
        init: function () {
            //  these are marketplace owner operations
            initConfirmABankAccount();
            initCreateABankAccount();
            initCreateACardAccount();

            initAddFunds(); // adding funds to mp escrow
            initWithdrawFunds(); // withdraw funds from mp escrow

            //
            initMakeDefault();
            initInitialDeposit();
            initPayABankAccount();
            //  these are all account operations
            initAddAHold();
            initAddADebit();
            initAddACredit();

            //
            initChangeInvoiceFundingSource();

            $form.submit(submitBankingDetails);
            $('.ac-toggle').click(toggleBankingDetails);
            $('#new-marketplace-selector .choosers a.img').click(changeItUp);
        },
        onVerifyBankAccount: function() {
            document.location.reload();
        }
    };
})();
