let dragSource = document.querySelectorAll(".choco-img");
let chocoItem = document.querySelector(".dropbox");

let dragTemp;
let total = document.querySelector(".customize-total");
let sum = 0;

let boxchocos;

let customizeReset = document.querySelector(".customize-reset");

total.innerHTML = `總計:${sum}元`;

dragSource.forEach((dragel) => {
    /* dragel.addEventListener("click", function (e) {
        // console.log(e.target);
        console.log("click");
    }); */
    dragel.addEventListener("dragstart", function (e) {
        // console.log(e.target);
        dragTemp = e.target.cloneNode(true);
        // console.log(dragTemp);
    });
});
dragSource.forEach((dragel) => {
    /* dragel.addEventListener("click", function (e) {
        // console.log(e.target);
        console.log("click");
    }); */
    dragel.addEventListener("touchstart", function (e) {
        // console.log(e.target);
        console.log("touchmove");
        dragTemp = e.target.cloneNode(true);
        // console.log(dragTemp);
    });
});

/* let dropTarget = document.querySelector(".customize-item");

dropTarget.addEventListener("dragover", (e) => {
    e.preventDefault();
});

dropTarget.addEventListener("drop", (e) => {
    console.log("dropped");
    if (dragTemp) {
        // e.target.appendChild(dragTemp);
        e.target.appendChild(dragTemp);
    }
}); */

let dropTarget = document.querySelectorAll(".dropbox");

// console.log(dropTarget);

dropTarget.forEach(function (dropt) {
    dropt.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    dropt.addEventListener("drop", (e) => {
        // console.log("droped");
        if (dragTemp) {
            // console.log(+dragTemp.dataset.price);
            if (e.target === e.currentTarget) {
                e.target.appendChild(dragTemp);
            }
        }
        check();
        total.innerHTML = `總計:${sum}元`;
    });
    dropt.addEventListener("dragenter", (e) => {
        e.preventDefault();
        console.log("enter!!!");
    });
});

function check() {
    /* console.log("test"); */
    sum = 0;
    dragTemp = null;
    /* console.log(dragTemp); */
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

customizeReset.addEventListener("click", () => {
    if (boxchocos) {
        dropTarget.forEach((dropt) => {
            let [droptChildren] = dropt.children;
            if (dropt.children.length) {
                console.log("tese");
                dropt.removeChild(droptChildren);
                sum = 0;
                total.innerHTML = `總計:${sum}元`;
            }
        });
    }
});
