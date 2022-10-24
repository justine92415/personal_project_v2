window.addEventListener("load", function () {
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

    let apiURL = "https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/";

    let curNum = +countNum.value;
    console.log(localStorage.length);

    /* for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    } */

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
        const { tour } = res.data.dtat;
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

        // 購物車功能
        /* function populateStorage() {
            // 購物車需要
            // 1. Id
            // 2. 品名
            // 3. 價格
            // 4. 數量
            // 5. 第一張圖
            let productObj = {
                id: tour.id,
                name: tour.name,
                price: tour.price,
                quantity: curNum,
                image: tour.images[0],
            };

            let strObj = JSON.stringify(productObj);
            localStorage.setItem(`${tour.id}`, strObj);

            console.log("populated!");
            console.log(localStorage.length);
        }

        addToCart.addEventListener("click", populateStorage); */
    });
});
