Balanced.Logs = (function () {
    function toggleFilter(e) {
        var tgt = $(e.target).parent().next();
        tgt.slideToggle(100);
    }

    function submit(e) {
        e.preventDefault();
        // we only want to submit the filters that are turned on
        var params = [];
        var filters = $(this).closest('form').find('[name$="_enabled"]');
        $.each(filters, function (i, e) {
            var $this = $(this);
            if ($this.is(':checked')) {
                var elms = $this.closest('label').next().find('input:visible, select:visible');
                elms.each(function (i, v) {
                    var $v = $(v);
                    if ($v.attr('type') !== 'checkbox' || $v.is(':checked')) {
                        params.push(
                            $v.attr('name') + '=' + $v.val()
                        );
                    }
                });
            }
        });
        var embedded = getParameterByName('embedded');
        if (embedded) {
            params.push('embedded=' + embedded);
        }
        if (params.length) {
            params = '?' + params.join('&');
        }
        window.location = window.location.pathname + params;
    }

    function changeRequestTime(e) {
        var t = (e) ? e.target : $('[name="time"]')[0];
        if (!t) {
            return;
        }
        var $el = $(t);
        var ix = t.selectedIndex || 0;
        var el;
        switch (ix) {
            case 0:
                el = '.single';
                break;
            case 1:
                el = '.double';
                break;
            default:
                el = '.singledate';
                break;
        }
        $el.parent().find('.selector').hide();
        $el.parent().find(el).toggle();
    }

    function changeRequestAmount(e) {
        var t = (e) ? e.target : $('[name="amount"]')[0];
        if (!t) {
            return;
        }
        var $el = $(t);
        var ix = t.selectedIndex || 0;
        var el;
        if (ix === 1) {
            el = '.double';
        } else {
            el = '.single';
        }
        $el.parent().find('.selector').hide();
        $el.parent().find(el).toggle();
    }

    function toggleCal(e) {
        $(this).siblings('input').datepicker('show');
    }

    function clear(e) {
        $('.log-filter input[type="checkbox"]')
            .removeAttr('checked')
            .parent().next().slideUp(100);
        submit(e);
    }

    return {
        init: function (options) {
            $('.log-filter > div > label input[type="checkbox"]').change(toggleFilter);
            $('.log-filter button[type="submit"]').click(submit);
            $('.log-filter .btn-cancel').click(clear);
            $('input.dt').datepicker({
                maxDate: '+0D',
                dateFormat: 'dd M yy'
            });
            $('input.dt').siblings().click(toggleCal);
            var filters = $('.log-filter').closest('form').find('[name$="_enabled"]');
            $.each(filters, function (i, e) {
                var $this = $(this);
                var param = $this.attr('name').replace('_enabled', '');
                var responseFilter = getParameterByName($this.attr('name').replace('_enabled', ''));
                var enablingCheckbox = $('[name="' + param + '_enabled"]');
//                console.log(' checking param', param, responseFilter);
                if (responseFilter.length > 0) {
                    enablingCheckbox.attr('checked', 'checked').parent().next().show();
                    $('[name="' + param + '"] option').removeAttr('selected');
                    for (var iter = 0; iter < responseFilter.length; iter++) {
                        var rf = responseFilter[iter];
                        var first = '[name="' + param + '"]', second = '[value="' + rf + '"]';
                        $(first + ' ' + second).attr('selected', 'selected');
                        $(first + second).attr('checked', 'checked');
                    }
                } else {
                    // HACK: by default, transactions have 3 types turned on
                    if (param === 'type' && $this.closest('#transaction-filter').length > 0) {
                        var nameParam = '[name="' + param + '"]';
                        enablingCheckbox.attr('checked', 'checked').parent().next().show();
                        $(nameParam + '[value="debit"]').attr('checked', 'checked');
                        $(nameParam + '[value="credit"]').attr('checked', 'checked');
                        $(nameParam + '[value="refund"]').attr('checked', 'checked');
                    }
                }
            });
            var xx = ['ts_int', 'ts_dt', 'ts_gte', 'ts_lte'];
            for (var i in xx) {
                var name = xx[i];
                var results = getParameterByName(name);
                if (results.length === 1) {
                    $('[name="' + name + '"]').val(results[0]);
                }
            }
            $('[name="time"]').change(changeRequestTime);
            changeRequestTime();

            xx = ['am_eq', 'am_gte', 'am_lte'];
            for (var i in xx) {
                var name = xx[i];
                var results = getParameterByName(name);
                if (results.length === 1) {
                    $('[name="' + name + '"]').val(results[0]);
                }
            }
            $('[name="amount"]').change(changeRequestAmount);
            changeRequestAmount();

        }
    };
})();
