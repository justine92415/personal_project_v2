import { sc } from "./shoppingCart.js";

window.addEventListener("load", function () {
    sc.checkAndUpdateQuantity();
    const breadcrumbsCurrent = document.querySelector(".breadcrumbs-current");
    const singleId = location.search.split("=")[1];
    const singleMain = document.querySelector(".single-main img");
    const singlesub = document.querySelectorAll(".single-sub img");
    const singleName = document.querySelector(".single-name h2");
    const singleQuantitys = document.querySelectorAll(".single-quantity");
    const singleDescription = document.querySelector(".single-description p");
    const price = document.querySelector(".price");
    const total = document.querySelector(".total");
    const countNum = document.querySelector(".single-countnum");
    const minus = document.querySelector(".minus");
    const plus = document.querySelector(".plus");

    const addToCart = document.querySelector(".single-addcart");
    const otherBody = document.querySelector(".row-body");

    let apiURL = "https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/";

    let curNum = +countNum.value;
    console.log(localStorage.length);

    addEventListener("storage", (event) => {
        console.log("sotrage!!");
    });

    countNum.addEventListener("input", (e) => {
        curNum = +e.target.value;
        total.innerText = `${+price.innerText * curNum}`;
    });

    minus.addEventListener("click", (e) => {
        if (+countNum.value !== 1) {
            curNum -= 1;
            countNum.value = curNum;
            total.innerText = `${+price.innerText * curNum}`;
        }
    });

    plus.addEventListener("click", (e) => {
        curNum += 1;
        countNum.value = curNum;
        total.innerText = `${+price.innerText * curNum}`;
    });

    axios.get(`${apiURL}${singleId}`).then(function (res) {
        document.querySelector(".loader").style.display = "none";
        const { tour } = res.data.dtat;
        document.title = tour.name;
        breadcrumbsCurrent.innerHTML = `&nbsp&nbsp>&nbsp&nbsp${tour.name}`;
        singleMain.src = `./assets/chocoproducts/${tour.images[0]}`;
        singlesub.forEach((sub, index) => {
            sub.src = `./assets/chocoproducts/${tour.images[index]}`;
            sub.addEventListener("click", (e) => {
                console.log(e.target);
                singleMain.src = e.target.src;
            });
        });
        singleName.innerText = `${tour.name}`;
        singleQuantitys.forEach((quantity) => {
            quantity.innerHTML = `&nbsp; ${tour.ratingsQuantity}則評價`;
        });
        singleDescription.innerText = `${tour.description}`;
        price.innerText = `${tour.price}`;
        total.innerText = `${tour.price * curNum}`;

        addToCart.addEventListener("click", () => {
            let productObj = {
                id: tour.id,
                name: tour.name,
                price: tour.price,
                quantity: curNum,
                image: tour.images[0],
            };
            let strObj = JSON.stringify(productObj);
            localStorage.setItem(`${tour.id}`, strObj);
            sc.checkAndUpdateQuantity();
        });
    });

    let otherURL = `${apiURL}?category=other`;

    getProductData(otherURL);

    function getProductData(reqURL) {
        otherBody.innerHTML = ``;
        axios.get(reqURL).then(function (res) {
            let { tours } = res.data.dtat;

            for (let i = 0; i < 4; i++) {
                otherBody.innerHTML += createProductCard(
                    tours[i].name,
                    tours[i].price,
                    tours[i].description,
                    tours[i].images[0],
                    tours[i].id,
                    tours[i].ratingsAverage,
                    tours[i].ratingsQuantity
                );
            }

            let { btnTocarts, btnPlus, btnMinus, inputQuantityMobile } =
                sc.getAllCartElement();

            btnPlus.forEach((btnPmb, index) => {
                btnPmb.addEventListener("click", function () {
                    let quantity = +inputQuantityMobile[index].value;
                    inputQuantityMobile[index].value = quantity + 1;
                });
            });
            btnMinus.forEach((btnMmb, index) => {
                btnMmb.addEventListener("click", function () {
                    let quantity = +inputQuantityMobile[index].value;
                    if (quantity === 1) return;
                    inputQuantityMobile[index].value = quantity - 1;
                });
            });
            btnTocarts.forEach((btnCart, index) => {
                btnCart.addEventListener("click", function () {
                    let quantity = +inputQuantityMobile[index].value;
                    sc.addToLocalStorage(tours[index], quantity);
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
                            <img src="./assets/chocoproducts/${image}">
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
