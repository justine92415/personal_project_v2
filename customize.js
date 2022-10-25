import { sc } from "../shoppingCart.js";
window.addEventListener("load", function () {
    sc.checkAndUpdateQuantity();
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

    const dragSource = document.querySelectorAll(".choco-img");
    let dropTarget;
    let boxchocos;
    let sum = 0;
    let dragTemp;
    let curEmpty;
    let emptyArr = [];

    let chocoContentCover;
    let chocoContentCard;

    const chocoRows = document.querySelectorAll(".choco-row");

    const showCurNum = document.querySelector(".show-curNum");

    const total = document.querySelectorAll(".customize-total");
    const lave = document.querySelector(".customize-lave");

    const msgArea = document.querySelector(".msgarea");
    const toCartBtn = document.querySelector(".customize-tocart");
    const resetBtn = document.querySelector(".customize-reset");

    const result = document.querySelector(".customize-result");

    arrowBack.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
    });

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
            chocoContentCover.style.backgroundColor = this.dataset.boxcolor;
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
            chocoCategorys.forEach(function (category, index) {
                for (let i = 0; i < chocoRows.length; i++) {
                    chocoRows[i].style.display = "flex";
                }
            });
        } else {
            for (let i = 0; i < chocoRows.length; i++) {
                chocoRows[i].style.display = "none";
            }
        }
        console.log(curStep);
        if (curStep === 3) {
            arrowForward.style.visibility = "hidden";
            result.style.display = "block";
        }
        if (curStep === 2) {
            chocoContent.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        } else {
            arrowBack.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
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

        if (isChosenSize) {
            canNext = true;
            arrowForward.style.color = "#333";
        }

        if (curStep === 2) {
            chocoCategorys.forEach(function (category, index) {
                for (let i = 0; i < chocoRows.length; i++) {
                    chocoRows[i].style.display = "flex";
                }
            });
            result.style.display = "none";
        } else {
            for (let i = 0; i < chocoRows.length; i++) {
                chocoRows[i].style.display = "none";
            }
        }
        if (curStep === 2) {
            chocoContent.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        } else {
            arrowBack.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    });

    dragSource.forEach((dragel) => {
        dragel.addEventListener("dragstart", function (e) {
            dragTemp = e.target.cloneNode(true);
            curEmpty = emptyArr.filter((emp) => {
                return emp.children.length === 0;
            });
            console.log(curEmpty);
            curEmpty.forEach((ce) => {
                ce.classList.add("cur-empty");
            });
        });

        dragel.addEventListener("dragend", function (e) {
            curEmpty.forEach((ce) => {
                ce.classList.remove("cur-empty");
            });
        });
    });

    // Mobile
    dragSource.forEach((dragel) => {
        dragel.addEventListener("click", function (e) {
            curEmpty = emptyArr.filter((emp) => {
                return emp.children.length === 0;
            });
            let emptyNum = curEmpty.length === 0 ? 0 : curEmpty.length - 1;
            console.log(curEmpty);
            let uunum = 0;
            if (uunum < curEmpty.length) {
                curEmpty[uunum].appendChild(this.cloneNode(true));
                uunum++;
            }
            check();
            showCurrentNum(emptyNum);
            console.log(emptyNum);
            if (!emptyNum) {
                arrowBack.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                });
            }
        });
    });

    toCartBtn.addEventListener("click", function () {
        if (window.innerWidth < 1200) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
        console.log(window.innerWidth);
        chocoContentCard.children[0].innerText = msgArea.value;
        msgArea.value = "";
        chocoContentCard.style.bottom = "50%";

        let productObj = {
            id: "27customize",
            name: "客製化禮盒",
            price: `${sum}`,
            quantity: "1",
            image: "news_shop.png",
        };
        let strObj = JSON.stringify(productObj);
        localStorage.setItem(`27customize`, strObj);
        sc.checkAndUpdateQuantity();

        setTimeout(() => {
            this.parentNode.innerHTML = `<p>已加入購物車，感謝購買，前往<a href="shopingCart.html">購物車</a></p>`;
            chocoContentCover.style.width = "100%";
        }, 1000);
        arrowBack.style.visibility = "hidden";
        arrowForward.style.visibility = "hidden";
        resetBtn.style.display = "none";
        this.style.display = "none";
        console.log(this.parentNode);
    });

    resetBtn.addEventListener("click", () => {
        dropTarget.forEach((dropt) => {
            let [droptChildren] = dropt.children;
            if (dropt.children.length) {
                console.log("tese");
                dropt.removeChild(droptChildren);
                sum = 0;
                updatePrice();
            }
        });
    });

    function createContent(size) {
        chocoContent.innerHTML = `
        <div class="cbox-cover">
            <div class="cbox-logo">
                <img src="./assets/LOGO.png" alt="">
            </div>
        </div>
        <div class="cbox-card">
            <p></p>
        </div>`;
        for (let i = 1; i <= size ** 2; i++) {
            chocoContent.innerHTML += `
            <div class="dropbox"></div>
        `;
        }
        dropTarget = document.querySelectorAll(".dropbox");
        chocoContentCover = document.querySelector(".cbox .cbox-cover");
        chocoContentCard = document.querySelector(".cbox .cbox-card");
        dropTarget.forEach(function (dropbox) {
            dropbox.style.width = `calc(100% / ${size} - 10px)`;
            dropbox.style.height = `calc(100% / ${size} - 7.5px)`;
        });
        emptyArr = [];
        dropTarget.forEach(function (dropt) {
            emptyArr.push(dropt);
            dropt.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            dropt.addEventListener("drop", (e) => {
                if (dragTemp) {
                    if (e.target === e.currentTarget) {
                        e.target.appendChild(dragTemp);
                    }
                }
                curEmpty.forEach((ce) => {
                    ce.classList.remove("cur-empty");
                });
                check();
                updatePrice();
            });
            dropt.addEventListener("dragenter", (e) => {
                e.preventDefault();
            });
        });
    }

    function check() {
        boxchocos = document.querySelectorAll(".dropbox .choco-img");
        dragTemp = null;
        sum = 0;
        boxchocos.forEach((boxchoco) => {
            sum += +boxchoco.dataset.price;
        });
        boxchocos.forEach((bc) => {
            bc.addEventListener("dragstart", (e) => {
                dragTemp = e.target;
            });

            bc.addEventListener("dragleave", function (e) {
                if (dragTemp.parentNode) {
                    dragTemp.parentNode.removeChild(dragTemp);
                    boxchocos = document.querySelectorAll(
                        ".dropbox .choco-img"
                    );
                    sum = 0;
                    boxchocos.forEach((boxchoco) => {
                        console.log(boxchoco);
                        sum += +boxchoco.dataset.price;
                    });
                    updatePrice();
                }
            });
        });
    }

    function showCurrentNum(emptyNum) {
        showCurNum.style.opacity = 1;
        setTimeout(function () {
            showCurNum.style.opacity = 0;
        }, 1000);
        updatePrice();
        lave.innerHTML = `剩餘:${emptyNum}格`;
    }

    function updatePrice() {
        for (let i = 0; i < total.length; i++) {
            total[i].innerHTML = ` 總計:NT.${sum}元`;
        }
    }
});
