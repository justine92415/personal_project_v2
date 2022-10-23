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

    let apiURL = "https://learnnodejs-3s6rmmfxwq-de.a.run.app/api/v1/tours/";

    let curNum = +countNum.value;

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
        console.log(tour);
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
    });
});
