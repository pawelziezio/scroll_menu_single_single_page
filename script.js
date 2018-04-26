$(function() {
    $('#sidenav a').click(function (e) {
        e.preventDefault();

        simpleScrollTo($(this).attr('href'), 500);
    });

    $(window).scroll(function() {
        var ds = $(document).scrollTop();

        if (ds == 0) {
            $('#sidenav a').removeClass('active');
            $('#sidenav a[href=#' + $('.anchor').eq(0).attr('id') + ']').addClass('active');

            return false;
        }

        $('.anchor').each(function() {
            var $this = $(this), offset = Math.round($this.offset().top), height = $this.outerHeight() + offset;

            if (offset <= ds && height > ds) {
                $('#sidenav a').removeClass('active');
                $('#sidenav a[href=#' + $this.attr('id') + ']').addClass('active');
                if (document.location.hash != '#' + $this.attr('id')) {
                    document.location.hash = $this.attr('id');
                }

                return false;
            }

            return true;
        });

        return true;
    });

    var ds = $(window).scrollTop();
    if (ds == 0) {
        $('#sidenav a').removeClass('active');
        $('#sidenav a[href=#' + $('.anchor').eq(0).attr('id') + ']').addClass('active');
    } else {
        $('.anchor').each(function() {
            var $this = $(this), offset = Math.round($this.offset().top), height = $this.outerHeight() + offset;

            if (offset <= ds && height > ds) {
                $('#sidenav a').removeClass('active');
                $('#sidenav a[href=#' + $this.attr('id') + ']').addClass('active');

                return false;
            }

            return true;
        });
    }

    if (document.location.hash != '') {
        var el = $(document.location.hash);
        if (el.length > 0) {
            $(window).scrollTop(0);
            $(window).load(function() {
                simpleScrollTo('#' + el.attr('id'), 1000);
            });
        }
    }
});

function simpleScrollTo(element, speed) {
    $('html:not(:animated), body:not(:animated)').animate({scrollTop: $(element).offset().top}, speed, function() {
        document.location.hash = $(element).attr('id');
    });
}