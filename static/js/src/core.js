//  "global" variables
var debug = 0;
var scrollingOffset = 25;
var options;
var $window = $(window);
var balls = 'sweaty'; // breaking the cloudfront cache which has stored some 0 length content

//  private functions
var initAJAX = function (csrfToken) {
    $("body").bind("ajaxSend",
        function (elm, xhr, s) {
            if (s.type != 'GET') {
                xhr.setRequestHeader('X-CSRF-Token', csrfToken);
            }
        }).bind('ajaxComplete', function (e, xhr, settings) {
        });
};

var autosave = (function () {
    return {
        init:function () {
            $('.autosave').each(function (index, el) {
                var $e = $(el);
                if ($e.data('autosaved-init')) {
                    return;
                }
                $e.data('autosaved-init', true);
                return $e.autosaveField();
            });
        }
    };
})();

var onScrollAddScrollingClass = function () {
    var offset = $window.scrollTop();
    if (offset > scrollingOffset) {
        $('body').addClass('scrolling');
    } else {
        $('body').removeClass('scrolling');
    }
};

//  TODO: move to loading.
//  updates the content based on the selected filter
var filter = (function () {
    var form, change, suppressURI = 0;
    var filter = {
        uri:document.location.pathname,
        types:[],
        keywords:null,
        offset:0,
        'amount[>=]':0,
        'amount[<=]':10000
    };
    var onChange = function () {
        if (!suppressURI) {
            filter.uri = document.location.pathname;
        }
        suppressURI = 0;
        if (change) {

            var min = filter['amount[>=]'],
                max = filter['amount[<=]'];
            if (min > max) {
                var t = min;
                min = max;
                max = t;
                filter['amount[>=]'] = min;
                filter['amount[<=]'] = max;
            }
            change(filter);
        }
    };
    var updateSearch = function (e) {
        filter.keywords = $(this).val();
        onChange();
    };
    var updateAmounts = function (e) {
        var value = parseInt($(this).val() * 100, 10);
        var isMax = $(this).attr('name') === 'amount-max';
        if (isMax) {
            filter['amount[<=]'] = value;
        } else {
            filter['amount[>=]'] = value;
        }
        onChange();
    };
    var updateTypes = function (e) {
        var types = $('input[type="checkbox"]:checked', form);
        filter.types = [];
        for (var i = 0; i < types.length; i++) {
            filter.types.push($(types[i]).val());
        }
        onChange();
    };
    var updateMarketplace = function (e) {
        var t = $(this);
        filter.uri = t.attr('href');
        e.preventDefault();
        suppressURI = 1;
        onChange();
        $('.accounts li', form).removeClass('current');
        t.parent().addClass('current');
    };
    return {
        init:function (options) {
            form = $(options.id);
            if (!form || !form.length) {
//                console.error('Cannot find filter element "' + options.id + '"');
                return;
            }
            change = options.onChange;
            $('input[type="search"]', form).change(updateSearch);
            $('input[type="checkbox"]', form).click(updateTypes);
            $('.accounts a', form).click(updateMarketplace);
            $('input.range', form).change(updateAmounts);

        }
    };
})();

var prepInfiniteScrolling = function () {
    //  updates the side nav as we scroll through the infinite table
    scrolling.init();
};

var Balanced = {
    init:function (params) {

        options = $.extend(options, params);
        this.options = options;

        if ('debug' in params) {
            debug = params.debug;
        }

        Balanced.csrfToken = params.csrfToken;
        initAJAX(Balanced.csrfToken);
        initErrorHandling();

        if ($.support.pjax) {
            framer.init();
        }
        autosave.init();
        keyCombo.init();

        prepInfiniteScrolling();
        EditableField.init();

        $('.with-sub-error').subError();
        initUtils();
        //  this should be early on so we can begin recording events
        Balanced.Analytics.init(options);
        Balanced.Transactions.init(options);
        Balanced.Search.init(options);
        Balanced.Callbacks.init(options);
        Balanced.Accounts.init();
        Balanced.APIKeys.init();
        Balanced.User.init();
        Balanced.Marketplaces.init();
        Balanced.Root.init();
        Balanced.Logs.init();
        Balanced.Help.init(options);
        mru();
        initVeryClickable();

        $(window).scroll(onScrollAddScrollingClass);

        // hack because something is fucked and this is a band-aid
        $('[autofocus]:visible').focus();

        $('.bootstrap-popover').popover().mouseover(function () {
            $(this).popover('show');
        }).mouseout(function () {
            $(this).popover('hide');
        });

        $('time[data-format]').each(parseDateTime);

        $('form.edit-inline').inlineEditor();

        //  this should always be the last item in the list
        recordLoadTime(params.pageStartTime);

    }
};
