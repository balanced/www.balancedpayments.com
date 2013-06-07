Balanced.Help = (function () {

    function onSelect (suggestion) {
        var loc  = window.location;
        loc = loc.pathname + loc.search + '#' + suggestion.id;
        window.location = loc;
    }
    return {
        init:function (options) {
            $('[name="search-help"]').autocomplete({
                serviceUrl: "/static/js/auto_compete.json",
                minChars: 3,
                onSelect: onSelect,
                width: 660
            }).prop('autocomplete', 'on');
        }
    };
})();
