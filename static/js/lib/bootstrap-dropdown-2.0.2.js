/* ============================================================
 * bootstrap-dropdown.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


(function ($) {

    "use strict"

    /* DROPDOWN CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle="dropdown"]'
        , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
            $el.parent().removeClass('open');
        });
    };

    Dropdown.prototype = {

        constructor:Dropdown,
        toggle:function (e) {
            var $this = $(this)
                , selector = $this.attr('data-target')
                , $parent
                , isActive;

            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
            }

            $parent = $(selector);
            $parent.length || ($parent = $this.parent());

            isActive = $parent.hasClass('open');
            clearMenus();
            !isActive && $parent.toggleClass('open');

            return false;
        }

    };

    function clearMenus(e) {
        var target = $(toggle).parent(),
            ignoreables = 'a button input:submit'.split(' '),
            untouchables = 'input:checkbox label input:date'.split(' '),
            $target = e ? $(e.target) : null;

        if ($target &&
            $target.attr('class') &&
            $target.attr('class').indexOf('ui-') >= 0) {
            return;
        }

        //  don't clear menus if did something inside the menu that triggered the event.
        if (e && target.hasClass('open') && $target.closest('.dropdown.open').length) {
            var ignore = 0, untouch = 0;
            $.each(ignoreables, function (i, v) {
                if ($target.is(v)) {

                    ignore = 1;
                    return false;
                }
            });
            if ($target.closest('form.dropdown-menu').length) {
                return;
            }

            $.each(untouchables, function (i, v) {
                if ($(e.target).is(v)) {
                    ignore = 0;
                    untouch = 1;
                    return false;
                }
            });
            if (!ignore) {
                if (!untouch) {
                    e.preventDefault();
                }
                return;
            }
        }
        target.removeClass('open')
    }


    /* DROPDOWN PLUGIN DEFINITION
     * ========================== */

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('dropdown');
            if (!data) $this.data('dropdown', (data = new Dropdown(this)));
            if (typeof option === 'string') data[option].call($this);
        });
    }

    $.fn.dropdown.Constructor = Dropdown;


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */

    $(function () {
        $('html').on('click.dropdown.data-api', clearMenus);
        $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle);
    })

})(window.jQuery);
