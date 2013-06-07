Balanced.Search = (function () {
    var initSearch = function (options) {
        var $q = $('#q'),
            autoSuggestWidth = 324;
        //  focus on search
        $(document).bind('keypress', '/', function (e) {
            if (!$q.is(':focus')) {
                $q.focus();
                e.preventDefault();
            }
        });

        function onSelect(suggestion) {
            window.location = suggestion.uri.substr(3);
            console.log('suggestion', suggestion);
        }

        function formatResult(suggestion, currentValue) {
            var types = {
                    CC: 'credit card',
                    CR: 'credit',
                    BA: 'bank account',
                    AC: 'account',
                    RF: 'refund',
                    HL: 'hold',
                    WD: 'debit'
                },
                type = types[suggestion.id.substr(0, 2)],
                isTransaction = ['credit', 'debit', 'hold', 'refund'].indexOf(type) >= 0,
                isInstrument = ['credit card', 'bank account'].indexOf(type) >= 0;

            console.log('format', arguments);

            var title,
                created = Date.parseISO8601(suggestion.created_at).strftime('%I:%M %p, %a %d %h %Y'),
                detail1,
                detail2;
            if (isTransaction) {
                title = '$' + (suggestion.amount / 100.0).toFixed(2) + ' - ' + suggestion.description;
                if (type === 'refund') {
                    detail1 = suggestion.account.name || suggestion.account.email_address;
                } else {
                    if (type === 'credit') {
                        detail1 = suggestion.destination.name;
                        detail2 = suggestion.destination.bank_name;
                    } else {
                        detail1 = suggestion.source.name;
                        detail2 = suggestion.source.brand;
                    }
                }
            } else {
                if (isInstrument) {
                    if (type === 'bank account') {
                        detail1 = 'xxx xxx xxx ' + suggestion.last_four;
                        detail2 = suggestion.bank_name;
                    } else {
                        var pad = suggestion.brand === 'American Express' ? 'xxxxx xxxx xxxx ' : 'xxxx xxxx xxxx ';
                        detail1 = pad + suggestion.last_four;
                        detail2 = suggestion.brand;
                    }
                } else {
                    //  account
                    detail1 = suggestion.email_address || suggestion.id;
                    detail2 = 'roles: ' + suggestion.roles.join(',');
                }
                title = suggestion.name;
            }
            var rendered = '<h4 id="result-' + suggestion.id + '" title="' + title + '">' + title + '</h4>' +
                '<span class="type">' + type + '</span>' +
                '<span class="created">' + created + '</span>';
            if (detail1) {
                rendered += '<span class="deets">' + detail1 + '</span>';
            }
            if (detail2) {
                rendered += '<span class="deets">' + detail2 + '</span>';
            }
            return rendered;
        }

//        $q.autocomplete({
//            serviceUrl: $q.closest('form').attr('action'),
//            onSelect: onSelect,
//            width: autoSuggestWidth,
//            formatResult: formatResult,
//            minChars: 3,
//            id: 'qac'
//        });

        var $qac = $('#qac');
        var header = $('<header><span>results:</span><span class="counter">0</span></header>'),
            footer = $('<footer><a href="#">show all &rsaquo;</a></footer>'),
            wrapper = $('<div class="qac-rap"/>');

        $qac.wrap(wrapper);
        wrapper = $('.qac-rap');
        wrapper.prepend(header).append(footer).hide();

        $q.bind('auto-suggest-shown',function (e, response) {
            $qac.attr('style', null);
            var $sn = $('.sub-nav');
            var offset = $sn.offset();
            wrapper.show().css({
                position: 'absolute',
                top: (offset.top + $sn.outerHeight()) + 'px',
                left: (offset.left + $sn.width() - autoSuggestWidth) + 'px'
            }).find('.counter').text(response.total || response.suggestions.length);
            $('.qac-rap footer a').attr('href', response.url);
        }).bind('auto-suggest-hidden', function (e) {
                wrapper.hide();
            });

    };
    return {
        init: function (options) {
            initSearch(options);
        }
    };
})();
