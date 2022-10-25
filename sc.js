import { sc } from "./shoppingCart.js";

window.addEventListener("load", function () {
    sc.checkAndUpdateQuantity();
    const cartsBody = document.querySelector(".carts-body");
    let cartsGroup = [];
    createCartsItem();
    let btnMinus = document.querySelectorAll(".sc-btn .minus");
    let btnPlus = document.querySelectorAll(".sc-btn .plus");
    let cartsCountnum = document.querySelectorAll(".carts-countnum");
    let cartsTotal = document.querySelectorAll(".carts-total");
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
                location.reload();
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
