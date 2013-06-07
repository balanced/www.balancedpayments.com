Balanced.Docs = (function () {
    var $navigation = $('#documentation .navigation nav');
    var $body = $('#documentation .content');
    var $navigationWaypoints = $('h2,h3,h4', $body);
    var $window = $(window);
    var headerHeight = 34;
    var currentHash = document.location.hash;
    var onScroll = function (e) {
        var top = $window.scrollTop();
        var previous = $navigationWaypoints.first();
        $navigation.find('li').removeClass('selected');
        $navigationWaypoints.each(function () {
            var $this = $(this);
            if (!$this.attr('id')) {
                return;
            }
            var pageTop = top + headerHeight;
            var itemTop = $this.offset().top;
            if (pageTop < itemTop) {
                return false;
            }
            previous = $this;
        });
        var newHash = '#' + previous.attr('id');
        var item = $navigation.find('a[href="' + newHash + '"]');
        if (!item.length) {
            item = $navigation.find('li').first();
        }
        item.closest('li').addClass('selected');
        if (newHash === '#undefined') {
            newHash = '';
        }
        if (newHash != currentHash) {
            var wholeUri = document.location.href;
            if (currentHash) {
                wholeUri = wholeUri.replace(document.location.hash, newHash);
            } else {
                if (newHash) {
                    wholeUri += newHash;
                }
            }
            //  concession to IE
            if (!window.history || !window.history.replaceState) {
                return;
            }
            window.history.replaceState({}, null, wholeUri);
            currentHash = newHash;
        }
        return false;
    };
    var tweakOffset = function (e) {
        var $this = $(this);
        var offset = $this.offset().top;
        //  TODO: This is not jumping to the correct offset
//        console.log($window.scrollTop(), headerHeight, $this.offset().top);
//
//        console.log(offset);
//        $(window).scrollTop(offset);
//        e.preventDefault();
    };
    var replaceContentWithRealMarketplace = function (marketplaceUri, sandboxApiSecret) {
        var secretPattern = new RegExp('-u [a-f0-9]{32}:', 'gim');
        var marketplaceUriPattern = new RegExp('/v1/marketplaces/(\\w|-)+', 'gim');
        if (marketplaceUri && sandboxApiSecret) {
            $body.html(
                $body.html()
                    .replace(secretPattern, '-u ' + sandboxApiSecret + ':')
                    .replace(marketplaceUriPattern, marketplaceUri)
            );
        }
    };
    var githubItUp = function () {
        $('#github').remove().appendTo('.content-container').css({display:'block'});
    };
    var onResize = function () {
        var heightOfNavContent = $('.navigation nav').height(),
            heightOfWindow = $(window).height(),
            heightToSet;
        if (heightOfNavContent > heightOfWindow - 120) {
            heightToSet = heightOfWindow - 60;
        } else {
            heightToSet = 'auto';
        }
        $('.navigation nav').css({height:heightToSet });
    };
    var tweakAllThoseCodeSamples = function () {
        $('span.se').each(function (e, i) {
            $(this).text($(this).text().replace(/\\ /g, '\\'));
        });
    };
    return {
        init:function (options) {
            var settings = $.extend({
                marketplaceUri:'',
                sandboxApiSecret:''
            }, options);
            tweakAllThoseCodeSamples();
            onResize();
            //  bind to a slow scroll method, otherwise chrome chugs
            $(window)
                .resize(onResize)
                .bind('scroll:slow', onScroll);
            $navigation.find('a').click(tweakOffset);
            replaceContentWithRealMarketplace(settings.marketplaceUri,
                settings.sandboxApiSecret);
            githubItUp();
        }
    };
})();
