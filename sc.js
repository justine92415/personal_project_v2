import { sc } from "./shoppingCart.js";

window.addEventListener("load", function () {
    sc.checkAndUpdateQuantity();
    const cartsBody = document.querySelector(".carts-body");
    let cartsGroup = [];
    createCartsItem();
    const cartsImg = document.querySelector(".carts-img img");
    const cartsName = document.querySelector(".carts-name");
    const cartsPrice = document.querySelectorAll(".carts-price");
    const btnMinus = document.querySelectorAll(".sc-btn .minus");
    const btnPlus = document.querySelectorAll(".sc-btn .plus");
    const cartsCountnum = document.querySelectorAll(".carts-countnum");
    const cartsTotal = document.querySelectorAll(".carts-total");
    let quantity;

    btnPlus.forEach((btnP, index) => {
        btnP.addEventListener("click", () => {
            quantity = +cartsCountnum[index].value;
            cartsCountnum[index].value = quantity + 1;
            cartsTotal[index].innerHTML = `NT.&nbsp${
                cartsGroup[index].price * +cartsCountnum[index].value
            }`;
        });
    });
    btnMinus.forEach((btnM, index) => {
        btnM.addEventListener("click", () => {
            quantity = +cartsCountnum[index].value;
            if (quantity - 1 === 0) {
                let itemKey = cartsGroup[index].id;
                localStorage.removeItem(itemKey);
                cartsBody.innerHTML = ``;
                sc.checkAndUpdateQuantity();
                console.log(this.localStorage.length);
                cartsGroup = [];
                createCartsItem();
            }
            cartsCountnum[index].value = quantity - 1;
            cartsTotal[index].innerHTML = `NT.&nbsp${
                cartsGroup[index].price * +cartsCountnum[index].value
            }`;
        });
    });

    function createCartsItem() {
        cartsBody.innerHTML = ``;

        for (let i = 0; i < localStorage.length; i++) {
            cartsGroup.push(
                JSON.parse(localStorage.getItem(localStorage.key(i)))
            );
        }

        console.log(cartsGroup);

        cartsGroup.forEach((cartsItem) => {
            cartsBody.innerHTML += `
        <div class="col-12">
                            <div class="row carts-row">
                                <div class="col-6 carts-content">
                                    <div class="carts-img">
                                        <img src="./assets/chocoproducts/${
                                            cartsItem.image
                                        }">
                                    </div>
                                    <div class="carts-name">
                                        ${cartsItem.name}
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="carts-price">
                                    Nt.&nbsp${cartsItem.price}
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="count-btn sc-btn">
                                        <button class="minus">
                                            <ion-icon name="remove-outline"></ion-icon>
                                        </button>
                                        <input class="carts-countnum" type="number" value="${
                                            cartsItem.quantity
                                        }">
                                        <button class="plus">
                                            <ion-icon name="add-outline"></ion-icon>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="carts-total">
                                    Nt.&nbsp${
                                        cartsItem.price * +cartsItem.quantity
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
        });
    }
});
