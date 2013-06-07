/*
 *   Init various scrolling functionality
 * */
var scrolling = (function () {
    var scrollEnd = slowYourScroll(0, 'end');
    var scrollSlow = slowYourScroll(500, 'slow');
    var counter = 0, navigationUrl = null;
    var updateNavigation = function () {
        // performance enhancement for great effect - halve the number of
        // times we respond to this event.
        if (counter++ % 2 !== 0) {
            return;
        }
        var slider = $('#slider');
        if (!slider.length) {
            return;
        }
        //  TODO: magic 10px
        var scrollThreshold = $(window).scrollTop() + $('#slider').position().top + 10;
        var nav = $('nav.dates');
        $('a', nav).removeClass('selected');
        var topMost = null;

        //  find the most lowest marker that has _not_ scrolled off the top of the screen
        $('.marker').each(function () {
            var el = $(this);
            var pos = el.position().top;
            if ((!topMost || pos > topMost.position().top) && pos <= scrollThreshold) {
                topMost = el;
            }
            if (el.position().top >= scrollThreshold) {
                return false;
            }
        });

        if (topMost) {
            selectNavigation(topMost);
        }
    };
    var selectNavigation = function (topMostElement) {
        var id = $(topMostElement)[0].id;
        var dates = id.split('-'), did = id;
        if (dates.length === 2) {
            did = dates[0];
            $('[href="#' + did.replace('marker_', '') + '"]').addClass('selected');
        } else {
            $('[href="#' + id.replace('marker_', '') + '"] + ul > li:first-child a').addClass('selected');
        }
        var url = document.location.href;
        url = (!url.indexOf('#')) ? url :
            url.substr(0, url.indexOf('#')) + '#' + did;
        if (url != navigationUrl) {
            //  FIXME: this messes up the back button
//            window.history.replaceState({}, document.title, url);
            navigationUrl = url;
        }
        $('[href="#' + id.replace('marker_', '') + '"]').addClass('selected');
    };
    return {
        init:function () {

            //  sweet scrolling nav
            $(window)
                .scroll(updateNavigation)
                .scroll(scrollEnd)
                .scroll(scrollSlow);
            updateNavigation();
        },
        update:function () {
            updateNavigation();
        }
    };
})();
