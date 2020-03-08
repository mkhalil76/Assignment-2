$(document).ready(function() {

    var selected_target = "";
    var $window = $(window);

    $.getJSON("json/product_hits.json", function(data) {
        var products_per_page = 5;

        $.each(data['hits'], function(key, val) {
            var start_div = (((key + 1) - 1) % products_per_page == 0);
            if (start_div == true) {
                var html = "<div class='row  products-row'></div>";
                $('#contents').append(html);
            } else {
                var item =
                    "<div class='col-md-6 col-lg-3 item'>" +
                    "<div class='card h-100 product' >" +
                    "<img class='card-img-top' src=" + val.image.dis_base_link + " alt=" + val.image.alt + ">" +
                    "<div class='card-body'>" +
                    "<p class='card-title h-50'>" + val.product_name + "</p>" +
                    "<p class='card-text'>" + val.price + "</p>" +
                    "</div>" +
                    "<button class='shop-button'>Shop Now</button>" +
                    "</div>" +
                    "</div>";
                $('.products-row').last().append(item);
            }
        })
    });
    $(document).mouseup(e => {
        var windowsize = $window.width();

        var menu = $('#nav-bar-menu');

        if (windowsize < 570) {
            if (menu.is(e.target) // if the target of the click isn't the container...
                &&
                menu.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $('#nav-bar-menu a').not('.active').hide();
            }
        }
    });


    $('#nav-bar-menu a').click(function(event) {

        var windowsize = $window.width();
        //check for screen size 
        if (windowsize < 570) {
            // check if click in current active tab to show menue 
            if ($(this).hasClass('active')) {
                selected_target = "";
                $('.nav-bar-menu').addClass('flex-column');
                $('#nav-bar-menu a').css('display', 'block');
                $(this).addClass('active');
            } else {
                selected_target = this.hash;
                $('#nav-bar-menu a').hide();
                $(this).addClass('active');
                $(this).css('display', "block");
            }
        }

    });

    $(document).on('scroll', function(e) {
        if (selected_target != "") {
            $("#nav-bar-menu a.active").css('display', 'block');
            $("#nav-bar-menu a.active").addClass('active');
            $("#nav-bar-menu a").not('.active').hide();
        }
    });

    $('#search-button').click(function() {
        $('.search-box').toggle();
    });

});