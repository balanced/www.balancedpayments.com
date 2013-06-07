(function ($) {

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    //  returns elements that are positioned above the parameter
    //  $('#div:above(100)').css('background-color', 'red');
    $.expr[':'].above = function (obj, index, meta, stack) {
        return $(obj).offset().top < meta[3];
    };

    // new content slides in as the old content slides out
    $.fn.slideTo = function (htmlContentToRender, options, callback) {
        if (!callback && typeof options === 'function') {
            callback = options;
            options = {};
        }
        var settings = $.extend({
            duration: 500,
            easing: 'swing'
        }, options);
        var t = $(this);
        var width = t.width();
        var transfer = $('<div class="transfer"></div>').css({width: (2 * width)});
        var current = $('<div class="current"></div>').css({
            width: width, left: 0, 'float': 'left'
        }).html(t.html());
        var next = $('<div class="next"></div>').css({
            width: width, left: width, 'float': 'left'
        }).html(htmlContentToRender);
        transfer.append(current).append(next);
        t.html('').append(transfer);
        transfer.animate({'margin-left': '-' + width}, {
                duration: settings.duration,
                easing: settings.easing
            }, function () {
                t.html(htmlContentToRender);
                if (callback) {
                    callback();
                }
            }
        );
        return this;
    };

    //  new content slides over the top of the existing content
    $.fn.wipeTo = function (htmlContentToRender, options, callback) {
        if (!callback && typeof options === 'function') {
            callback = options;
            options = {};
        }
        var settings = $.extend({
            duration: 500,
            easing: 'swing'
        }, options);

        var t = $(this);
        var width = t.width(),
            height = t.height(),
            position = t.position();
        var left = position.left, top = position.top;
        var transfer = $('<div class="transfer"></div>').css({
            width: 0, position: 'absolute', left: width + left, top: top,
            'background-color': 'white', height: height, overflow: 'hidden'
        });
        var container = $('<div></div>').css({
            width: width, overflow: 'hidden'
        });
        container.append(htmlContentToRender);
        transfer.append(container);
        t.append(transfer);
        transfer.animate({left: left}, {
            duration: settings.duration,
            easing: settings.easing,
            step: function (x, e) {
                $(this).css({width: width + left - x});
            },
            complete: function () {
                t.html('<div id="body-content">' + htmlContentToRender + '</div>');
                if (callback) {
                    callback();
                }
            }
        });
        return this;
    };

    $.fn.wipeOut = function (htmlContentToRender, existingContainer, options, callback) {
        if (!callback && typeof options === 'function') {
            callback = options;
            options = {};
        }
        var settings = $.extend({
            duration: 500,
            easing: 'swing'
        }, options);

        var t = $(this);
        var width = t.width(),
            height = t.height(),
            position = t.position();
        var left = position.left, top = position.top;
        var html = $(existingContainer).html();
        var transfer = $('<div class="transfer"></div>').css({
            width: width, position: 'absolute', left: 15, top: top,
            'background-color': 'white', height: height, overflow: 'hidden', 'z-index': 12
        });
        var container = $('<div></div>').css({
            width: width, overflow: 'hidden'
        });
        container.append(html);
        transfer.append(container);
        t.append(htmlContentToRender);
        t.append(transfer);
        $(existingContainer).remove();
        transfer.animate({left: width + left}, {
            duration: settings.duration,
            easing: settings.easing,
            step: function (x, e) {
                $(this).css({width: width - left - x});
            },
            complete: function () {
                transfer.remove();
                t.html('<div id="body-content">' + htmlContentToRender + '</div>');
                if (callback) {
                    callback();
                }
            }
        });
        return this;
    };

    /*
     *  Pre-fill the specified container to the calculated size it will be once
     *  all the items are loaded into it.
     */
    $.fn.anticipateGrowth = function (options) {
        var settings = $.extend({
            container: null,
            count: 0,
            height: 0,
            padding: 0,
            template: null,
            templates: null
        }, options);
        var calculatedHeight = settings.height * settings.count + settings.padding;
        $(this).css({
            'min-height': (calculatedHeight) ? calculatedHeight : 'auto'
        });
        if (settings.container && (settings.template || settings.templates)) {
            var existingCount = $(settings.container).children().length;
//            console.log(existingCount);
//            for (var i = 0 ; i < settings.templates.length; i++) {
//                console.log(i,
//                    settings.templates[i],
//                    $('.infinite tbody tr:eq(' + (i - 1) + ')'));
//            }
            var length = (settings.templates) ? settings.templates.length : settings.count;
            for (var i = existingCount + 1; i < length; i++) {
                var t;
                if (settings.templates) {
                    t = settings.templates[i];
                } else {
                    t = settings.template;
                }
                $(t).appendTo(settings.container);
            }
        }
    };

})(jQuery);

(function ($) {
    var methods = {
        init: function () {
        },
        show: function () {
            return this.each(function () {
                $(this).closest('fieldset').addClass('error');
            });
        },
        hide: function () {
            return this.each(function () {
                $(this).closest('fieldset').removeClass('error');
            });
        }
    };
    $.fn.fieldError = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.fieldError');
            }
        }
    };
})(jQuery);

(function ($) {
    var _options = {height: 100, duration: 400};

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this), data = $this.data('suberror');
                var settings = $.extend(_options, options);
                if (data) {
                    return;
                }
                $this.addClass('with-error-box');
                var body = $('.error-frame', $this);
                if (!body.length) {
                    $('>*', $this).wrapAll('<div class="error-frame"></div>');
                    body = $('.error-frame', $this);
                }
                var error = $('<div class="sub-errors hidden"></div>');
                error.insertAfter(body).hide();
                $this.data('suberror', {
                    target: $this, error: error, settings: settings
                });
            });
        },
        show: function (message, callback) {
            return this.each(function () {
                var $this = $(this), data = $this.data('suberror');
                //  nuke current animations in case someone is animating hide
                data.error.stop(null, true, true);
                var msg = $('<span class="error">' + message + '</span>');
                msg.appendTo(data.error);
                data.error.show().css({display: 'block'}).animate({top: 0}, data.settings.duration, callback);
            });
        },
        hide: function (duration) {
            return this.each(function () {
                var $this = $(this), data = $this.data('suberror');
                if (duration === null) {
                    duration = data.settings.duration;
                }
                data.error.animate({top: -data.settings.height}, duration, function () {
                    $('.error', data.error).remove();
                    data.error.hide();
                });
            });
        },
        clear: function () {
            return this.each(function () {
                var $this = $(this), data = $this.data('suberror');
                $('.error', data.error).remove();
            });
        }
    };
    $.fn.subError = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.subError');
            }
        }
    };
})(jQuery);


/*
 * Framer - Slide in most content, slide out if going back to one of the url
 *   patterns matched in backwards.
 */
var framer = (function () {
//    var slides = {};
//    var stateInitialized = 0;
//    var container = '#body-content-queue';
//    var transformation = 'change';
//    var pjaxTimeout = 4000; //  allow 4 seconds to load content before reloading the entire page.
//    var isPjaxin = 0;
//    var r = {
//        marketplaces:'/marketplaces$',
//        sub_marketplace:'/marketplaces/(\\w|-)+/',
//        marketplace:'/marketplaces/(\\w|-)+',
//        marketplace_root:'/marketplaces/(\\w|-)+$',
//        marketplace_resources:'/marketplaces/(\\w|-)+/(credits|debits|holds|accounts)$',
//        marketplace_resource:'/marketplaces/(\\w|-)+/(credits|debits|holds|accounts)/(\\w|-)+$'
//    };
//
//    var initPJAX = function () {
//        return;
//        $('[data-pjax]').live('click', function (e) {
//            var url = $(this).attr('href');
//            console.log(url);
//            console.log(slides);
//            //  user is clicking on the same url as the current page, let's
//            //  not interfere in case we messed something up.
//            if (url === location.path) {
//                return;
//            }
//            $.pjax({
//                url:url,
//                container:container,
//                timeout:pjaxTimeout
//            });
//            e.preventDefault();
//        });
//        $(container)
//            .bind('pjax:beforeSend', function () {
//                var url = arguments[2].url;
//                var a = document.createElement('a');
//                a.href = url;
//                url = a.pathname;
//                console.log('pjax:beforeSend', url);
//                // TODO:
//                //  this is supposed to allow us to manually simulate a pjax load
//                //  while actually loading the content from a cache. however, it
//                //  is not working quite right so we will remove it for now.
////                if (url && url in slides) {
////                    console.log('    we have the url', url, 'in our cache');
////
////                    //  manually fire events
////                    $(container).trigger('pjax:start');
////                    $(container).trigger('pjax:beforeSuccess');
////                    $(container).html(slides[url]);
////                    //manualPush(url);
////                    $(container).trigger('pjax:success');
////                    $(container).trigger('pjax:complete');
////                    $(container).trigger('pjax:end');
////
////                    arguments[0].preventDefault();
////                }
//            })
//            .bind('pjax:start', function () {
//                $('#pjax-loading').show();
//            })
//            .bind('pjax:beforeSuccess', function () {
//                $(window).unbind('.infscr');
//                //  tag frame
//            })
//            .bind('pjax:success', loadQueuedContent)
//            .bind('pjax:complete', function () {
//                $(window).scrollTop(0);
//                $('#pjax-loading').fadeOut('slow');
//            })
//            .bind('pjax:end', function () {
//                $('#pjax-loading').hide();
//            });
//        $(window).bind('popstate', popState);
//    };
//    var manualPush = function (url) {
//        //  manual push
//        var state = {
//            url:url, pjax:container
//        };
//        console.log('manual push', state, url);
//        window.history.pushState(state, document.title, url);
//    };
//    var popState = function (e) {
//        if (!stateInitialized) {
//            stateInitialized = 1;
//        }
//        console.log('popstate', e);
//    };
//    var slideBackTo = function (url) {
//        console.log('slide back to ' + url);
//        if (url in slides) {
//            $('#slider').wipeOut(slides[url], '#body-content', doneChanging);
//        } else {
//            console.warn(url, 'not in history!');
//            framer.changeTo(url, 'backward');
//        }
//    };
//    var slideForwardTo = function (url) {
//        console.log('slide forward to ' + url);
//        if (url in slides) {
//            $('#slider').wipeTo(slides[url], doneChanging);
//        } else {
//            console.warn(url, 'not in history!');
//            framer.changeTo(url, 'forward');
//        }
//    };
//    var changeTo = function (url) {
//        console.log('slide forward to ' + url);
//        if (url in slides) {
//            $('#slider').html('<div id="body-content">' + slides[url] + '</div>');
//            doneChanging();
//        } else {
//            console.warn(url, 'not in history!');
//            framer.changeTo(url);
//        }
//    };
//    var doneChanging = function () {
//        $(container).html('');
//        $('[data-url]', '#slider').data('url', location.pathname);
//        pageUpdate();
//    };
//    //  FIXME: This is beginning to look like regex -> regex pattern matching,
//    //      we should be able to look through a set of rules rather than running
//    //      in serial.
//    var calculateTransformation = function (currentUrl, previousUrl) {
//        //  eligible for a back transformation:
//        //      within the same marketplace
//        //      specific transaction -> list of transactions
//        //      list of anything to marketplace root
//        var mpr = new RegExp(r.marketplaces);           // marketplace root
//        var smp = new RegExp(r.marketplace);            // specific marketplace
//        var smpr = new RegExp(r.marketplace_root);      // specific marketplace root
//        var show = new RegExp(r.marketplace_resource);  //  show
//
//        var currentUrlMatch, previousUrlMatch;
//
//        //  check if moving from marketplace root to a marketplace.
//        currentUrlMatch = smp.exec(currentUrl);
//        previousUrlMatch = mpr.exec(previousUrl);
//        if (currentUrlMatch && previousUrlMatch) {
//            console.log('moving from marketplace root');
//            return 'forward';
//        }
//        //  check if moving from a marketplace to the marketplaces root.
//        currentUrlMatch = mpr.exec(currentUrl);
//        previousUrlMatch = smp.exec(previousUrl);
//        if (currentUrlMatch && previousUrlMatch) {
//            console.log('moving from marketplace root');
//            return 'backward';
//        }
//        //  if moving between different marketplaces or not in a marketplace then we can quit
//        currentUrlMatch = smp.exec(currentUrl);
//        previousUrlMatch = smp.exec(previousUrl);
//        if (!currentUrlMatch || !previousUrlMatch ||
//            currentUrlMatch.index !== previousUrlMatch.index ||
//            currentUrl.substr(0, currentUrlMatch.index) !== previousUrl.substr(0, previousUrlMatch.index)) {
//
//            console.log(r.marketplace, smp, currentUrlMatch, previousUrlMatch);
//            console.log('moving between marketplaces');
//            return null;
//        }
////        console.log(currentUrlMatch);
//        //  check if moving from inside a marketplace to the marketplace root
//        currentUrlMatch = smpr.exec(currentUrl);
//        previousUrlMatch = smp.exec(previousUrl);
//
//        if (currentUrlMatch && previousUrlMatch) {
//            console.log('moving from marketplace to marketplaces root');
//            return 'backward';
//        }
//
//        //  check special cases:
//        //      moving from index to any show
//        currentUrlMatch = show.exec(currentUrl);
//        if (currentUrlMatch && previousUrlMatch) {
////            console.log(currentUrlMatch, previousUrlMatch);
//            console.log('moving from index => show');
//            return 'forward';
//        }
//
//        //  moving from marketplace root to inside marketplace
//        previousUrlMatch = smpr.exec(previousUrl);
//        currentUrlMatch = smp.exec(currentUrl);
//        if (currentUrlMatch && previousUrlMatch) {
//            console.log('moving from root to inside');
//            return 'forward';
//        }
//
//        previousUrlMatch = show.exec(previousUrl);
//        currentUrlMatch = smp.exec(currentUrl);
//        if (currentUrlMatch && previousUrlMatch) {
////            console.log(currentUrlMatch, previousUrlMatch);
//            console.log('moving from show => index');
//            return 'backward';
//        }
//
//        //      TODO: moving from (credits|debits|holds) -> transactions
//
//        console.log('no special case match');
//
//    };
//    var loadQueuedContent = function (e) {
//        var trans = null;
//        if (e.relatedTarget) {
//            var tmpTrans = $(e.relatedTarget).data('pjax-trans');
//            if (tmpTrans) {
//                trans = tmpTrans;
//            }
//        }
//
//        var currentUrl = location.pathname;
//        currentUrl = currentUrl.replace(location.hash, '');
//        //  keep this in case we want to go back to it later.
//        slides[currentUrl] = '<div class="slide">' + $(container).html() + '</div>';
//
//        var previousUrl = $('[data-url]', '#slider').data('url');
//
//        //  we have no explicit transformation animation and we know the previous page.
//        if (!trans && previousUrl) {
//            trans = calculateTransformation(currentUrl, previousUrl);
//            console.log('special case:', previousUrl, '=>', currentUrl, trans);
//        }
//
//        switch (trans) {
//            case 'forward':
//                slideForwardTo(currentUrl);
//                break;
//            case 'backward':
//                slideBackTo(currentUrl);
//                break;
//            default:
//                changeTo(currentUrl);
//                break;
//        }
//    };
//    var pageUpdate = function () {
//        infinite.init('.infinite');
//    };
    return {
        init: function () {
//            initPJAX();
        }
//        changeTo:function (url, trans) {
//            console.log('changeTo');
//            transformation = (trans) ? trans : 'change';
//            $.pjax({
//                url:url,
//                container:container
//            });
//        }
    };
})();

/*
 fires a named event scroll:eventName when threshold is greater than the
 number of pixels scrolled in the last 500ms.
 e.g. slowYourScroll(500, 'loadForte');
 will fire an event scroll:loadForte if the browser has scrolled less than
 px in the last 500ms.
 */
var slowYourScroll = function (threshold, eventName) {
    if (!eventName) {
        eventName = threshold;
    }
    return function () {
        var pos = $(window).scrollTop();
        setTimeout(function () {
            var curPos = $(window).scrollTop();
            var diff = Math.abs(curPos - pos);
            if (diff <= threshold) {
                trigger('scroll:' + eventName.toString(), [curPos]);
            }
        }, 100);
    };
};

function trigger(type, args) {
    var event = $.Event(type);
    $(window).trigger(event, args);
    return !event.isDefaultPrevented();
}

// post anything to /logs for later.
var logData = function (subMount, data) {
    if (typeof subMount === 'object') {
        data = subMount;
        subMount = '';
    }
    if (subMount && subMount.substr(0) !== '/') {
        subMount = '/' + subMount;
    }
    var request = {
        type: 'POST',
        url: '/logs' + subMount,
        data: $.param(data)
    };
    $.ajax(request);
};

var recordLoadTime = function (pageStartTime) {
    var duration = (new Date()).getTime() - pageStartTime;
    Balanced.Analytics.recordLoadTime(duration);
};

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
    } else {
        return uri + separator + key + "=" + value;
    }
}

var EditableField = (function () {
    var toggleEditableField = function (e, fieldName, $this) {
        //  $this is a link
        var container = $this.closest('.inf');
        var text = $('span.' + fieldName, container).text();
        if (text === 'None') {
            text = '';
        }
        $('span.' + fieldName, container).toggle();
        $('input[name="' + fieldName + '"]', container).val(text).focus();
        $('form', container).toggle();
        $('button', container).hide();
        var editText = $this.data('og-text') || 'Edit';
        $this.text($this.text() === editText ? 'Save' : editText);
        if (e) {
            e.preventDefault();
        }
    };

    var updateEditableField = function ($t) {
        var $inf = $t.closest('.inf');
        var $form = $('form', $inf);
        if ($t.text() === 'Save') {
            var values = {};
            $.each($form.serializeArray(), function (i, field) {
                values[field.name] = field.value;
            });
            values.field = $('input[type!="hidden"]', $form).attr('name');
            $.ajax({url: $form.attr('action'), type: 'PUT', data: values});
            $('.' + values.field, $inf).text(values[values.field]);
        } else {
            $('input:visible', $form).focus();
        }
    };
    var doIt = function (e, $this) {
        var fieldName;
        var classes = $this.attr('class').split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].indexOf('edit-') === 0) {
                fieldName = classes[i].replace('edit-', '');
                break;
            }
        }
        updateEditableField($this);
        return toggleEditableField(e, fieldName, $this);
    };
    return {
        init: function () {
            $('a[class^="edit-"]').click(
                function (e) {
                    var $this = $(this);
                    return doIt(e, $this);
                }).closest('.inf').find('form').submit(function (e) {
                    var $link = $(this).closest('.inf').find('a[class^="edit-"]');
                    return doIt(e, $link);
                });
        },
        toggle: toggleEditableField
    };
})();

var setCookie = function (name, value, ageInDays) {
    var parts = [
        name + '=' + value, 'path=/'
    ];
    if (ageInDays) {
        var date = new Date();
        date.setTime(date.getTime() + (ageInDays * 24 * 60 * 60 * 1000));
        parts.push('expires=' + date.toGMTString());
    }
    document.cookie = parts.join(';');
};

//  sets the mru cookie to the most recently viewed marketplace - used for maintaining state
var mru = function () {
    var marketplaceUriPattern = '/marketplaces/(\\w|-)+';
    var currentPageUri = document.location;
    var match = new RegExp(marketplaceUriPattern).exec(currentPageUri);
    if (match) {
        setCookie('mru', match[0], 31);
    }
};

var validate = (function () {
    return {
        email: function (input) {
            var match = input.match(/^.+@[^.].*\.[a-z]{2,10}$/);
            return match && match.toString() === input;
        }
    };
})();

var initErrorHandling = function () {
    if (options.debug) {
        return;
    }
    window.onerror = function (page, action, args) {
        logData('errors', {
            page: page,
            action: action,
            args: args
        });
        return true;
    };
};

var formUtils = (function () {
    return {
        disable: function (form) {
            $(form).find('input,select,textarea,button,a')
                .attr('disabled', 'disabled')
                .addClass('disabled');
        },

        enable: function (form) {
            $(form).find('input,select,textarea,button,a')
                .removeAttr('disabled')
                .removeClass('disabled');
        }
    };
})();

var keyCombo = (function () {
    var code = 'QWER';
    var keys = {};
    for (var i = 0; i < code.length; i++) {
        keys[code.charCodeAt(i)] = 0;
    }
    function hiddenCombo(e) {
        if (e.which in keys) {
            keys[e.which] = e.type == 'keydown';
        }

        var allDown;
        for (var k in keys) {
            allDown = keys[k];
            if (!allDown) {
                break;
            }
        }
        if (allDown) {
            $('.hide-until-keycombo').css({
                display: 'inherit'
            });
        }
    }

    return {
        init: function () {
            $(document).keydown(hiddenCombo).keyup(hiddenCombo);
        }
    };
})();

$('form[method="delete"].confirm').submit(function (e) {
    var $t = $(this);
    var noPrompt = $t.hasClass('no-prompt');
    e.preventDefault();
    if (noPrompt || confirm('Are you sure?')) {
        $.ajax($.attr('action'), {
            type: $t.attr('method')
        }).done(function (d) {
                var after = $t.data('redirect');
                window.location = (after ? after : '/marketplaces');
            });
    }
});

function initVeryClickable() {
    $(document).on('click', '[data-href]', function (e) {
        var url = $(this).data('href');
        if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
            window.open(url, '_blank');
        } else {
            window.location = url;
        }
        e.preventDefault();
    });
}

/*
 * Basic form validator
 *
 * var $form = $('#pay-a-seller');
 * var validators = {
 *   account_name: ['required'],
 *   amount: ['required', 'decimal'],
 *   bank_code: ['required',
 *   balanced.bankAccount.validateRoutingNumber],
 *   account_number: ['required']
 * };
 * var data = formLib.validateForm($form, validators);
 * // data === { data: {account_name: ''...}, errors: 0};
 * */

var formLib = {
    addErrorToField: function ($form, fieldName, message) {
        var controlGroup = $form.find('[name$="' + fieldName + '"]')
            .closest('.control-group');
        controlGroup.addClass('error');
        if (message) {
            var msg = controlGroup.find('.help-inline');
            if (!msg.length) {
                msg = $('<span class="help-inline"></span>').appendTo(controlGroup);
            }
            msg.text(message).addClass('error-message');
        }
    },
    disable: function ($form) {
        $form.find('button,input,select').attr('disabled', 'disabled');
    },
    enable: function ($form) {
        $form.find('button,input,select').removeAttr('disabled');
    },
    serialize: function ($form) {
        return $('input, select', $form).serializeObject();
    },
    focus: function ($form) {
        $form.find('.control-group.error').first().find('input,select').focus();
    },
    clear: function ($form) {
        $form.find('.control-group').removeClass('error').find('.error-message').remove();
    },
    validate: function ($form, validators) {
        var _addErrorToField = function (fieldName) {
            formLib.addErrorToField($form, fieldName);
        };
        //  reset
        formLib.clear($form);
        var data = formLib.serialize($form);
        for (var field in validators) {
            var vs = validators[field];
            var value = data[field];
            for (var i in vs) {
                i = vs[i];
                switch (i) {
                    case 'required':
                        if (!value) {
                            _addErrorToField(field);
                        }
                        break;
                    case 'decimal':
                        if (isNaN(parseFloat(value)) || !isFinite(value)) {
                            _addErrorToField(field);
                        } else {
                            // it's not isNan so let's check the number of decimal places
                            // we can't do that with mod because
                            // 2.99 % 1 == 0.990000000000002
                            // so we're going to toString, look for a . and then
                            // count the number of decimals if so
                            var split = value.split('.');
                            if (split && split.length > 1 && split[1].length > 2) {
                                _addErrorToField(field);
                            }
                        }
                        break;
                    case '>=0.5':
                        if (value < 0.5) {
                            _addErrorToField(field);
                        }
                        break;
                    default:
                        if (i) {
                            if (!i(value)) {
                                _addErrorToField(field);
                            }
                        }
                }
            }
        }
        // focus on error
        var errors = $form.find('.control-group.error');
        formLib.focus($form);
        return {
            'data': data,
            'errors': errors.length
        };
    }
};

function parseShittyErrorMessage(error) {
    var token = 'Invalid field [';
    var description = error.description;
    if (!description) {
        return;
    }
    var idx = description.indexOf(token) + token.length;
    var eIdx = description.indexOf(']', idx);
    if (idx >= 0) {
        var errorField = description.substr(idx, eIdx - idx);
        var msge = description.substr(eIdx + 3, description.indexOf('Your request id') - eIdx - 4);
        return {
            field: errorField,
            message: msge.trim()
        };
    }
}

(function ($) {
    var _ns = 'modalValidator';
    var _defaultOptions = {};

    var success = function (d) {
        if (d.uri) {
            var embedded = getParameterByName('embedded');
            var uri = d.uri;
            if (embedded) {
                uri = updateQueryStringParameter(uri, 'embedded', 1);
            }
            document.location = uri;
        } else {
            document.location.reload();
        }
    };
    var error = function (d) {
        var $form = $(this);
        var error = $.parseJSON(d.responseText);
        formLib.enable($form);
        var specificErrors = $.extend(
            error.additional || {},
            error.extras || {}
        );
        switch (error.category_code) {
            case 'card-declined':
                formLib.addErrorToField($form, 'amount', 'Sorry, this card has been declined');
                break;
            case 'insufficient-funds':
                formLib.addErrorToField($form, 'amount', 'You have insufficient funds');
                break;
            default:
                var result = parseShittyErrorMessage(error);
                if (result) {
                    formLib.addErrorToField($form, result.field, result.message);
                }
        }
        if (specificErrors) {
            for (var field in specificErrors) {
                if (!specificErrors.hasOwnProperty(field)) {
                    continue;
                }
                console.log(field, specificErrors[field]);
                formLib.addErrorToField($form, field, specificErrors[field]);
            }
        }
    };

    function submit($form) {
        var data = formLib.validate($form, $form.data(_ns).settings.validators);
        if (data.errors) {
            return;
        }
        console.log(data.errors, $form.data(_ns));
        formLib.disable($form);
        $.ajax($form.attr('action'),
            {
                data: data.data,
                dataType: 'json',
                type: $form.attr('method') || 'POST',
                context: $form
            }
        ).success(success).error(error);
    }

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data(_ns);
                var settings = $.extend({}, _defaultOptions, options);
                if (data) {
                    return;
                }
                $this.data(_ns, {
                    target: $this,
                    settings: settings
                });
                $this.submit(function (e) {
                    e.preventDefault();
                    submit($this);
                });
            });
        }
    };
    $.fn.modalValidator = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.modalValidator');
            }
        }
    };

})(jQuery);

(function ($) {
    var _ns = 'inlineEditor';
    var _defaultOptions = {};

    function submit($form) {
        var success = function (d) {
            if (d && d.form && d.form.data) {
                var data = d.form.data;
                for (var k in data) {
                    var value = data[k];
                    $form.find('span.' + k).text(value);
                }
            }
            $form.removeClass('edit');
            $.event.trigger('inline:updated', [d]);
        }, error = function (d) {
            var error = $.parseJSON(d.responseText);
            if (!error) {
                return;
            }
            if (error.additional) {
                for (var k in error.additional) {
                    var errors = error.additional[k];
                    formLib.addErrorToField($form, k, errors[0]);
                }
            } else {
                var result = parseShittyErrorMessage(error);
                if (result) {
                    formLib.addErrorToField($form, result.field, result.message);
                }
            }
        };
        $form.find('.error').removeClass('error').find('.error-message').hide();
        //  submit!
        var data = $('input, select', $form).serializeObject();
        $.ajax($form.attr('action'), {
            data: data,
            type: $form.attr('method')
        }).success(success).error(error);
    }

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data(_ns);
                var settings = $.extend({}, _defaultOptions, options);
                if (data) {
                    return;
                }
                $this.data(_ns, {
                    target: $this, settings: settings
                });
                $this.find('.inline-edit').click(function (e) {
                    e.preventDefault();
                    $this.inlineEditor('toggle');
                });
                $this.submit(function (e) {
                    e.preventDefault();
                    $this.inlineEditor('toggle');
                });
            });
        },
        toggle: function () {
            return this.each(function () {
                var $form = $(this);
                if ($form.hasClass('edit')) {
                    submit($form);
                } else {
                    $form.addClass('edit');
                }
            });
        }
    };
    $.fn.inlineEditor = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.inlineEditor');
            }
        }
    };
})(jQuery);


(function ($) {
    var _interval = {};
    var _defaultOptions = {};

    var methods = {
        init: function () {
        },
        start: function () {
            return this.each(function () {
                var $this = $(this);
                var degrees = 0;
                _interval[$this] = setInterval(function () {
                    degrees += 1;
                    $this.css({
                        '-webkit-transform': 'rotate(' + degrees + 'deg)',
                        '-moz-transform': 'rotate(' + degrees + 'deg)',
                        '-ms-transform': 'rotate(' + degrees + 'deg)',
                        '-o-transform': 'rotate(' + degrees + 'deg)',
                        'transform': 'rotate(' + degrees + 'deg)',
                        'zoom': 1
                    }, 0);
                }, 10);
            });
        },
        stop: function () {
            return this.each(function () {
                var $this = $(this);
                clearInterval(_interval[$this]);
            });
        }
    };
    $.fn.rotator = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.rotator');
            }
        }
    };
})(jQuery);

function showLoader(e) {
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
        return;
    }
    $('#pjax-loading').show();
    $('.rott', '#pjax-loading').rotator('start');
}
function initUtils() {
    var preloads = [
        $('.rott').css('background-image')
    ];
    $('a', '#app-menu').not('[data-target]').not('[data-dismiss]').not('.delete').click(showLoader);
    $('a', '#body-content').not('[data-target]').not('[data-dismiss]').not('.delete').not('[href^="#"]').click(showLoader);
    $('[data-href]', '#body-content').click(showLoader);
    $('button', '.log-filter').click(showLoader);
    for (var i = 0; i < preloads.length; i++) {
        var pl = preloads[i];
        if (!pl) {
            continue;
        }
        var match = pl ? pl.match(/^url\(['"]?(.+)["']?\)$/) : null;
        if (match) {
            pl = match[1];
        }
        new Image().src = pl;
    }
}

$('.print-me').click(function (e) {
    e.preventDefault();
    window.print();
});


function parseDateTime(e) {
    var $t = $(this);
    var dt = $t.attr('datetime');
    var format = $t.data('format');
    if (!dt || dt.indexOf('T') === -1) {
        return;
    }
    var x = Date.parseISO8601(dt).strftime(format);
    if (x.toUpperCase().indexOf('UNDEFINED') === -1 && x.toUpperCase().indexOf('NAN') === -1) {
        $t.text(x);
        if (!$t.attr('title')) {
            $t.attr('title', dt);
        }
    } else {
        console.error('Could not parse', dt, format, x);
    }
}


// this wil blindly submit any form via ajax that's tagged with the
// data-ajax attribute.
/*
 <form method="post" action="/post/here"
 data-ajax="true" // this will be sent via ajax
 data-callback="Balanced.Callbacks.reloadEventCallback" // callback to call with data from controller on complete
 >
 // anything inside this form will be json serialized and sent along
 </form>

 * */
$(document).on('submit', 'form[data-ajax="true"]', function (e) {
    e.preventDefault();
    var $form = $(this);

    function whenDone(data) {
        var callback = $form.data('callback');
        if (!callback) {
            return;
        }
        if (callback && typeof callback === 'string') {
            var parts = callback.split('.');
            callback = window;
            for (var i = 0; i < parts.length; i++) {
                callback = callback[parts[i]];
            }
        }
        callback(data);
    }

    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: $form.serialize()
    }).done(whenDone);
});


// browser hack bs for font compatibility on windows
var ua = window.navigator.userAgent;
ua.indexOf('Windows') > 0 && $('body').addClass('win');
ua.indexOf('Chrome') > 0 && $('body').addClass('chrome');

var cachedBuster = 1;
$('body.embedded').each(function () {
    var shitToChange = '[data-href],a,form';
    var shitters = 'data-href,href,action'.split(',');
    // xdomain hack
    if (document.domain.indexOf('balancedpayments.com') >= 0) {
        document.domain = 'balancedpayments.com';
        cachedBuster += 1;
    }
    $('[data-href],a,form').each(function (i, e) {
        var $t = $(e);
        for (var idx in shitters) {
            if (!shitToChange.hasOwnProperty(idx)) {
                continue;
            }
            var attr = shitters[idx];
            var eattr = $t.attr(attr);
            if (eattr) {
                $t.attr(attr, updateQueryStringParameter(eattr, 'embedded', '1'));
            }
        }
    });
});
