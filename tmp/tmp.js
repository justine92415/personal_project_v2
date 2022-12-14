console.log("hihi");

window.addEventListener("load", function () {
    const sizeItems = document.querySelectorAll(".size-item");
    const colorItem = document.querySelectorAll(".color-item");
    const chocoContent = document.querySelector(".cbox");

    const customizeStep = document.querySelector(".customize-step");
    let curStep = 0;
    let isChosenSize = false;
    let isChosenColor = false;
    let canNext = false;

    const arrowBack = document.querySelector(".arrow-back");
    const arrowForward = document.querySelector(".arrow-forward");

    const chocoCategorys = document.querySelectorAll(".choco-category");

    // Desktop
    let dragSource = document.querySelectorAll(".choco-img");
    let dropTarget = document.querySelectorAll(".dropbox");
    let boxchocos;
    let sum = 0;
    let dragTemp;
    // Desktop

    // Mobile

    sizeItems.forEach((item) => {
        item.addEventListener("click", function () {
            isChosenSize = true;
            canNext = isChosenSize ? true : false;
            arrowForward.style.color = "#333";
            for (let i = 0; i < sizeItems.length; i++) {
                sizeItems[i].classList.remove("item-active");
            }
            this.classList.add("item-active");
            let size = +this.dataset.size;
            createContent(size);
            console.log(isChosenSize);
        });
    });
    colorItem.forEach((item) => {
        item.addEventListener("click", function () {
            isChosenColor = true;
            canNext = isChosenColor ? true : false;
            arrowForward.style.color = "#333";
            for (let i = 0; i < colorItem.length; i++) {
                colorItem[i].classList.remove("item-active");
            }
            this.classList.add("item-active");

            chocoContent.style.backgroundColor = this.dataset.boxcolor;
            chocoContent.style.border = "1px solid black";
        });
    });

    arrowForward.addEventListener("click", () => {
        arrowForward.style.color = canNext ? "#333" : "#999";
        if (canNext) {
            curStep += 1;
            customizeStep.style.left = `calc(-100% * ${curStep})`;
            arrowBack.style.visibility = "visible";
            if (isChosenSize && isChosenColor) {
                canNext = true;
            } else {
                canNext = false;
                arrowForward.style.color = "#999";
            }
        }

        if (curStep === 2) {
            arrowForward.style.visibility = "hidden";
        }
    });

    arrowBack.addEventListener("click", () => {
        curStep -= 1;
        customizeStep.style.left = `calc(-100% * ${curStep})`;
        arrowBack.style.visibility = "visible";
        arrowForward.style.visibility = "visible";
        if (curStep === 0) {
            arrowBack.style.visibility = "hidden";
        }
    });

    chocoCategorys.forEach(function (category) {
        category.addEventListener("click", function () {
            this.nextElementSibling.style.display = "flex";
        });
    });

    dragSource.forEach((dragel) => {
        dragel.addEventListener("dragstart", function (e) {
            dragTemp = e.target.cloneNode(true);
        });
    });

    let curEmpty = 0;
    dragSource.forEach((dragel) => {
        // Mobile
        dragel.addEventListener("click", function (e) {
            check();
            if (boxchocos.length <= dropTarget.length - 1) {
                dropTarget[curEmpty].appendChild(this.cloneNode(true));
            }
            dropTarget[curEmpty].classList.remove("cur-empty");
            if (curEmpty < dropTarget.length - 1) {
                curEmpty++;
                console.log(curEmpty);
                dropTarget[curEmpty].classList.add("cur-empty");
            }
        });
    });

    dropTarget.forEach(function (dropt) {
        dropt.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        dropt.addEventListener("drop", (e) => {
            if (dragTemp) {
                if (e.target === e.currentTarget) {
                    e.target.appendChild(dragTemp);
                    if (e.target === dropTarget[curEmpty]) {
                        dropTarget[curEmpty].classList.remove("cur-empty");
                        curEmpty++;
                        if (curEmpty < dropTarget.length) {
                            dropTarget[curEmpty].classList.add("cur-empty");
                        }
                    }
                }
            }
            check();
        });
        dropt.addEventListener("dragenter", (e) => {
            e.preventDefault();
            console.log("enter!!!");
        });
    });

    function createContent(size) {
        chocoContent.innerHTML = ``;
        for (let i = 1; i <= size ** 2; i++) {
            chocoContent.innerHTML += `
            <div class="dropbox" draggable="false"></div>
        `;
        }
        const dropboxs = document.querySelectorAll(".dropbox");
        dropboxs.forEach(function (dropbox) {
            dropbox.style.width = `calc(100% / ${size} - 10px)`;
            dropbox.style.height = `calc(100% / ${size} - 7.5px)`;
        });
    }

    function check() {
        dragTemp = null;
        boxchocos = document.querySelectorAll(".dropbox .choco-img");
        console.log(boxchocos.length);
        boxchocos.forEach((boxchoco) => {
            sum += +boxchoco.dataset.price;
        });

        boxchocos.forEach((bc) => {
            bc.addEventListener("dragstart", (e) => {
                /*  console.log("click"); */
                dragTemp = e.target;
            });
        });
    }
});

// sc.js
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
