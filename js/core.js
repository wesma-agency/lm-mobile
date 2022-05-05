$(document).ready(function () {

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $(document).on('click', 'a[href="#"]', function (event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //tab
    $('.tabs').delegate('li:not(.active)', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250, function () {

            //update
            if (!state3DGallery && $(this).find('.product-three-d-block').length) {
                init3DGallery();
                state3DGallery = true;
            }

        });
        var thisIndex = $(this).index();
        if ($('.box:visible').find('.products-list').length) {
            productsList[thisIndex].update();
        }
        if ($('.box:visible').find('.similar-products-list').length) {
            similarProducts[thisIndex].update();
        }
        if ($('.box:visible').find('.product-delivery-specs').length) {
            productDeliverySpecs.update();
        }
        if ($('.box:visible').find('.product-advantages').length) {
            productAdvantages.update();
        }
        if ($('.box:visible').find('.cabinet-goods-item-wrapper').length) {
            cabinetGoods.forEach(element => {
                element.update();
            });
        }
    });

    //------------------------------------------------------------------------//

    //footer menu
    $(document).on('click', '.footer-menu-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.footer-menu').toggleClass('active').find('.footer-menu-block').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //navigation
    $(document).on('click', '.navigation-toggle', function (event) {
        event.preventDefault();
        $('html').addClass('navigation-show');
    });

    $(document).on('click', '.navigation-close, .navigation-mask, .navigation-city-link', function (event) {
        event.preventDefault();
        $('.navigation-panel').each(function (index, el) {
            $(el).removeClass('show');
        });
        $('html').removeClass('navigation-show');
    });

    //------------------------------------------------------------------------//

    //navigation panel
    $(document).on('click', '.navigation-menu-toggle', function (event) {
        event.preventDefault();
        var thisId = $(this).attr('href');
        thisId = thisId.substr(1);
        $('[data-panel="' + thisId + '"]').addClass('show');
    });

    $(document).on('click', '.navigation-panel-back', function (event) {
        event.preventDefault();
        $(this).parents('.navigation-panel').removeClass('show');
    });

    //------------------------------------------------------------------------//

    //navigation panel toggle
    $(document).on('click', '.navigation-panel-toggle', function (event) {
        event.preventDefault();
        $(this).parent('li').toggleClass('open').find('.navigation-panel-list-inner').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //city panel
    $(document).on('click', '.navigation-city-link', function (event) {
        event.preventDefault();
        $('html').addClass('city-panel-show');
    });

    $(document).on('click', '.city-panel-close, .city-panel-mask', function (event) {
        event.preventDefault();
        $('html').removeClass('city-panel-show');
    });

    //------------------------------------------------------------------------//

    //city panel clear
    $(document).on('click', '.city-panel-input-clear', function (event) {
        event.preventDefault();
        $(this).hide();
        $(this).parents('.city-panel-input').find('.input-text').val('').focus();
    });

    //------------------------------------------------------------------------//

    //city panel select
    $(document).on('click', '.city-panel-select a', function (event) {
        event.preventDefault();
        $(this).parents('.city-panel-select').find('li').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.city-panel-input').find('.input-text').val($(this).text());
        $('.city-panel-input-clear').show();
    });

    //------------------------------------------------------------------------//

    //city panel input
    $(document).on('change keydown keypress keyup', '.city-panel-input .input-text', function (event) {
        var thisValue = $(this).val();
        if (thisValue.length) {
            $('.city-panel-input-clear').show();
        } else {
            $('.city-panel-input-clear').hide();
        }
    });

    //------------------------------------------------------------------------//

    //products list
    var productsList,
        productsListLength = $('.products-list').length;
    if (productsListLength) {
        productsList = new Swiper('.products-list', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //favorite
    $(document).on('click', '.catalog-product-favorite, .product-favorite, .modal-favorite-product-toggle', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //filter
    $(document).on('click', '.catalog-nav-filter', function (event) {
        event.preventDefault();
        $('html').addClass('filter-show');
    });

    $(document).on('click', '.filter-close, .filter-mask', function (event) {
        event.preventDefault();
        $('.filter-panel').each(function (index, el) {
            $(el).removeClass('show');
        });
        $('html').removeClass('filter-show');
    });

    //------------------------------------------------------------------------//

    //filter panel
    $(document).on('click', '.filter-panel-toggle', function (event) {
        event.preventDefault();
        var thisId = $(this).attr('href');
        thisId = thisId.substr(1);
        $('[data-filter="' + thisId + '"]').addClass('show');

        if ($('[data-filter="' + thisId + '"]').find('.filter-range-slider').length) {
            $('.filter-range-slider').each(function (index, el) {
                $(el).nstSlider('refresh');
            });
        }
    });

    $(document).on('click', '.filter-panel-back', function (event) {
        event.preventDefault();
        $(this).parents('.filter-panel').removeClass('show');
    });

    //------------------------------------------------------------------------//

    //filter toggle active
    $(document).on('click', '.filter-category-link, .filter-delivery-link', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //filter range
    if ($('.filter-range-slider').length) {
        $('.filter-range-slider').nstSlider({
            "rounding": {
                "10": "1"
            },
            "crossable_handles": false,
            "left_grip_selector": ".filter-range-handle-min",
            "right_grip_selector": ".filter-range-handle-max",
            "value_bar_selector": ".filter-range-bar",
            "value_changed_callback": function (cause, leftValue, rightValue) {
                $(this).parent().find('.filter-range-input-min').val(accounting.formatNumber(leftValue, 0, " "));
                $(this).parent().find('.filter-range-input-max').val(accounting.formatNumber(rightValue, 0, " "));
            }
        });
    }

    //------------------------------------------------------------------------//

    //product gallery
    var productGallery,
        productGalleryLength = $('.product-gallery').length;
    if (productGalleryLength) {
        productGallery = new Swiper('.product-gallery', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //countdown
    if ($('.countdown').length) {
        $('.countdown').downCount({
            date: '11/16/2020 12:00:00',
            offset: +3
        }, function () {
            //callback
        });
    }

    //------------------------------------------------------------------------//

    //drop
    activePop = null;
    dropClass = $('.drop-wrap');
    function closeInactivePop() {
        dropClass.each(function (index) {
            if ($(this).hasClass('drop-opened') && index != activePop) {
                $(this).removeClass('drop-opened');
            }
        });
        return false;
    }
    $(document).on('mouseover', '.drop-wrap', function () {
        activePop = dropClass.index(this);
    });
    $(document).on('mouseout', '.drop-wrap', function () {
        activePop = null;
    });
    $(document.body).on('click', function (event) {
        closeInactivePop();
    });
    $(document).on('click', '.drop-toggle', function (event) {
        event.preventDefault();
        $(this).parent(dropClass).toggleClass('drop-opened');
    });

    //------------------------------------------------------------------------//

    //product select
    $(document).on('click', '.product-select-link', function (event) {
        event.preventDefault();
        var thisElement = $(this),
            thisElementHtml = thisElement.html(),
            thisParent = thisElement.parents('.product-select-block');
        thisElement.addClass('active').siblings().removeClass('active');
        thisParent.find('.product-select-toggle').html(thisElementHtml);
        activePop = null;
        closeInactivePop();
    });

    //------------------------------------------------------------------------//

    //popover
    if ($('.popover-target').length) {
        $('.popover-target').popover({
            trigger: 'hover',
            html: true
        });
    }

    //------------------------------------------------------------------------//

    //product specs
    $(document).on('click', '.product-specs-more-button', function (event) {
        event.preventDefault();
        $(this).parent('.product-specs-more').addClass('hidden');
        $(this).parents('.product-specs').find('.product-specs-list tr').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //product features
    var productFeatures,
        productFeaturesLength = $('.product-features-list').length;
    if (productFeaturesLength) {
        productFeatures = new Swiper('.product-features-list', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 2,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
        });
    }

    //------------------------------------------------------------------------//

    //similar products
    var similarProducts,
        similarProductsLength = $('.similar-products-list').length;
    if (similarProductsLength) {
        similarProducts = new Swiper('.similar-products-list', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
            breakpoints: {
                420: {
                    spaceBetween: 10,
                }
            }
        });
    }

    //------------------------------------------------------------------------//

    //recently viewed
    var recentlyViewed,
        recentlyViewedLength = $('.recently-viewed-products').length;
    if (recentlyViewedLength) {
        recentlyViewed = new Swiper('.recently-viewed-products', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
            breakpoints: {
                420: {
                    spaceBetween: 10,
                }
            }
        });
    }

    //------------------------------------------------------------------------//

    //product reviews
    $(document).on('click', '.product-reviews-more-button', function (event) {
        event.preventDefault();
        $(this).parent('.product-reviews-more').addClass('hidden');
        $(this).parents('.product-reviews').find('.product-review').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //fancybox
    if ($('[data-fancybox]').length) {
        $('[data-fancybox]').fancybox({
            gutter: 0,
            loop: true,
            arrows: false,
            infobar: false,
            smallBtn: true,
            wheel: false,
            animationEffect: "fade"
        });
    }

    //------------------------------------------------------------------------//

    //modal
    if ($('[data-fancymodal]').length) {
        $('[data-fancymodal]').fancybox({
            gutter: 0,
            arrows: false,
            infobar: false,
            smallBtn: true,
            wheel: false,
            keyboard: false,
            animationEffect: "fade",
            touch: false,
            afterShow: function () {
                var modalCertificate,
                    modalCertificateLength = $('.modal-certificate').length;
                if (modalCertificateLength) {
                    modalCertificate = new Swiper('.modal-certificate', {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        speed: 500,
                        watchOverflow: true,
                    });
                }
                var modalFavorite,
                    modalFavoriteLength = $('.modal-favorite').length;
                if (modalFavoriteLength) {
                    modalFavorite = new Swiper('.modal-favorite', {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        speed: 500,
                        spaceBetween: 8,
                        slidesPerView: 'auto',
                        watchOverflow: true,
                        centerInsufficientSlides: true,
                    });
                }
                if ($('.phone-mask').length) {
                    $('.phone-mask').mask('+7 (999) 999-99-99');
                }
            }
        });
    }

    //------------------------------------------------------------------------//

    //product discount
    var productDiscount,
        productDiscountLength = $('.product-discount-list').length;
    if (productDiscountLength) {
        productDiscount = new Swiper('.product-discount-list', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            spaceBetween: 10,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
        });
    }

    //------------------------------------------------------------------------//

    //product set
    $(document).on('keypress', '.product-set-number-text', function (event) {
        event = event || window.event;
        if (event.charCode && event.charCode != 0 && event.charCode != 46 && (event.charCode < 48 || event.charCode > 57)) return false;
    });

    $(document).on('change', '.product-set-number-text', function (event) {
        var thisParent = $(this).parents('.product-set-item');
        var quantityValue = $(this).val();
        if (quantityValue == 0) {
            thisParent.find('.product-set-checkbox input').prop('checked', false);
        } else {
            thisParent.find('.product-set-checkbox input').prop('checked', true);
        }
    });

    $(document).on('click', '.product-set-number-minus', function (event) {
        event.preventDefault();
        var thisParent = $(this).parents('.product-set-item');
        var quantityInput = $(this).parent('.product-set-number').find('.product-set-number-text');
        var quantityValue = quantityInput.val();
        quantityValue = --quantityValue;
        if (quantityValue < 0) { quantityValue = 0; }
        quantityInput.val(quantityValue);
        if (quantityValue == 0) {
            thisParent.find('.product-set-checkbox input').prop('checked', false);
        }
    });

    $(document).on('click', '.product-set-number-plus', function (event) {
        event.preventDefault();
        var thisParent = $(this).parents('.product-set-item');
        var quantityInput = $(this).parent('.product-set-number').find('.product-set-number-text');
        var quantityValue = quantityInput.val();
        quantityInput.val(++quantityValue);
        thisParent.find('.product-set-checkbox input').prop('checked', true);
    });

    $(document).on('change', '.product-set-checkbox input', function (event) {
        var thisParent = $(this).parents('.product-set-item');
        if ($(this).is(':checked')) {
            thisParent.find('.product-set-number-text').val('1');
        } else {
            thisParent.find('.product-set-number-text').val('0');
        }
    });

    //------------------------------------------------------------------------//

    //product set
    var productSet,
        productSetLength = $('.product-set-slider').length;
    if (productSetLength) {
        productSet = new Swiper('.product-set-slider', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
            centerInsufficientSlides: true,
        });
    }

    //------------------------------------------------------------------------//

    //product customer photo
    var productCustomerPhoto,
        productCustomerPhotoLength = $('.product-customer-photo').length;
    if (productCustomerPhotoLength) {
        productCustomerPhoto = new Swiper('.product-customer-photo', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //phone mask
    if ($('.phone-mask').length) {
        $('.phone-mask').mask('+7 (999) 999-99-99');
    }

    //------------------------------------------------------------------------//

    //cart product
    var cartProduct,
        cartProductLength = $('.cart-product-wrapper').length;
    if (cartProductLength) {
        cartProduct = new Swiper('.cart-product-wrapper', {
            speed: 500,
            slidesPerView: 'auto',
        });
    }

    //------------------------------------------------------------------------//

    //cart product delete
    $(document).on('click', '.cart-product-delete', function (event) {
        event.preventDefault();
        $(this).parents('.cart-product-wrapper').remove();
    });

    //------------------------------------------------------------------------//

    //cart product number
    $(document).on('keypress', '.cart-product-number-text', function (event) {
        event = event || window.event;
        if (event.charCode && event.charCode != 0 && event.charCode != 46 && (event.charCode < 48 || event.charCode > 57)) return false;
    });

    $(document).on('click', '.cart-product-number-minus', function (event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.cart-product-number').find('.cart-product-number-text');
        var quantityValue = quantityInput.val();
        quantityValue = --quantityValue;
        if (quantityValue < 0) { quantityValue = 0; }
        quantityInput.val(quantityValue);
    });

    $(document).on('click', '.cart-product-number-plus', function (event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.cart-product-number').find('.cart-product-number-text');
        var quantityValue = quantityInput.val();
        quantityInput.val(++quantityValue);
    });

    //------------------------------------------------------------------------//

    //cart delivery
    $(document).on('click', '.cart-button-delivery', function (event) {
        event.preventDefault();
        $(this).addClass('hidden').parents('.cart').find('.cart-delivery, .cart-terms').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //cart map
    $(document).on('click', '.cart-map-show', function (event) {
        event.preventDefault();
        $(this).addClass('hidden').parents('.cart-map-block').find('.cart-map-wrapper').removeClass('hidden');
    });

    $(document).on('click', '.cart-map-hide', function (event) {
        event.preventDefault();
        $(this).parents('.cart-map-wrapper').addClass('hidden').parents('.cart-map-block').find('.cart-map-show').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //datepicker
    if ($('.datepicker').length) {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: 'Предыдущий',
            nextText: 'Следующий',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн',
                'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd M yy г.',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ' г.'
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);

        $('.datepicker').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            minDate: 0
        });
    }

    //------------------------------------------------------------------------//

    //section menu
    $(document).on('click', '.section-menu-link', function (event) {
        event.preventDefault();
        $('html').addClass('section-menu-show');
    });

    $(document).on('click', '.section-menu-back, .section-menu-close, .section-menu-mask', function (event) {
        event.preventDefault();
        $('html').removeClass('section-menu-show');
    });

    //------------------------------------------------------------------------//

    //section menu category
    $(document).on('click', '.section-menu-category-toggle', function (event) {
        event.preventDefault();
        $(this).parent('li').toggleClass('open');
    });

    //------------------------------------------------------------------------//

    //section menu type
    $(document).on('click', '.section-menu-type-link, .section-menu-country-link', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //product 3d
    var state3DGallery = false;
    var threeDRangeSlider = $('.product-three-d-range');
    var threeDRangeInit = false;
    var totalFrames = 51;
    var api;

    // if ($('.product-three-d-block').length && $('.product-three-d').is(':visible') && !state3DGallery) {
    //     state3DGallery = true;
    //     init3DGallery();
    // }

    function init3DGallery() {

        var frames = SpriteSpin.sourceArray('../upload/3d/{frame}.jpg', { frame: [1, totalFrames], digits: 1 });
        var dataSlider = $('.product-three-d-block');

        dataSlider.spritespin({
            source: frames,
            width: 320,
            height: 265,
            sense: 1,
            responsive: true,
            animate: false,
            frame: totalFrames / 2,
            plugins: [
                //'progress',
                '360',
                //'drag'
            ],
            onFrame: function (e, data) {
                // if (threeDRangeSlider.length) {
                //     threeDRangeSlider.nstSlider("set_position", 0, data.frame);
                // }
            },
            onLoad: function () {
                api = dataSlider.spritespin("api");

                if (threeDRangeSlider.length && !threeDRangeInit) {
                    threeDRangeInit = true;
                    threeDRangeSlider.nstSlider({
                        "crossable_handles": false,
                        "left_grip_selector": ".product-three-d-range-handle-min",
                        "right_grip_selector": ".product-three-d-range-handle-max",
                        "value_bar_selector": ".product-three-d-range-bar",
                        "value_changed_callback": function (cause, minValue, maxValue, prevMinValue, prevMaxValue) {
                            api.updateFrame(maxValue);
                            //if (cause == 'drag_move') {
                            $('.product-three-d-play').removeClass('active');
                            api.stopAnimation();
                            //}
                        }
                    });
                    threeDRangeSlider.nstSlider("set_range", 0, totalFrames - 1);
                    threeDRangeSlider.nstSlider("set_position", 0, parseInt((totalFrames - 1) / 2));

                    $(window).resize(function () {
                        threeDRangeSlider.nstSlider("refresh");
                    });
                }

            }
        });

        $(document).on('click', '.product-three-d-play', function (event) {
            event.preventDefault();
            $(this).toggleClass('active');
            api.toggleAnimation();
        });
    }

    //------------------------------------------------------------------------//

    //product delivery specs
    var productDeliverySpecs,
        productDeliverySpecsLength = $('.product-delivery-specs').length;
    if (productDeliverySpecsLength) {
        productDeliverySpecs = new Swiper('.product-delivery-specs', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //product delivery filials
    $(document).on('click', '.product-delivery-filials-caption', function (event) {
        event.preventDefault();
        $(this).parents('.product-delivery-filials-item').find('.product-delivery-filials-info').slideToggle(150);
    });

    $(document).on('click', '.product-delivery-filials-more-button', function (event) {
        event.preventDefault();
        $(this).parent('.product-delivery-filials-more').addClass('hidden');
        $(this).parents('.product-delivery-filials-list').find('.product-delivery-filials-item').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //tab inner
    $('.tabs-inner').delegate('li:not(.active)', 'click', function () { $(this).addClass('active').siblings().removeClass('active').parents('.tab-inner').find('.box-inner').hide().eq($(this).index()).fadeIn(250); });

    //------------------------------------------------------------------------//

    //delivery features
    var deliveryFeatures,
        deliveryFeaturesLength = $('.delivery-features').length;
    if (deliveryFeaturesLength) {
        deliveryFeatures = new Swiper('.delivery-features', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //delivery type
    $(document).on('click', '.delivery-type-caption', function (event) {
        event.preventDefault();
        $(this).parents('.delivery-type').toggleClass('active').find('.delivery-type-block').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //profile panel
    $(document).on('click', '.header-profile-link', function (event) {
        event.preventDefault();
        $('html').addClass('profile-panel-show');
    });

    $(document).on('click', '.profile-panel-close, .profile-panel-mask', function (event) {
        event.preventDefault();
        $('html').removeClass('profile-panel-show');
    });

    //------------------------------------------------------------------------//

    $(document).on('keyup', '.profile-panel-code-col .input-text', function (event) {

        var _key = (window.Event) ? event.which : event.keyCode;

        var thisElement = $(this);
        if (thisElement.val() != '') {
            thisElement.addClass('input-text-value');
        } else {
            thisElement.removeClass('input-text-value');
        }

        var thisParent = $(this).parents('.profile-panel-code-col');
        var thisParentNext = thisParent.next('.profile-panel-code-col');
        var thisParentPrev = thisParent.prev('.profile-panel-code-col');


        if (_key == 8) {
            thisParentPrev.find('.input-text').focus();
        } else {
            if (thisParentNext.length) {
                thisParentNext.find('.input-text').focus();
            }
        }

    });

    var countInterval;
    function profileCodeCount() {
        var counter = 40;
        countInterval = setInterval(function () {
            $('.profile-panel-code-note-sec').text(counter);
            counter--;
            if (counter == -1) {
                clearInterval(countInterval);
            }
        }, 1000);
    }

    //------------------------------------------------------------------------//

    //profile login steps

    $(document).on('click', '.profile-panel-login-email-link', function (event) {
        event.preventDefault();
        $('.profile-panel-login-email').removeClass('hidden');
        $('.profile-panel-login-phone').addClass('hidden');
    });

    $(document).on('click', '.profile-panel-login-phone-link', function (event) {
        event.preventDefault();
        $('.profile-panel-login-email').addClass('hidden');
        $('.profile-panel-login-phone').removeClass('hidden');
    });

    $(document).on('click', '.profile-panel-code-link', function (event) {
        event.preventDefault();
        $('.profile-panel-tab').addClass('hidden');
        $('.profile-panel-code').removeClass('hidden');
        profileCodeCount();
    });

    $(document).on('click', '.profile-panel-code-change-phone', function (event) {
        event.preventDefault();
        $('.profile-panel-tab').removeClass('hidden');
        $('.profile-panel-code').addClass('hidden');
        clearInterval(countInterval);
    });

    $(document).on('click', '.profile-panel-forgot-password', function (event) {
        event.preventDefault();
        $('.profile-panel-tab').addClass('hidden');
        $('.profile-panel-recover-step-1').removeClass('hidden');
        $('.profile-panel-title-text').text('Восстановление пароля');
    });

    $(document).on('click', '.profile-panel-recover-back', function (event) {
        event.preventDefault();
        $('.profile-panel-tab').removeClass('hidden');
        $('.profile-panel-recover-step').addClass('hidden');
        $('.profile-panel-title-text').text('Личный кабинет');
    });

    $(document).on('click', '.profile-panel-recover-go-step-2', function (event) {
        event.preventDefault();
        $('.profile-panel-recover-step-1').addClass('hidden');
        $('.profile-panel-recover-step-2').removeClass('hidden');

        setTimeout(function () {
            $('.profile-panel-recover-step-2').addClass('hidden');
            $('.profile-panel-recover-step-3').removeClass('hidden');
        }, 3000);
    });

    $(document).on('click', '.profile-panel-recover-go-step-4', function (event) {
        event.preventDefault();
        $('.profile-panel-recover-step-3').addClass('hidden');
        $('.profile-panel-recover-step-4').removeClass('hidden');
    });

    //------------------------------------------------------------------------//

    //error example
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $(document).on('focusout', '#profile-panel-register-email', function () {
        var emailValid = validateEmail($(this).val());
        if (emailValid) {
            $(this).parents('.input-wrapper').removeClass('error');
            $('.profile-panel-error').addClass('hidden');
        } else {
            $(this).parents('.input-wrapper').addClass('error');
            $('.profile-panel-error').removeClass('hidden');
        }
    });

    //------------------------------------------------------------------------//

    //to top
    $(document).on('click', '.to-top', function (event) {
        event.preventDefault();
        $('body, html').animate({ scrollTop: 0 }, 600);
    });

    $(window).scroll(function (event) {
        fromTop();
    });
    function fromTop() {
        if ($(window).scrollTop() > 100) {
            $('body').addClass('from-top');
        } else {
            $('body').removeClass('from-top');
        }
    }

    //------------------------------------------------------------------------//

    //search form
    $(document).on('click', '.search-form-delete', function (event) {
        event.preventDefault();
        $(this).parents('.search-form').find('.search-form-text').val('');
    });

    //------------------------------------------------------------------------//

    //cabinet navigation
    var cabinetNavigation,
        cabinetNavigationLength = $('.cabinet-navigation').length;
    if (cabinetNavigationLength) {
        cabinetNavigation = new Swiper('.cabinet-navigation', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            watchOverflow: true,
            slidesPerView: 'auto',
            initialSlide: 0,
        });
    }

    //------------------------------------------------------------------------//

    //cabinet goods item
    var cabinetGoods,
        cabinetGoodsLength = $('.cabinet-goods-item-wrapper').length;
    if (cabinetGoodsLength) {
        cabinetGoods = new Swiper('.cabinet-goods-item-wrapper', {
            speed: 500,
            slidesPerView: 'auto',
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
        });
    }

    //------------------------------------------------------------------------//

    //cabinet goods item delete
    $(document).on('click', '.cabinet-goods-item-delete', function (event) {
        event.preventDefault();
        $(this).parents('.cabinet-goods-item-wrapper').remove();
    });

    //------------------------------------------------------------------------//

    //cabinet complaints item
    $(document).on('click', '.cabinet-complaints-item-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.cabinet-complaints-item').toggleClass('active').find('.cabinet-complaints-item-block').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //create complaint panel
    $(document).on('click', '.cabinet-complaints-create', function (event) {
        event.preventDefault();
        $('html').addClass('create-complaint-panel-show');
    });

    $(document).on('click', '.create-complaint-panel-close, .create-complaint-panel-mask', function (event) {
        event.preventDefault();
        $('html').removeClass('create-complaint-panel-show');
    });

    //------------------------------------------------------------------------//

    //order mask
    if ($('.order-mask').length) {
        $('.order-mask').mask('999-9999');
    }

    //------------------------------------------------------------------------//

    //cabinet feedback text more
    $(document).on('click', '.cabinet-feedback-text-more', function (event) {
        event.preventDefault();
        $(this).fadeOut(50).parents('.cabinet-feedback-text').find('.cabinet-feedback-text-hidden').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //cabinet feedback panel
    $(document).on('click', '.cabinet-feedback-create-button', function (event) {
        event.preventDefault();
        $('html').addClass('cabinet-feedback-panel-show');
    });

    $(document).on('click', '.cabinet-feedback-panel-close, .cabinet-feedback-panel-mask', function (event) {
        event.preventDefault();
        $('html').removeClass('cabinet-feedback-panel-show');
    });

    //------------------------------------------------------------------------//

    //textarea maxlength
    $(document).on('keydown keyup keypress', '.textarea-maxlength', function () {
        var thisValue = $(this).val(),
            currentText = $(this).parents('.input-wrapper').find('.textarea-maxlength-current');
        if (thisValue.length) {
            currentText.text(thisValue.length);
        } else {
            currentText.text('0');
        }
    });

    //------------------------------------------------------------------------//

    //cabinet orders item
    $(document).on('click', '.cabinet-orders-item-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.cabinet-orders-item').toggleClass('active').find('.cabinet-orders-item-block').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //country
    $(document).on('click', '.country-item:not(.active)', function (event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    //------------------------------------------------------------------------//

    //faq
    $(document).on('click', '.faq-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.faq-item').toggleClass('active').find('.faq-info').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //review panel
    $(document).on('click', '.review-panel-link', function (event) {
        event.preventDefault();
        $('html').addClass('review-panel-show');
    });

    $(document).on('click', '.review-panel-close, .review-panel-mask', function (event) {
        event.preventDefault();
        $('html').removeClass('review-panel-show');
    });

    //------------------------------------------------------------------------//

    //profile panel
    function minHeightFix() {
        $('.profile-panel-register, .profile-panel-login-email, .profile-panel-login-phone').css("min-height", window.innerHeight - 203);
    }
    minHeightFix();
    $(window).resize(function () {
        minHeightFix();
    });

    //------------------------------------------------------------------------//

    //wholesale advantages
    var wholesaleAdvantages,
        wholesaleAdvantagesLength = $('.wholesale-advantages-slider').length;
    if (wholesaleAdvantagesLength) {
        wholesaleAdvantages = new Swiper('.wholesale-advantages-slider', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //wholesale subcategory
    var wholesaleSubcategory,
        wholesaleSubcategoryLength = $('.wholesale-subcategory-list').length;
    if (wholesaleSubcategoryLength) {
        wholesaleSubcategory = new Swiper('.wholesale-subcategory-list', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //product advantages
    var productAdvantages,
        productAdvantagesLength = $('.product-advantages').length;
    if (productAdvantagesLength) {
        productAdvantages = new Swiper('.product-advantages', {
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: false
            },
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 'auto',
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

    //product advantage more
    $(document).on('click', '.product-advantage-more', function (event) {
        event.preventDefault();
        $(this).parents('.product-advantage').toggleClass('active').find('.product-advantage-detail').slideToggle(150);
    });

    //------------------------------------------------------------------------//

    //product thumbnails
    var productThumbnails,
        productThumbnailsLength = $('.product-thumbnails').length;
    if (productThumbnailsLength) {
        productThumbnails = new Swiper('.product-thumbnails', {
            speed: 500,
            spaceBetween: 8,
            slidesPerView: 4,
            watchOverflow: true,
        });
        $('.product-thumbnails .swiper-slide').each(function (index) {
            if (index >= 3) {
                $(this).addClass('product-thumbnail-opacity');
            }
        });
        productThumbnails.on('slideChange', function () {
            var thisTargetIndex = productThumbnails.realIndex + 3;
            $('.product-thumbnails .swiper-slide').each(function (index) {
                if (index <= thisTargetIndex) {
                    $(this).removeClass('product-thumbnail-opacity');
                }
            });
        });
    }

    //------------------------------------------------------------------------//

    //product about
    $(document).on('click', '.product-about-nav a', function (event) {
        event.preventDefault();
        var thisId = $(this).attr('href');
        thisId = thisId.substr(1);
        $('[data-about="' + thisId + '"]').addClass('show');
        $('html').addClass('product-about-show');
        $('.product-about-panel-title').text($(this).data('title'));

        if (!state3DGallery && $('[data-about="' + thisId + '"]').find('.product-three-d-block').length) {
            init3DGallery();
            state3DGallery = true;
        }
        if ($('[data-about="' + thisId + '"]').find('.product-delivery-specs').length) {
            productDeliverySpecs.update();
        }
        if ($('[data-about="' + thisId + '"]').find('.product-advantages').length) {
            productAdvantages.update();
        }
    });

    $(document).on('click', '.product-about-panel-caption-back, .product-about-panel-close, .product-about-panel-back', function (event) {
        event.preventDefault();
        $('.product-about-panel').removeClass('show');
        $('html').removeClass('product-about-show');
    });

    //------------------------------------------------------------------------//

    //new cabinet status promocode
    var cabinetStatusPromocode,
        cabinetStatusPromocodeLength = $('.new-cabinet-status-promocode-list').length;
    if (cabinetStatusPromocodeLength) {
        cabinetStatusPromocode = new Swiper('.new-cabinet-status-promocode-list', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            speed: 500,
            spaceBetween: 20,
            slidesPerView: 1,
            watchOverflow: true,
        });
    }

    //------------------------------------------------------------------------//

});//document ready