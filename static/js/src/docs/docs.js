Balanced.Docs = (function () {
    var isOverview = false;
    /*
     * Gets a query string parameter by name, returns a list which may have multiple
     * values for a querystring such as ?q=1&q=2
     * */
    function getParameterByName(name, queryString) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = '(?:\\?|&(?:amp;)?)(' + name + ')(?:=?([^&#]*))';
        var regex = new RegExp(regexS, 'g');
        var results;
        var resultsAsAList = [];
        queryString = queryString || window.location.search;
        while (results = regex.exec(queryString)) {
            resultsAsAList.push(decodeURIComponent(results[2].replace(/\+/g, " ")));
        }
        return resultsAsAList;
    }

    /*
     * Inserts or updates a single query string parameter
     */
    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf("?") > -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, "$1" + key + "=" + value + "$2");
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    function switchCode(language) {

        if (isOverview) {
            $('.highlight').closest('.code-block').hide();
            $('.highlight-javascript').closest('.code-block').show();
            $('.highlight-' + language).closest('.code-block').show();
        } else {
            $('.highlight').closest('.code-block').parent().hide();
            $('.highlight-javascript').closest('.code-block').parent().show();
            $('.highlight-' + language).closest('.code-block').parent().show();
        }
        var uri = updateQueryStringParameter(window.location.pathname + window.location.search, 'language', language);
        uri = uri + '' + window.location.hash;
        window.history.replaceState({}, document.title, uri);
    }

    function switchLanguage(e) {
        var $this = $(this);
        var language;
        if ($this.html() === 'curl') {
            language = 'bash';
        }
        else {
            language = $this.html();
        }
        e.preventDefault();
        $('.langbar li').removeClass('selected');
        $this.addClass('selected');
        switchCode(language);
        Balanced.Analytics.track('docs-language', language);
    }

    function toggleTehNavNav(e) {
        var $nn = $('.navnav');
        var $this = $('.nav-toggle');
        var height = $nn.outerHeight();
        var curPos = $this.offset().top - $(window).scrollTop();
        if ($nn.is(':visible')) {
            curPos -= height - 1;
        } else {
            curPos += height - 1;
            e.preventDefault();
        }
        $this.animate({top: curPos}).toggleClass('open');
        $nn.slideToggle().toggleClass('open');
    }

    function shouldIToggleTehNavNav(e) {
        var inner = $(e.target).closest('.navnav').length || $(e.target).closest('.nav-toggle').length;
        if (!inner && $('.navnav').is(':visible')) {
            toggleTehNavNav(e);
        }
    }

    function setNavNavTopic(topic) {
        $('a', '.nav-toggle').html('<span>SECTION:</span> ' + topic);
    }

    function updateNavigation(e) {
        var $this = $(this);
        var $active = $this.find('.active');
        if ($active.length != 1) {
            return;
        }
        var currentTopic = $active.first().find('a').first();
        setNavNavTopic(currentTopic.text());
        window.history.replaceState({}, null, currentTopic.attr('href'));
    }

    var githubItUp = function () {
        $('#github').remove().appendTo('.content-container').css({display: 'block'});
    };
    return {
        init: function (options) {
            isOverview = options.isOverview;
            $('.langbar li:first').addClass('selected');
            var lang = getParameterByName('language', window.location.href);
            lang = (lang.length > 0) ? lang[0] : 'bash';
            switchCode(lang);
            $('.langbar li').on('click', switchLanguage)
                .removeClass('selected')
                .filter(':contains("' + lang + '")')
                .addClass('selected');
            if (lang === 'bash') {
                $('.langbar li:contains("curl")').addClass('selected');
            }
            $('body').scrollspy({
                target: '#contents > ul',
                offset: 100
            });
            $('.navnav a').click(toggleTehNavNav);
            $('.nav-toggle').click(toggleTehNavNav);
            $(window).click(shouldIToggleTehNavNav);
            $('#contents li').bind('activate', updateNavigation);
            //  hack, the generated css doesn't quite let us do this
            $('.nested1').parent().css({overflow: 'initial'});
        }
    };
})();

