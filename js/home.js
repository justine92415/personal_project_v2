import { sc } from './shoppingCart.js';
window.addEventListener('load', function () {
    /* ***carts*** */

    sc.checkAndUpdateQuantity();

    /* ***banner*** */
    const sliderImgList = document.querySelector('.slider-imglist');
    const sliderImgItem = document.querySelectorAll('.slider-imgitem');
    const dotGroup = document.querySelector('.dot-group');
    let dots;
    let curImg = 1;

    /* ***feedback*** */
    const btnLeft = document.querySelector('.btn-left');
    const btnRight = document.querySelector('.btn-right');
    const feedbackRrow = document.querySelector('.feedback-row');
    const feedbackCard = document.querySelectorAll('.feedback-card');
    let curFeedback = 0;
    let limit;

    /* ***interSectionOberserve*** */
    let bonbonPics = document.querySelectorAll('.product-pics')[0];
    let rawPics = document.querySelectorAll('.product-pics')[1];

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };

    const bonbonsBody = document.querySelector('.bonbons-row');
    const rawBody = document.querySelector('.raw-row');

    const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            console.log();
            if (entries[0].target === bonbonPics) {
                for (let i = 0; i < bonbonPics.children.length; i++) {
                    bonbonPics.children[i].classList.add(
                        `animation-pic${i + 1}`
                    );
                }
            }

            if (entries[0].target === rawPics) {
                for (let i = 0; i < rawPics.children.length; i++) {
                    rawPics.children[i].classList.add(`animation-pic${i + 1}`);
                }
            }
        } else {
        }
    }, options);

    intersectionObserver.observe(bonbonPics);
    intersectionObserver.observe(rawPics);

    // banner
    createDots();
    let autoPlay = setInterval(() => {
        autoSlider();
    }, 3000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function (e) {
            clearDotActive();
            clearInterval(autoPlay);
            curImg = index + 1;
            e.target.classList.add('dot-active');
            sliderImgList.style.left = `${-index * 100}%`;
            autoPlay = setInterval(() => {
                autoSlider();
            }, 3000);
        });
    });

    function autoSlider() {
        clearDotActive();
        dots[curImg].classList.add('dot-active');

        sliderImgList.style.left = `${-curImg * 100}%`;
        curImg++;
        if (curImg === sliderImgItem.length) {
            curImg = 0;
        }
    }

    function createDots() {
        for (let i = 0; i < sliderImgItem.length; i++) {
            if (!i) {
                dotGroup.innerHTML += ` <li class="dot dot-active"></li>`;
            } else {
                dotGroup.innerHTML += ` <li class="dot "></li>`;
            }
        }

        dots = document.querySelectorAll('.dot');
    }

    function clearDotActive() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('dot-active');
        }
    }

    // feedback
    if (this.window.innerWidth > 768) {
        limit = feedbackCard.length / 3;
    } else {
        limit = feedbackCard.length;
    }
    btnRight.addEventListener('click', function () {
        if (curFeedback < limit - 1) {
            curFeedback++;
            moveAndCheck(this, btnLeft);
        }
    });
    btnLeft.addEventListener('click', function () {
        if (curFeedback > 0) {
            curFeedback--;
            moveAndCheck(this, btnRight);
        }
    });

    window.addEventListener('resize', () => {
        if (this.window.innerWidth === 768) {
            limit = feedbackCard.length / 3;
            resetArrow();
        }
        if (this.window.innerWidth < 768) {
            limit = feedbackCard.length;
            resetArrow();
        }
    });

    function resetArrow() {
        curFeedback = 0;
        feedbackRrow.style.left = `calc(-${curFeedback * 100}%)`;
        btnRight.style.color = '#431';
        btnLeft.style.color = '#999';
    }

    function moveAndCheck(thisArrow, otherArrow) {
        feedbackRrow.style.left = `calc(-${curFeedback * 100}%)`;
        if (thisArrow === btnRight) {
            thisArrow.style.color = curFeedback === limit - 1 ? '#999' : '#431';
            otherArrow.style.color = '#431';
        } else {
            console.log(thisArrow);
            thisArrow.style.color = curFeedback === 0 ? '#999' : '#431';
            btnRight.style.color = '#431';
        }
    }

    /* ***produts*** */
    /* getProductData(
        "https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/?category=raw&category=bonbons"
    ); */
    getProductData(
        'https://27api.fly.dev/api/v1/tours/?category=raw&category=bonbons'
    );

    function getProductData(reqURL) {
        bonbonsBody.innerHTML = ``;
        rawBody.innerHTML = ``;

        axios.get(reqURL).then(function (res) {
            let { tours } = res.data.dtat;
            let bonbonsArr = tours.filter((choco) => {
                return choco.category === 'bonbons';
            });

            let rawArr = tours.filter((choco) => {
                return choco.category === 'raw';
            });

            for (let i = 0; i < 4; i++) {
                bonbonsBody.innerHTML += createProductCard(
                    bonbonsArr[i].name,
                    bonbonsArr[i].price,
                    bonbonsArr[i].description,
                    bonbonsArr[i].images[0],
                    bonbonsArr[i].id,
                    bonbonsArr[i].ratingsAverage,
                    bonbonsArr[i].ratingsQuantity
                );
                rawBody.innerHTML += createProductCard(
                    rawArr[i].name,
                    rawArr[i].price,
                    rawArr[i].description,
                    rawArr[i].images[0],
                    rawArr[i].id,
                    rawArr[i].ratingsAverage,
                    rawArr[i].ratingsQuantity
                );
            }

            /* const btnPlusMobile = document.querySelectorAll(".btn-plus-mb");
            const inputQuantityMobile =
                document.querySelectorAll(".input-quantity-mb");
            const btnMiusMobile = document.querySelectorAll(".btn-minus-mb");
            const btnToCarts = sc.getAllBtnCart(); */

            let { btnTocarts, btnPlus, btnMinus, inputQuantityMobile } =
                sc.getAllCartElement();

            btnPlus.forEach((btnPmb, index) => {
                btnPmb.addEventListener('click', function () {
                    let quantity = +inputQuantityMobile[index].value;
                    inputQuantityMobile[index].value = quantity + 1;
                });
            });
            btnMinus.forEach((btnMmb, index) => {
                btnMmb.addEventListener('click', function () {
                    let quantity = +inputQuantityMobile[index].value;
                    if (quantity === 1) return;
                    inputQuantityMobile[index].value = quantity - 1;
                });
            });
            btnTocarts.forEach((btnCart, index) => {
                btnCart.addEventListener('click', function () {
                    let quantity = +inputQuantityMobile[index].value;
                    sc.addToLocalStorage(tours[index], quantity);
                    console.log('populated!');
                    console.log(localStorage.length);
                });
            });
        });
    }

    function createProductCard(
        name,
        price,
        description,
        image,
        id,
        ratingsAverage,
        ratingsQuantity
    ) {
        return `
                <div class="col-6 col-md-3 ">
                    <div class="product-card">
                        <div class="product-img">
                            <div class="hovershow desktopshow">
                                <p class="hovershow-name">${name}</p>
                                <span class="hovershow-div"></span>
                                <p class="hovershow-price">NT.&nbsp${price}</p>
                                <p class="hovershow-description">
                                ${description}
                                </p>
                                <div class="hovershow-carts">
                                    <button class="carts-btn btn-minus-dt">
                                        <ion-icon  name="remove-outline"></ion-icon>
                                     </button>
                                    <input class="carts-quantity input-quantity-dt" type="number" min="1" max="99" value="1">
                                    <button class="carts-btn btn-plus-dt">
                                        <ion-icon name="add-outline"></ion-icon>
                                    </button>
                                    <button class="carts-btn btn-tocarts-dt">
                                         <ion-icon  name="cart-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                            
                            <a href="single.html?id=${id}">
                            <img src="./assets/chocoproducts/${image}" alt="商品圖片">
                            </a>
                        </div>
    
    
                        <div class="product-content">
    
    
                            <div class="viewlink">
                                <a href="single.html?id=${id}">詳細介紹</a>
                            </div>
                            <div class="product-name">${name}</div>
                            <div class="product-price">
                                <span class="rating">
                                    <ion-icon item-start class="star" name="star"></ion-icon>
                                    ${ratingsAverage}&nbsp&nbsp(&nbsp${ratingsQuantity}&nbsp)
                                </span>
                                NT.&nbsp${price}
                            </div>
    
                            <div class="mb-carts">
                                <button class="carts-btn btn-minus-mb">
                                    <ion-icon  name="remove-outline"></ion-icon>
                                </button>
                                <input class="carts-quantity input-quantity-mb" type="number" min="1" max="99" value="1">
                                <button class="carts-btn btn-plus-mb">
                                    <ion-icon name="add-outline"></ion-icon>
                                </button>
                                <button class="carts-btn btn-tocarts-mb">
                                    <ion-icon  name="cart-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
});
