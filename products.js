// 獲取產品卡片容器
const rowBody = document.querySelector(".row-body");

// 獲取所有產品分類
const categoryItem = document.querySelectorAll(".category-item");

// 獲取頁碼容器
const pagination = document.querySelector(".pagination");
console.log(pagination);

// 獲取當前的路徑
let curUrl = new URL(document.URL);
// 當前路徑的查詢參數
let queryParam = curUrl.searchParams.toString();
// 請求路徑，當沒有查詢參數時預設取得所有產品數據，若有查詢參數時則獲取該產品數據
let url = `https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/${
    queryParam === "" ? "?sort=name&limit=6&page=1" : "?" + queryParam
}`;

// 向Server取得產品數據
getAjaxData(url);

categoryItem.forEach((category) => {
    category.addEventListener("click", async (e) => {
        let curCategory = e.target.dataset.category;
        if (curCategory === "all") {
            history.replaceState(null, null, `/products.html`);
            rowBody.innerHTML = "";
            url = `https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/?sort=name&limit=6&page=1`;
            getAjaxData(url);
            getPageNum();
        } else {
            history.replaceState(null, null, `?category=${curCategory}`);
            url = `https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/?category=${e.target.dataset.category}&sort=name&limit=6&page=1`;

            getAjaxData(url);
            console.log(curCategory);
            getPageNum(curCategory);
        }
    });
});

window.addEventListener("popstate", (e) => {
    queryParam = e.target.location.search;
    let url = `https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/${
        queryParam === "" ? "?sort=name&limit=6&page=1" : queryParam
    }`;
    getAjaxData(url);
});

function getAjaxData(reqUrl) {
    rowBody.innerHTML = "";
    axios.get(reqUrl).then(function (res) {
        let { tours } = res.data.dtat;
        tours.forEach((choco) => {
            rowBody.innerHTML += `
            <div class="col-4">
                <div class="product-card">
                    <div class="product-img">
                        <div class="hovershow ">
                            <p class="hovershow__name">${choco.name}</p>
                            <span class="hovershow__div"></span>
                            <p class="hovershow__price">NT.300</p>
                            <p class="hovershow__description">
                            ${choco.description}
                            </p>
                            <div class="hovershow__carts">
                                <button class="carts__btn">
                                    <ion-icon class="btn__plus" name="remove-outline"></ion-icon>
                                </button>
                                <input class="carts__num" type="number" min="1" max="99" value="1">
                                <button class="carts__btn">
                                    <ion-icon class="btn__minus" name="add-outline"></ion-icon>
                                </button>
                                <button class="carts__btn">
                                    <ion-icon class="btn__carts" name="cart-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <img src="./assets/chocoproducts/${choco.images[0]}">
                    </div>
    
                    <div class="product-content">
                        <div class="viewlink">
                            <a href="single.html">詳細介紹</a>
                        </div>
                        <div class="product-name">${choco.name}</div>
                        <div class="product-price">NT.${choco.price}</div>
                    </div>
                </div>
            </div>`;
        });
    });
}

function getPageNum(category = "") {
    pagination.innerHTML = "";
    console.log(category);
    axios
        .get(
            `https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/${
                category ? "?category=" + category : ""
            }`
        )
        .then(function (res) {
            let refPage = +location.search.slice(-1);
            let { tours } = res.data.dtat;
            console.log(tours);
            let totalPage = Math.ceil(tours.length / 6);
            for (let i = 0; i < totalPage; i++) {
                pagination.innerHTML += ` 
                    <li class="page-numbers" data-page=${i + 1}>
                       ${i + 1}
                   </li>`;
            }
            let pageItems = document.querySelectorAll(".page-numbers");
            if (refPage) {
                pageItems[refPage - 1].classList.add("current");
            } else {
                pageItems[0].classList.add("current");
            }
        })
        .then(function () {
            let pageItems = document.querySelectorAll(".page-numbers");
            pageItems.forEach((pageItem) => {
                console.log();
                pageItem.addEventListener("click", (e) => {
                    for (let i = 0; i < pageItems.length; i++) {
                        pageItems[i].classList.remove("current");
                    }
                    e.target.classList.add("current");
                    let curPage = e.target.dataset.page;
                    url = `https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/?sort=name&limit=6&page=${curPage}`;
                    history.pushState(
                        null,
                        null,
                        `?sort=name&limit=6&page=${curPage}`
                    );
                    getAjaxData(url);

                    rowBody.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "nearest",
                    });
                });
            });
        });
}
getPageNum();
