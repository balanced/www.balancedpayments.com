Balanced.Analytics = (function () {
    var myTracker;
    var googleQueue;
    var TRACK_EVENT = '_trackEvent';
    var init = 0;
    if (window['_gat'] !== undefined) {
        myTracker = _gat._getTrackerByName();
    } else {
        myTracker = null;
    }
    if (window['_gaq'] !== undefined) {
        googleQueue = _gaq;
    } else {
        googleQueue = [];
    }
    var categories = {
        click:'click',
        paging: 'paging',
        speed:'speed'
    };
    function recordOutboundLink(e) {
        //  all outbound links should open in a new window so there's no need to
        //  capture the event and do anything with it.
        var $this = $(this);
        var href = $this.attr('href');
        _track(categories.click, 'outbound-link', href);
    }
    function recordModalClick(e) {
        var $this = $(this);
        var target = $this.attr('id');
        _track(categories.click, 'modal', target);
    }
    function recordPagination(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var page = getParameterByName('page', href);
        var url = window.location.pathname;
        var pageName = url.substring(url.lastIndexOf('/') + 1);
        if (page.length) {
            _track(categories.paging, pageName, page[0]);
        }
        e.preventDefault();
        setTimeout(function() {
            window.location = href;
        }, 100);
    }
    function initMixPanel(mixOptions) {
        (function (c, a) {
            window.mixpanel = a;
            var b, d, h, e;
            b = c.createElement("script");
            b.type = "text/javascript";
            b.async = !0;
            b.src = ("https:" === c.location.protocol ? "https:" : "http:") + '//cdn.mxpnl.com/libs/mixpanel-2.1.min.js';
            d = c.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(b, d);
            a._i = [];
            a.init = function (b, c, f) {
                function d(a, b) {
                    var c = b.split(".");
                    2 === c.length && (a = a[c[0]], b = c[1]);
                    a[b] = function () {
                        a.push([b].concat(Array.prototype.slice.call(arguments, 0)));
                    };
                }
                var g = a;
                "undefined" !== typeof f ? g = a[f] = [] : f = "mixpanel";
                g.people = g.people || [];
                h = "disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.identify people.set people.increment".split(" ");
                for (e = 0; e < h.length; e++) {
                    d(g, h[e]);
                }
                a._i.push([b, c, f]);
            };
            a.__SV = 1.1;
        })(document, window.mixpanel || []);
        mixpanel.init(mixOptions.token);
        if (mixOptions.distinctId && mixOptions.distinctId.length) {
            mixpanel.identify(mixOptions.distinctId);
        }
        if (mixOptions.name_tag) {
            mixpanel.name_tag(mixOptions.name_tag);
            mixpanel.people.set({
                name: mixOptions.name_tag,
                email_address: mixOptions.email_address
            });
        }
    }
    function _track (category, action, opt_label, opt_value, opt_noninteraction) {
        googleQueue.push([TRACK_EVENT, category, action, opt_label, opt_value, opt_noninteraction]);
        if (category === categories.speed) {
            return;
        }
        mixpanel.track(category + '-' + action, {
                label: opt_label,
                value: opt_value
            }
        );
    }
    return {
        init:function (options) {
            if (init) {
                return;
            }
            $('a[href^="http"]').click(recordOutboundLink);
            $('[data-toggle="modal"]').each(function (i, e) {
                $($(this).data('target')).on('shown', recordModalClick);
            });
            $('a.btn', '.pagination').click(recordPagination);
            initMixPanel(options.mixpanel);
            var x = function () {
                $('<input type="hidden" name="distinct_id" value="' + mixpanel.get_property('distinct_id') + '">').appendTo('form');
            }, y = function () {
                if (mixpanel.get_property) {
                    x();
                } else {
                    setTimeout(y, 100);
                }
            };
            setTimeout(y, 100);
            init = 1;
        },
        recordLoadTime: function (duration) {
//            _track(categories.speed, 'page-load', null, duration);
        },
        track: function (category, action, opt_label, opt_value, opt_noninteraction) {
            return _track(category, action, opt_label, opt_value, opt_noninteraction);
        }
    };
})();
