/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1) {
                history.replaceState('', document.title, window.location.pathname);
            }
        });

        $("body").addClass("ProductPage"); 

        function percentOff(){
            var sale = $(".productView .price.price--withoutTax").text().replace("$","");
            var retail = $(".productView .price.retail").text().replace("$","").trim();

            if( retail !== "" ){
              var percentRaw = (retail - sale) / retail * 100;
              var percentOff = Math.round(percentRaw);
              if( percentOff >= 10 ){
                $(".productView-details span.percent-off").text('Save '+ percentOff + '%');
              } else {
                $(".productView-details .productView .price.retail").hide();
                $(".productView-details span.percent-off").hide()
              }
            }

        }
        percentOff();

        function isHideCart(){
          if( $("span.NoCart > li.productView-info-value.Yes").length ){
            $(".call-to-order").addClass("active");
            $(".productView-options").hide();
            console.log("Product cannot be purchased.")
          } else if($("span.nocart > li.productView-info-value.yes").length){
            $(".call-to-order").addClass("active");
            $(".productView-options").hide();
            console.log("Product cannot be purchased.")
          }
        }
        isHideCart();

        function isFreeShip(){
          var price = $(".productView-product .price.price--withoutTax").text().replace("$","").split(".")[0];
          if( price > "49" ){
            $(".free-shipping-over").text("THIS ITEM SHIPS FREE!");
          }
        };
        isFreeShip();
      
        // $(".productView-title.ProductPageHeading").text().split("- ")[1];
        
        if( $(".productView-thumbnails > li").length > 3 ){
            makeSlideThumbnails();
        };


        function makeSlideThumbnails(){

            $('.productView-thumbnails').addClass("thumb-slider");

            $('.productView-thumbnails').slick({
              dots: false,
              infinite: false,
              // speed: 300,
              slidesToShow: 6,
              slidesToScroll: 6,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                  }
                }
              ]
            });

        }

        $(".product-details-accordion > ul > li > h3").on("click", function(){
          $(this).parent("li").toggleClass('open-accordion');
        })

        if( $(window).width() < 900 ){
          $(".product-details-accordion > ul > li:first-child").removeClass("open-accordion");
        }

        $('.related-products > ul.productGrid').slick({
            dots: true,
            infinite: false,
            // speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: false,
                  dots: false
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  infinite: false,
                  dots: false
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: false,
                  dots: false
                }
              }
            ]
          });

        function createHowToUseTab(){
          if( $("span.product-accordion-content .directions").text().length > 0 ){
            $("span.product-accordion-content .directions").detach().appendTo("li.how-to-use > span");
          } else {
            $("li.how-to-use").hide();
          }
        }
        createHowToUseTab();

        function createIngredientsTab(){
          if( $("span.product-accordion-content .ingredients").text().length > 0 ){
            $("span.product-accordion-content .ingredients").detach().appendTo("li.ingredients > span");
          } else {
            $("li.ingredients").hide();
          }
        }
        createIngredientsTab();

        // function formatProductTitle(){
        //   var title = $(".productView-title.ProductPageHeading").text().split(" - ")[1];
        //   $(".productView-title.ProductPageHeading").html(title);
        // }
        // formatProductTitle();

        function formatProductTitle(){
          var title = $(".at-a-glance .product.title > .productView-info-value").text();
          $(".productView-product .productView-title.ProductPageHeading").html(title);
          console.log(title);
        }
        formatProductTitle();

        function hijackBrandsLink(){
          var brandName = $(".productView-brand > a > span").text().replace(/ /g,"-").replace("+","-").toLowerCase();
          var formattedBrandName = '/brands/' + brandName + '/';
          $(".productView-brand > a").attr("href", formattedBrandName);
        }
        hijackBrandsLink();

        $(".productView-info-name.product-type").text("Product Type:");

        function formatCustomFields(){
          $("span.product-type").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.concern").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.spf").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.gender").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.hair-type").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.gift-idea").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.skin-type").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.collection").each(function(index){
            $(this).addClass("type-" + index);
          })
          $("span.preferences").each(function(index){
            $(this).addClass("type-" + index);
          })
        }
        formatCustomFields();

        $(".mega-menu").mouseover(function(){
          $(".zoomImg").addClass("hide-me");
        }).mouseout(function(){
          $(".zoomImg").removeClass("hide-me");
        })


        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}
