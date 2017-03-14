import PageManager from '../page-manager';

export default class Home extends PageManager {}

$('.desktop-slider').slick({
  dots: true,
  autoplay: true,
  autoplaySpeed: 8000,
  mobileFirst: true,
});

$('.mobile-slider').slick({
  dots: true,
  autoplay: true,
  autoplaySpeed: 8000,
  mobileFirst: true,
});

$("body").addClass("home");


