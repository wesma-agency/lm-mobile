$(document).ready(function() {
   var sliderImageCard = new Swiper('.catalog-product-slider', {
        spaceBetween: 10,
        slidesPerView: 1,
        watchOverflow: true,

        pagination: {
            el: '.catalog-product-slider .swiper-pagination',
            type: 'bullets',
        },
    });
});