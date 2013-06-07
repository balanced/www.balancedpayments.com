(function ($) {
    $.fn.spin = function () {
        return this.after('<img src="/images/indicator.gif" id="spinner"/>');
    };
    $.fn.stopSpin = function () {
        return $("#spinner").remove();
    };

    $.fn.autosaveField = function (options) {
        var settings = $.extend({}, $.fn.autosaveField.defaults, options);
        return this.each(function () {
            var el = $(this),
                field_type = el.attr("data-field-type") || ":text",
                //  FIXME: jquery barfs on el.find(':email')
                field = (field_type == 'button') ? el : el.find(field_type === ':email' ? '[type="email"]' : field_type),
                on_error = el.find(".as-error"),
                on_success = el.find(".as-success"),
                action = el.attr("data-action"),
                spin = el.attr('data-spin') || true,
                field_name = el.attr("data-name") || field.attr('name'),
                field_value = el.attr('data-value') || field.val(),
                _on_complete = el.attr('data-on-complete'),
                begin = function (d) {
                    if (spin !== '0') {
                        field.spin();
                    }
                    $.ajax({
                        url:action,
                        type:el.data('method') || "PUT",
                        data:{
                            _method:el.data('method') || settings.method,
                            field:field_name,
                            value:field.val()
                        },
                        success:function (data) {
                            field.stopSpin();
                            on_success.show();
                            on_error.hide();
                            var tmp = field.val();
                            if (data && 'form' in data && 'data' in data.form && data.form.data[field_name]) {
                                tmp = data.form.data[field_name];
                                field.val(tmp);
                            }
                            field_value = tmp;
                            on_complete(data);
                        },
                        error:function (data) {
                            field.stopSpin();
                            el.attr("data-reset-on-error") && field.val(field_value);
                            on_error.show();
                            on_complete(data);
                        }
                    });
                },
                on_complete = function (data) {
                    if (!_on_complete) {
                        return;
                    }
                    var parts = _on_complete.split('.');
                    var l = parts.length;
                    var args = {
                        'data':data,
                        'field':field,
                        'el':el
                    };
                    if (l >= 2) {
                        var ns = null, fn = parts[l - 1];
                        for (var i = 0; i < l - 1; i++) {
                            ns = (ns) ? ns[parts[i]] : window[parts[i]];
                        }
                        if (typeof ns === 'object' && typeof ns[fn] === 'function') {
                            ns[fn](args);
                        }
                    } else {
                        if (typeof window[_on_complete] === 'function') {
                            _on_complete(args);
                        }
                    }
                };

            switch (field_type) {
                case 'input[type=checkbox]':
                case 'select':
                    field.change(function () {
                        on_error.hide();
                        on_success.hide();
                        begin();
                    });
                    break;
                case 'button':
                    field.click(function () {
                        on_error.hide();
                        on_success.hide();
                        begin();
                    });
                    break;
                default:
                    field.blur(function () {
                        $(this).val() != field_value && begin();
                    });
                    field.keyup(function () {
                        on_error.hide();
                        on_success.hide();
                    });
                    break;
            }
        });
    };

    $.fn.autosaveField.defaults = {
        method:"put"
    };
}(jQuery));
