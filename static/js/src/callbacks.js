Balanced.Callbacks = (function () {
    var callbackTemplate = $('#callback-template').clone().removeClass('hidden').html();

    function initForm() {
        var $form = $('#add-a-callback form');
        var validators = {};
        $form.modalValidator({
            validators: validators
        });
    }
    function loadCallbacks() {
        var $cb = $('#callbacks');
        if (!$cb.length) {
            return;
        }
        var url = $cb.data('uri');
        $.get(url, renderCallbacks);
        $cb.on('click', '.toggle,.url,.state', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest('.callback').toggleClass('on');
        });
        $cb.on('click', '.test', function (e) {
            e.preventDefault();
            var $this = $(this);
            var $cb = $this.closest('.callback');
            var uri = $cb.data('uri');
            $cb.find('.state').removeClass('success,failed').text('pending').addClass('pending');
            $cb.removeClass('on');
            $.ajax(uri.substr(3), { type: 'PUT'}).success(function (d) {
                renderToTemplate(callbackTemplate, d.callback, '#callbacks');
            });
        });
        $cb.on('click', '.delete', function (e) {
            e.preventDefault();
            var $this = $(this);
            var $cb = $this.closest('.callback');
            var uri = $cb.data('uri');
            $cb.fadeOut();
            $.ajax(uri.substr(3), { type: 'DELETE'}).error(function (d) {
                $cb.fadeIn();
            });
        });
    }

    function renderCallbacks(data) {
        for (var callback in data.callbacks) {
            if (!data.callbacks.hasOwnProperty(callback)) {
                continue;
            }
            callback = data.callbacks[callback];
            renderToTemplate(callbackTemplate, callback, '#callbacks');
        }
    }

    function loadEvents() {
        $('[data-events-uri]').each(function(i, v) {
            var $this = $(this);
            $.get($this.data('events-uri'), function (data) {
                renderEvents(data, $this);
            });
        });
    }

    function renderEvents(data, $this) {
        var target = $this.data('events-target');
        // dirty hack because we can't have {{ items }} inside a tbody tag
        var template = $(
            $this.data('events-template')
        ).clone().removeClass('hidden').html().replace('<!--', '').replace('-->', '');

        renderToTemplate(template, data.events, target);
    }

    function renderToTemplate(template, item, appendTo) {
        var rendered = $($.mustache(template, item));
        rendered.find('time[data-format]').each(parseDateTime);
        var existing = $('[data-uri="' + item.uri + '"]');
        console.log(item.uri);
        if (existing.length) {
            existing.replaceWith(rendered);
            rendered.addClass('on');
        } else {
            rendered.appendTo(appendTo);
        }
    }

    function loadEventCallbacks() {
        $('.event-callback[data-uri]').each(function (i, v) {
            var $this = $(this);
            $.get($this.data('uri'), function (data) {
                renderEventCallback(data, $this);
            });
        });
    }

    function renderEventCallback(data, $this) {
        var template = $($this.data('template')).clone().removeClass('hidden').html();
        renderToTemplate(template, data, $this.find('.details'));
    }

    return {
        init: function (options) {
            // callbacks
            initForm();
            loadCallbacks();
            loadEvents();
            loadEventCallbacks();

            $(document).bind('inline:updated', loadEvents);

        },
        reloadEventCallback: function (data) {
            renderEventCallback(data, $('[data-uri^="' + data.uri + '"]'));
        }
    };
})();
