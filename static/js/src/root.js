Balanced.Root = (function () {
    var scrollingNav = $('#always-naving');
    var scrollingHeadings = [];
    var scrollThis = ($.browser.mozilla || $.browser.msie) ? $('html') : $('body');
    scrollingNav.find('a').each(function () {
        var $this = $(this);
        scrollingHeadings.push(
            $($this.attr('href'))
        );
        $('<span>' + $this.text() + '</span>').appendTo($this.parent()).hide();
    }).bind('mouseenter', function (e) {
            $(this).parent().find('span').stop()
                .css({display:'block'})
                .animate({right:30, opacity:1}, 450, 'linear');
        })
        .bind('mouseleave',function (e) {
            $(this).parent().find('span').stop()
                .animate({right:15, opacity:0}, 450, 'linear', function () {
                $(this).stop().css({display:'none'});
            });
        }).click(function (e) {
            e.preventDefault();
            var el = $(this).attr('href');
            console.log(el);
            var fadey = $(el + '-fadey');
            if (fadey.length) {
                el = fadey;
            } else {
                el = $(el);
            }
            var top = el.offset().top;
            scrollThis.stop().animate({ 'scrollTop':top }, 500, 'linear');
        });

    var setHPNav = function (id) {
        $('#why-it-works li').removeClass('selected');
        $('a[href="' + id + '"]').parent().addClass('selected');
        $(id).addClass('selected');
    };
    var scriller = function (e) {
        var selected = $(scrollingHeadings[0]);
        $.each(scrollingHeadings, function (i, elem) {
            var top = $(this).position().top;
            selected = $(this);
            if (top >= $window.scrollTop()) {
                return false;
            }
        });
        scrollingNav.find('li').removeClass('selected');
        scrollingNav.find('a[href="#' + selected.attr('id') + '"]').parent().addClass('selected');
    };
    return {
        init:function () {
            if (!scrollingNav) {
                return;
            }
            $(window).scroll(scriller);
            $('#why-it-works .frame-nav a').click(function (e) {
                var $this = $(this);
                var id = $this.attr('href');
                setHPNav(id);
                e.preventDefault();
            });
            $('#f-main .signup-toggle').click(function (e) {
                e.preventDefault();
                $('#welcome-box, #login-box').toggle();
            });
            $('#working-map area').click(function (e) {
                var $this = $(this);
                var id = $this.attr('href');
                setHPNav(id);
                e.preventDefault();
            });
        }
    };
})();
