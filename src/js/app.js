document.addEventListener('DOMContentLoaded', () => {

    $('[data-slider-presentation]').slick({
        prevArrow: `<button type="button" class="slick-prev presentation__btn-prev">
                        <svg fill="none" viewBox="0 0 212 208" id="btl-left">
                        <path
                            d="M69.292 5.047L55.585 9.865 11.178 48.023 0 80.751l5.538 61.175 28.855 39.051 52.374 26.814 43.016-3.313 38.894-14.53 37.504-53.706 5.412-29.747L200.39 56.74l-34.52-39.662L117.113 0 69.292 5.047z"
                            fill="#F2AB61" />
                        </svg>
                    </button>`,
        nextArrow: `<button type="button" class="slick-prev presentation__btn-next">
                        <svg fill="none" viewBox="0 0 170 235" id="btn-right">
                        <path
                            d="M148.788 141.979L170 97.073l-7.811-48.17-27.305-28.693L92.055 0l-27.74 2.473-43.073 24.038-19.02 33.972L0 107.747l16.796 30.541 23.647 23.856 51.947 10.062 8.053 53.884 12.878 8.91 19.039-2.518 6.726-16.026-23.075-49.987 32.777-24.49zm-31.62 61.587l8.042 5.811-1.584 6.68-3.191 7.033-6.128-1.781-3.545-11.984 6.406-5.759z"
                            fill="#6B667F" />
                        </svg>
                    </button>`,
    
    });
    
    $('[data-slider-restaurant]').slick({
        slidesToShow: 5,
        centerMode: true,
        variableWidth: true,
        prevArrow: `<button type="button" class="slick-prev btn btn_slick restaurant__btn-prev">
                        <svg fill="none" viewBox="0 0 31 31" width="31" height="31" id="slide-arrow-left">
                            <path d="M15.515 30.25L1.75 15.625m0 0L15.515 1M1.75 15.625H31" stroke="" stroke-width="2" />
                        </svg>
                    </button>`,
        nextArrow: `<button type="button" class="slick-prev btn btn_slick restaurant__btn-next">
                        <svg fill="none" viewBox="0 0 68 31" width="68" height="31" id="slide-arrow-right">
                            <path d="M52.235 30.25L66 15.625m0 0L52.235 1M66 15.625H0" stroke="" stroke-width="2" />
                        </svg>
                    </button>`,
        
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 5,
                    arrows: false,
                }
            }
        ]
    
    });
    
    $('[data-slider-mobileapp]').slick({
        prevArrow: `<button type="button" class="slick-prev btn btn_slick mobile-app__btn-prev">
                        <svg fill="none" viewBox="0 0 31 31" width="31" height="31" id="slide-arrow-left">
                            <path d="M15.515 30.25L1.75 15.625m0 0L15.515 1M1.75 15.625H31" stroke="" stroke-width="2" />
                        </svg>
                    </button>`,
        nextArrow: `<button type="button" class="slick-prev btn btn_slick mobile-app__btn-next">
                        <svg fill="none" viewBox="0 0 68 31" width="68" height="31" id="slide-arrow-right">
                            <path d="M52.235 30.25L66 15.625m0 0L52.235 1M66 15.625H0" stroke="" stroke-width="2" />
                        </svg>
                    </button>`,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    variableWidth: true,
                }
            },
        ]
    });

    
    const sliderInfo = document.querySelector('[data-slider-info]');

    function createSliderInfo() {
        $('[data-slider-info]').slick({
            arrows: false,
            infinite: false,
            variableWidth: true,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: false,
            responsive: [
                {
                  breakpoint: 767,
                  settings:  {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 1023,
                  settings:  "unslick"
                },
            ]
        });
    }

    createSliderInfo();

    window.addEventListener("resize", () => {
        if (!sliderInfo.classList.contains('slick-initialized') && window.innerWidth <= 1023) {
            createSliderInfo();
        }
    });


    const modalBox = document.querySelector('[data-modal-box]');
    const modalBtnClose = modalBox.querySelector('[data-modal-close]');

    function closeModalBox() {
        $(modalBox).find('.restcard__gallery').slick('unslick');

        modalBox.classList.remove('is-active');
        modalBox.firstElementChild.innerHTML = '';
        modalBox.firstElementChild.appendChild(modalBtnClose);
    }

    const promoCards = document.querySelectorAll('[data-info-card]');
    let cloneCard = '';

    promoCards.forEach((card) => {
        const cardBtns = card.querySelector('[data-info-btn]');

        cardBtns.addEventListener('click', (evt) => {
            cloneCard = card.cloneNode(true);
            cloneCard.classList.remove('slick-slide', 'slick-current', 'slick-active');
            modalBox.firstElementChild.appendChild(cloneCard);
            modalBox.classList.add('is-active');
        });
    });

    modalBox.addEventListener('click', (evt) => {
        if (evt.target == modalBox) {
            closeModalBox();
        }
    });
    modalBtnClose.addEventListener('click', (evt) => {
        closeModalBox();
    });



    const foodMenuBtns = document.querySelectorAll('[data-foodmenu-btn]');
    const foofMenuDecor = document.querySelector('[data-foodmenu-decor');

    foodMenuBtns.forEach((btn) => {
        btn.addEventListener('click', (evt) => {
            foodMenuBtns.forEach((itemBtn) => {
                itemBtn.classList.remove('is-active');
                itemBtn.disabled = false;
            });
            btn.classList.add('is-active');
            btn.disabled = true;
            foofMenuDecor.style.backgroundImage = `url(../img/svg/icons.svg#menu-${btn.dataset.foodmenuBtn})`;
        });
    });



    const restCards = document.querySelectorAll('[data-restcard]');

    restCards.forEach((restCard) => {
        const restBtn = restCard.querySelector('[data-restcard-btn]');

        restBtn.addEventListener('click', (evt) => {
            cloneCard = restCard.querySelector('[data-restcard-content]').cloneNode(true);
            cloneCard.style = '';
            modalBox.firstElementChild.appendChild(cloneCard);

            cloneCard = restCard.querySelector('[data-restcard-map]').cloneNode(true);
            modalBox.firstElementChild.appendChild(cloneCard);
            modalBox.classList.add('is-active');

            $(modalBox).find('.restcard__gallery').slick({
                prevArrow: `<button type="button" class="slick-prev btn btn_slick restcard__btn-prev">
                        <svg fill="none" viewBox="0 0 31 31" width="31" height="31" id="slide-arrow-left">
                            <path d="M15.515 30.25L1.75 15.625m0 0L15.515 1M1.75 15.625H31" stroke="" stroke-width="2" />
                        </svg>
                    </button>`,
                nextArrow: `<button type="button" class="slick-prev btn btn_slick restcard__btn-next">
                                <svg fill="none" viewBox="37 0 31 31" width="31" height="31" id="slide-arrow-right">
                                    <path d="M52.235 30.25L66 15.625m0 0L52.235 1M66 15.625H0" stroke="" stroke-width="2" />
                                </svg>
                            </button>`,
            });
        });
    });

    $('.btn.restaurant__change-btn').click(function () {
        $('.btn.restaurant__change-btn').toggleClass('is-active');
        // insertRests($('.restaurant__change-btn.is-active').text());
    })

});
