import { hooks } from 'bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';


$(function(){

    function checkIfHideCartListPage(){
        $(".card-body").each(function(){
            if($(this).find("li.custom-field.nocart > span.productView-info-value.yes").length){
                $(this).parent().find(".card-figcaption").addClass("no-atc");
            }
        });
    }
    checkIfHideCartListPage();

    function checkIfItHasThinCatBanner(){
        if( $('.thin-cat-banner').length ){
            $('.breadcrumbs > li.breadcrumb.is-active').addClass('thin-banner-present');
            $('.breadcrumbs').addClass('thin-banner-present');
            $('.breadcrumbs li a').addClass('thin-banner-present');
            $('h1.page-heading').addClass('thin-banner-present');
            $('.page.category-page').addClass('thin-banner-present');
            var leftPx = $(".breadcrumbs.thin-banner-present").width();
            $("h1.page-heading.thin-banner-present").css("left", leftPx + 30 );
            if( $(window).width() < 768 ){
                $(".thin-cat-banner").detach().prependTo("#faceted-search-container");
            }
        }
    }
    checkIfItHasThinCatBanner();

    function moveSeoText(){
        $(".category-description").detach().appendTo(".seo-txt");
    }
    moveSeoText();

    function moveCatImage(){
        var url = window.location.href;
        if($(window).width() >= 767){
            if( $(".admin-input-area.cat-has-img > .cat-img").length && url.toLowerCase().indexOf("/brands/") >= 0 ){
                $(".admin-input-area.cat-has-img > .cat-img").detach().prependTo("h1.page-heading");
                $("h1.page-heading").css("margin-top","10px");
                $("h1.page-heading").css("text-indent","-130px");
                $(".page.category-page").css("clear","both");
            } else {
                $(".admin-input-area.cat-has-img > .cat-img").detach().prependTo(".category-description");
                $(".cat-img").css("margin-right", "20px");
                $(".cat-img").css("margin-bottom", "20px");
            }
        }
    }
    moveCatImage();


    function addListHeaders(){
        var list = { letters: [] };
        $(".brandGrid.brand-page-only").children("li").each(function(){
            var itmLetter = $(this).text().substring(0,1).toUpperCase();
            // var itmLetter = $(this).next("a").text().substring(0,1).toUpperCase();
            if (!(itmLetter in list)) {
                list[itmLetter] = [];
                list.letters.push(itmLetter);
            }
            list[itmLetter].push($(this));
        });
        list.letters.sort();
        $(".brandGrid.brand-page-only").empty();
        $.each(list.letters, function(i, letter){
            list[letter].sort(function(a, b) {
                return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            });
            var ul = $("<ul/>");
            $.each(list[letter], function(idx, itm){
                ul.append(itm);
            });
            $(".brandGrid.brand-page-only").append($("<li class='cf'></li>").append($("<a/>").attr("name", letter.toLowerCase()).addClass("listHeader").html(letter)).append(ul));
        });
    }

    // IF ITS BRANDS CATEGORY, CHANGE THE VIEW
    var url = window.location.href;
    if ( url == "http://localhost:3000/brands/" || url == "https://www.beautybridge.com/brands/" || url == "www.beautybridge.com/brands/" ){
        console.log("it's equal to just brands");
        $('body').addClass('list-brands');
        $('.page.category-page').prepend("<img class='brand-thin-banner' src='https://cdn3.bigcommerce.com/s-pxmpwj/product_images/uploaded_images/brands-desktop.jpg'>");
        addListHeaders();
    }

    if( $(window).width() < 768 && $(".seo-txt > .category-description").height() > 250 ){
        $(".seo-txt > .category-description").addClass("hide-rest");
        $(".seo-txt").append("<span class='view-more'>View More</span>");
    }

    $("span.view-more").on("click", function(){
        $(this).fadeOut();
        $(".seo-txt > .category-description").removeClass("hide-rest");
    }); 

    function mobilefyPagination(pageLength, currentPage){
        if(pageLength > 2){
            console.log("inside function");
            console.log('currentPage = ' + currentPage);
            console.log("pagination length = " + pageLength);
            $("li.pagination-item").each(function(idx){
                $(this).removeClass("hide-me");
                console.log("data = " + $(this).data("pageNum"));
                if($(this).data("pageNum") > currentPage + 1 || $(this).data("pageNum") < currentPage - 1){
                    $(this).addClass("hide-me");
                }
            })
        }
    }

    if( $("div.page").hasClass("category-page") ){
        var pageLength = $(".bottom-pagination ul li").length;
        console.log("dat PL = " + pageLength);
        if(pageLength > 0){
            console.log("pageLength > 0");
            var currentPage = $(".pagination-item.pagination-item--current").data().pageNum;
            mobilefyPagination(pageLength, currentPage);
        }
        if(pageLength > 0){
            var currentPage = $(".pagination-item.pagination-item--current").data("pageNum");
            var lastPage = $(".pagination-item:last-child").data("pageNum");
            if( currentPage == '1'){
                $(".pagination-item.pagination-item--next").addClass("center-me");
            } else if (currentPage == lastPage){
                $(".pagination-item.pagination-item--previous").addClass("center-me");
            }
        }

    }
    
    
})




export default class Category extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

        });
    }
}
