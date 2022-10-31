import { sc } from "./shoppingCart.js";

window.addEventListener("load", function () {
    let cartsBody = document.querySelector(".carts-body");
    let cartsGroup = [];

    sc.checkAndUpdateQuantity();
    createCartsItem();

    function createCartsItem() {
        let tt = "";
        cartsGroup = [];
        for (let i = 0; i < localStorage.length; i++) {
            cartsGroup.push(
                JSON.parse(localStorage.getItem(localStorage.key(i)))
            );
        }
        cartsGroup.forEach((cartsItem) => {
            tt += `<div class="carts-box col-12">
            <div class="row">
                <div class="carts-col col-12 col-md-3">
                    <div class="carts-img">
                        <img src="./assets/chocoproducts/${cartsItem.image}">
                    </div>
                </div>
                <div class="carts-col col-12 col-md-2">
                    <h2 class="carts-name">
                        ${cartsItem.name}
                    </h2>
                </div>
                <div class="carts-col col-12 col-md-2">
                    <div class="carts-price">
                        NT.&nbsp;${cartsItem.price}

                    </div>
                </div>
                <div class="carts-col col-12 col-md-2">
                    <div class="carts-count-box">
                        <div class="carts-count">
                            <button class="carts-minus">
                                <ion-icon name="remove-outline"></ion-icon>
                            </button>
                            <input class="carts-countnum" type="number" value="${
                                cartsItem.quantity
                            }">
                            <button class="carts-plus">
                                <ion-icon name="add-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="carts-col col-12 col-md-2">
                    <div class="carts-total">
                        NT.&nbsp;${cartsItem.price * cartsItem.quantity}
                    </div>
                </div>
                <div class="carts-col col-12 col-md-1">
                    <div class="carts-delete">
                        刪除
                    </div>
                </div>
            </div>
        </div>`;
        });
        cartsBody.innerHTML = tt;
        getElementAndAddEvent();
    }

    function getElementAndAddEvent() {
        let btnDelete = document.querySelectorAll(".carts-delete");
        let btnPlus = document.querySelectorAll(".carts-plus");
        let btnMinus = document.querySelectorAll(".carts-minus");
        let cartsCount = document.querySelectorAll(".carts-countnum");
        let cartsTotal = document.querySelectorAll(".carts-total");
        btnDelete.forEach((bd, index) => {
            bd.addEventListener("click", () => {
                localStorage.removeItem(cartsGroup[index].id);
                sc.checkAndUpdateQuantity();
                createCartsItem();
            });
        });
        btnPlus.forEach((bp, index) => {
            bp.addEventListener("click", () => {
                cartsCount[index].value = +cartsCount[index].value + 1;
                cartsTotal[index].innerHTML = `NT.&nbsp;${
                    cartsGroup[index].price * cartsCount[index].value
                }`;
            });
        });
        btnMinus.forEach((bm, index) => {
            bm.addEventListener("click", () => {
                if (+cartsCount[index].value > 1) {
                    cartsCount[index].value = +cartsCount[index].value - 1;
                    cartsTotal[index].innerHTML = `NT.&nbsp;${
                        cartsGroup[index].price * cartsCount[index].value
                    }`;
                }
            });
        });
        cartsCount.forEach((cc, index) => {
            cc.addEventListener("input", () => {
                cartsTotal[index].innerHTML = `NT.&nbsp;${
                    cartsGroup[index].price * cartsCount[index].value
                }`;
            });
        });
    }
});
