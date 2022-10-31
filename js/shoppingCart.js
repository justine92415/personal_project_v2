const currentCartQuantity = document.querySelectorAll(".current-quantity");
class shoppingCart {
    constructor(curQuantity) {
        this.curQuantity = curQuantity;
    }

    getAllCartElement() {
        let btnTocarts;
        let btnPlus;
        let btnMinus;
        let inputQuantityMobile;
        if (window.innerWidth > 768) {
            btnTocarts = document.querySelectorAll(".btn-tocarts-dt");
            btnPlus = document.querySelectorAll(".btn-plus-dt");
            btnMinus = document.querySelectorAll(".btn-minus-dt");
            inputQuantityMobile =
                document.querySelectorAll(".input-quantity-dt");
        } else {
            btnTocarts = document.querySelectorAll(".btn-tocarts-mb");
            btnPlus = document.querySelectorAll(".btn-plus-mb");
            btnMinus = document.querySelectorAll(".btn-minus-mb");
            inputQuantityMobile =
                document.querySelectorAll(".input-quantity-mb");
        }

        return { btnTocarts, btnPlus, btnMinus, inputQuantityMobile };
    }

    checkAndUpdateQuantity() {
        /*    currentCartQuantity[0].innerText = localStorage.length;
        currentCartQuantity[1].innerText = localStorage.length; */
        currentCartQuantity.forEach((ccq) => {
            ccq.innerText = localStorage.length;
        });
    }

    addToLocalStorage(obj, quantity) {
        let productObj = {
            id: obj.id,
            name: obj.name,
            price: obj.price,
            quantity,
            image: obj.images[0],
        };
        let strObj = JSON.stringify(productObj);
        localStorage.setItem(`${obj.id}`, strObj);
        this.checkAndUpdateQuantity();
        setTimeout(() => {
            alert("已添加至購物車");
        }, 500);
    }
}

export const sc = new shoppingCart(currentCartQuantity);
