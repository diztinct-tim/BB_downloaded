$(function(){

    // FROM RESPONSIVE-TABLES.JS
    var switched = false;
    var updateTables = function() {
    if (($(window).width() < 767) && !switched ){
      switched = true;
      $("table.responsive").each(function(i, element) {
        splitTable($(element));
      });
      return true;
    }
    else if (switched && ($(window).width() > 767)) {
      switched = false;
      $("table.responsive").each(function(i, element) {
        unsplitTable($(element));
      });
    }
    };

    $(window).load(updateTables);
    $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
    $(window).on("resize", updateTables);


    function splitTable(original)
    {
        original.wrap("<div class='table-wrapper' />");
        
        var copy = original.clone();
        copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
        copy.removeClass("responsive");
        
        original.closest(".table-wrapper").append(copy);
        copy.wrap("<div class='pinned' />");
        original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
    }

    function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
    }

    function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
    }
    // END RESPONSIVE-TABLES.JS





    $(".productView-image").mouseenter(function(){
        $(".productView-image").addClass("zoomHovered");
    }).mouseleave(function(){
        $(".productView-image").removeClass("zoomHovered")
    }); 

    $(".search-wrap").on("click", function(){
        if($("#menu").hasClass("is-open")){
            $("#menu").removeClass("is-open");
            $("body").removeClass("menu-open");
            $("span.mob-menu").removeClass("dl-active");
            $("#menu").data("aria-hidden", "false");
            $(".mobileMenu-toggle").removeClass("is-open");
        }
        $(this).toggleClass("black-outline");
        $(".click-tog-search").toggleClass("open-search");
        $(".mob-tog-search").slideToggle(200);
        $(".mob-tog-search").toggleClass("open");
        $("#search_query_adv").focus();
    });

    $("li.account-menu-toggle > span").on("click", function(){
        $(this).parent("li").find("ul").slideToggle();
        $(this).parent("li").toggleClass("open-menu");
    });

    $(".mob-menu").on("click", function(){
        if( $(".center-wrap.search-wrap").hasClass('black-outline') ){
            $(".center-wrap.search-wrap").removeClass('black-outline');
            $(".click-tog-search").removeClass("open-search");
            $(".mob-tog-search").removeClass("open");
            $(".mob-tog-search").css("display","none");
        }
    });

    // MOBILE STICKY HEADER
    function mobileStickyHeader(){
        if( $(window).width() < 768 ){
            var previousScroll = 0,
            headerOrgOffset = $('.menu-wrap').offset().top + 5;

            $(window).scroll(function() {
                var currentScroll = $(this).scrollTop();
                if(currentScroll > headerOrgOffset) {
                    if (currentScroll > previousScroll) {
                        $('.menu-wrap').removeClass('mob-fix');
                        $('.header-logo').removeClass('bottom-spacer');
                        $('.mob-tog-search').removeClass('fixed-head');
                    } else {
                        // $('#Header > .inner').fadeIn(400);
                        $('.menu-wrap').addClass('mob-fix');
                        $('.header-logo').addClass('bottom-spacer');
                        $('.mob-tog-search').addClass('fixed-head');
                    }
                } else {
                     $('.menu-wrap').removeClass('mob-fix');
                     $('.header-logo').removeClass('bottom-spacer');
                     $('.mob-tog-search').removeClass('fixed-head');
                }
                previousScroll = currentScroll;
            });
        }
    }
    mobileStickyHeader();

    // DESKTOP STICKY HEADER
    function desktopStickyHeader(){
        if( $(window).width() > 767 ){
            var previousScroll = 0,
            headerOrgOffset = $('.header').offset().top - 70;

            $(window).scroll(function() {
                var currentScroll = $(this).scrollTop();
                if(currentScroll > headerOrgOffset) {
                    if (currentScroll > previousScroll) {
                        $('.header').removeClass('desk-fix');
                        $('.banners.cf').removeClass('desk-fix');
                        $('.menu-wrap').removeClass('desk-fix');
                        $('.mob-tog-search').removeClass('fixed-head');
                        $('div.body').removeClass('top-fix-margin');
                    } else {
                        $('.header').addClass('desk-fix');
                        $('.banners.cf').addClass('desk-fix');
                        $('.menu-wrap').addClass('desk-fix');
                        $('.mob-tog-search').addClass('fixed-head');
                        $('div.body').addClass('top-fix-margin');
                    }
                } else {
                        $('.header').removeClass('desk-fix');
                        $('.banners.cf').removeClass('desk-fix');
                        $('.menu-wrap').removeClass('desk-fix');
                        $('.mob-tog-search').removeClass('fixed-head');
                        $('div.body').removeClass('top-fix-margin');
                }
                previousScroll = currentScroll;
            });
        }
    }
    desktopStickyHeader();


    // BREADCRUMB BACK MOBILE
    function changeMobileBreadcrumb(){
        if( $(window).width() < 768 ){
            $(".breadcrumbs > li:nth-last-child(2) > a").text("BACK");
            $(".breadcrumbs > li:nth-last-child(2)").addClass("back-arrow");
        } else {
            $(".breadcrumbs > li:nth-last-child(2)").removeClass("back-arrow");
        }
    }
    changeMobileBreadcrumb();

    function resetStickyHeaders(){
        // REMOVE MOBILE CLASSES
        $('.menu-wrap').removeClass('mob-fix');
        $('.header-logo').removeClass('bottom-spacer');
        $('.mob-tog-search').removeClass('fixed-head');
        // REMOVE DESK CLASSES
        $('.header').removeClass('desk-fix');
        $('.banners.cf').removeClass('desk-fix');
        $('.menu-wrap').removeClass('desk-fix');
        $('.mob-tog-search').removeClass('fixed-head');
        $('div.body').removeClass('top-fix-margin');
    };

    // mobileStickyHeader();
    // desktopStickyHeader();

        // mobileStickyHeader();
        // desktopStickyHeader();
        // changeMobileBreadcrumb();

    $( window ).resize(function() {
        var width = $(window).width();
        console.log(width);
        if( width > 767){
            $(".menu-wrap").removeClass("mob-fix");
            resetStickyHeaders();
            changeMobileBreadcrumb();
        }
    });


})

export default class PageManager {
    before(next) {
        next();

        function addPageClass(){
            var catName = $('.page-heading').text();
            var catName = catName.replace(/ /g, '');         
            var catName = catName.replace(/'/g, '');
            var catName = catName.replace(/&/g, '');
            var catName = $.trim(catName);
            if( catName == "404Error-Pagenotfound" ){
                $('body').addClass('page-not-found');
            } else {
                $('body').addClass(''+catName+'');
            }
        }
        addPageClass();

        // CHANGE TO RED CART WHEN ITEM ADDED OR BACK TO BLACK IF COUNT IS 0
        function changeMobileCartImg(){
            if( $(window).width() < 768 && $(".mob-cart-num").text() !== "0" ){
                $("div.cart-num > img").attr("src", "https://cdn3.bigcommerce.com/s-pxmpwj/product_images/uploaded_images/mob-red-cart-03.jpg");
            }
        }
        changeMobileCartImg();
        $(".mob-cart-num").on("change", changeMobileCartImg() );

        // make first thumbnail active
        function makeThumbnailActive(){
            $("ul.productView-thumbnails > li.productView-thumbnail:first-child > a").addClass("is-active");
        }
        makeThumbnailActive();

        // add classes to cat page
        function addCategoryPageClass(){
            if( $(".page").hasClass('category-page') ){
                $("body").addClass("CategoryPage");
            }
        }
        addCategoryPageClass();

        // add class to searchpage
        function addSearchPageClass(){
            if( $(".page").hasClass('search-page') ){
                $("body").addClass("SearchPage");
            }
        }
        addSearchPageClass();

        var pageName = window.location.href;
        if( pageName == "http://beautybridge.mybigcommerce.com/brands/" || pageName == "http://localhost:3000/brands/" || pageName == "http://www.beautybridge.com/brands/"){
            $(".body").addClass("brands-list");
            $(".sub-cat-list > .navList").addClass("brandGrid");
            addListHeaders();
        }

        // function addListHeaders(){
        //     var list = { letters: [] };
        //     $(".brandGrid.brand-page-only").children("li").each(function(){
        //         var itmLetter = $(this).text().substring(0,1).toUpperCase();
        //         // var itmLetter = $(this).next("a").text().substring(0,1).toUpperCase();
        //         if (!(itmLetter in list)) {
        //             list[itmLetter] = [];
        //             list.letters.push(itmLetter);
        //         }
        //         list[itmLetter].push($(this));
        //     });
        //     list.letters.sort();
        //     $(".brandGrid.brand-page-only").empty();
        //     $.each(list.letters, function(i, letter){
        //         list[letter].sort(function(a, b) {
        //             return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        //         });
        //         var ul = $("<ul/>");
        //         $.each(list[letter], function(idx, itm){
        //             ul.append(itm);
        //         });
        //         $(".brandGrid.brand-page-only").append($("<li class='cf'></li>").append($("<a/>").attr("name", letter.toLowerCase()).addClass("listHeader").html(letter)).append(ul));
        //     });
        // }

        if ($(window).width() < 768 ) {
            $("#search_query_adv").attr("placeholder","Search");
        }
        else {
            $("#search_query_adv").attr("placeholder","What are you looking for?");
        }

    }

    loaded(next) {
        next();

        $(".FrequentlyAskedQuestions .main-info-container ul > li").on("click", function(){
            $(this).toggleClass("open");
        })

    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }
}
