import { sc } from './shoppingCart.js';

sc.checkAndUpdateQuantity();
const rowBody = document.querySelector('.row-body');
const productsBanner = document.querySelector('.products-banner');
const categoryItem = document.querySelectorAll('.category-item');
const pagination = document.querySelector('.pagination');
const productsTotal = document.querySelector('.products-total');
const sortType = document.querySelector('.sort-sel');
const categoryTitle = document.querySelector('.category-title');
let curUrl = new URL(document.URL);
let queryParam = curUrl.searchParams.toString();
// let apiURL = "https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/";
let apiURL = 'https://27api.fly.dev/api/v1/tours/';
let defaultSort = 'name';
let url = `${apiURL}${
    queryParam === '' ? `?sort=${defaultSort}&limit=6&page=1` : '?' + queryParam
}`;

if (!history.state) {
    getPageNum();
} else {
    getPageNum(history.state.category);
}

getAjaxData(url);

sortType.addEventListener('change', (e) => {
    defaultSort = e.target.value;
    console.log(location.search);
    if (location.search.split('&').length === 3 || !location.search) {
        url = `${apiURL}?sort=${defaultSort}&limit=6&page=${
            history.state ? history.state.page : '1'
        }`;
        history.pushState(
            {
                sort: defaultSort,
                page: history.state ? history.state.page : '1',
            },
            null,
            `?sort=${defaultSort}&limit=6&page=${
                history.state ? history.state.page : '1'
            }`
        );
        getAjaxData(url);
    } else {
        url = `${apiURL}?category=${
            history.state.category
        }&sort=${defaultSort}&limit=6&page=${
            history.state ? history.state.page : '1'
        }`;
        history.pushState(
            {
                category: history.state.category,
                sort: defaultSort,
                page: history.state ? history.state.page : '1',
            },
            null,
            `?category=${
                history.state.category
            }&sort=${defaultSort}&limit=6&page=${
                history.state ? history.state.page : '1'
            }`
        );
        getAjaxData(url);
    }
});

window.addEventListener('popstate', (e) => {
    // 取得目前網址列中的查詢參數
    checkCategoryActive();
    queryParam = e.target.location.search;

    // 查詢參數為空時則取得所有產品資料，存在查詢參數時則取得該產品資料
    let url = `${apiURL}${
        queryParam === '' ? `?sort=${defaultSort}&limit=6&page=1` : queryParam
    }`;
    getAjaxData(url);
    let pageItems = document.querySelectorAll('.page-numbers');
    pageItems.forEach((pageItem) => {
        pageItem.classList.remove('current');
    });
    if (!history.state) {
        // pageItems[0].classList.add("current");
        getPageNum();
    } else {
        // let historyPage = history.state.page;
        getPageNum(history.state.category);
    }

    rowBody.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
    });
});

checkCategoryActive();

function checkCategoryActive() {
    for (let i = 0; i < categoryItem.length; i++) {
        categoryItem[i].classList.remove('category-active');
    }
    categoryItem.forEach((category) => {
        // console.log(category.dataset.category);
        if (history.state) {
            if (history.state.category === category.dataset.category) {
                category.classList.add('category-active');
                categoryTitle.innerText = category.innerText;
            }
        } else {
            categoryItem[0].classList.add('category-active');
            categoryTitle.innerText = '所有商品';
        }
    });
}

categoryItem.forEach((category) => {
    // 為每個產品分類建立事件聆聽(點擊事件)
    category.addEventListener('click', function (e) {
        for (let i = 0; i < categoryItem.length; i++) {
            categoryItem[i].classList.remove('category-active');
        }
        this.classList.add('category-active');
        categoryTitle.innerText = this.innerText;
        /* productsBanner.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        }); */
        // 取得點擊目標的category屬性
        let curCategory = e.target.dataset.category;
        // defaultSort = "name";
        // 當前的curCategory若為all則向Server取得所有產品資料，否則只取某產品的資料
        if (curCategory === 'all') {
            // history.pushState(null, null, `/products.html`);
            history.pushState(
                null,
                null,
                `?sort=${defaultSort}&limit=6&page=1`
            );
            url = `${apiURL}?sort=${defaultSort}&limit=6&page=1`;
            getAjaxData(url);
            // 取得所有頁碼
            getPageNum();
        } else {
            history.pushState(
                { category: curCategory, sort: 'name', limit: 6, page: 1 },
                null,
                `?category=${curCategory}&sort=${defaultSort}&limit=6&page=1`
            );
            url = `${apiURL}?category=${curCategory}&sort=${defaultSort}&limit=6&page=1`;
            getAjaxData(url);
            getPageNum(curCategory);
        }
    });
});

function getAjaxData(reqUrl) {
    rowBody.innerHTML = `
    <div class="lorder-box">
        <div class="loader"></div>
    </div>`;

    axios.get(reqUrl).then(function (res) {
        document.querySelector('.lorder-box').style.display = 'none';
        let { tours } = res.data.dtat;
        tours.forEach((choco) => {
            rowBody.innerHTML += `
                <div class="col-6 col-md-4 ">
                    <div class="product-card">
                        <div class="product-img">
                            <div class="hovershow desktopshow">
                                <p class="hovershow-name">${choco.name}</p>
                                <span class="hovershow-div"></span>
                                <p class="hovershow-price">NT.&nbsp${choco.price}</p>
                                <p class="hovershow-description">
                                ${choco.description}
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
                            <a href="single.html?id=${choco.id}">
                            <img src="./assets/chocoproducts/${choco.images[0]}">
                            </a>
                        </div>
    
    
                        <div class="product-content">
    
    
                            <div class="viewlink">
                                <a href="single.html?id=${choco.id}">詳細介紹</a>
                            </div>
                            <div class="product-name">${choco.name}</div>
                            <div class="product-price">
                                <span class="rating">
                                    <ion-icon item-start class="star" name="star"></ion-icon>
                                    ${choco.ratingsAverage}&nbsp&nbsp(&nbsp${choco.ratingsQuantity}&nbsp)
                                </span>
                                NT.&nbsp${choco.price}
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
    });
}

function getPageNum(category = '') {
    pagination.innerHTML = '';
    axios
        .get(`${apiURL}${category ? '?category=' + category : ''}`)
        .then(function (res) {
            let refPage = +location.search.slice(-1);
            let { tours } = res.data.dtat;
            let totalPage = Math.ceil(tours.length / 6);

            productsTotal.innerText = `共${tours.length}件商品`;
            for (let i = 0; i < totalPage; i++) {
                pagination.innerHTML += ` 
                        <li class="page-numbers" data-page=${i + 1}>
                           ${i + 1}
                       </li>`;
            }
            let pageItems = document.querySelectorAll('.page-numbers');
            if (refPage) {
                pageItems[refPage - 1].classList.add('current');
            } else {
                pageItems[0].classList.add('current');
            }
        })
        .then(function () {
            let pageItems = document.querySelectorAll('.page-numbers');
            // console.log(window.location.search);
            pageItems.forEach((pageItem) => {
                pageItem.addEventListener('click', (e) => {
                    let curPage = e.target.dataset.page;
                    for (let i = 0; i < pageItems.length; i++) {
                        pageItems[i].classList.remove('current');
                    }
                    e.target.classList.add('current');

                    if (
                        location.search.split('&').length === 3 ||
                        !location.search
                    ) {
                        url = `${apiURL}?sort=${defaultSort}&limit=6&page=${curPage}`;
                        history.pushState(
                            {
                                category: '',
                                sort: defaultSort,
                                limit: 6,
                                page: curPage,
                            },
                            null,
                            `?sort=${defaultSort}&limit=6&page=${curPage}`
                        );
                    } else {
                        url = `${apiURL}?category=${category}&sort=${defaultSort}&limit=6&page=${curPage}`;
                        history.pushState(
                            {
                                category,
                                sort: defaultSort,
                                limit: 6,
                                page: curPage,
                            },
                            null,
                            `?category=${category}&sort=${defaultSort}&limit=6&page=${curPage}`
                        );
                    }

                    getAjaxData(url);

                    rowBody.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest',
                    });
                });
            });
        });
}
