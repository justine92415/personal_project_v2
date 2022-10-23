window.addEventListener("load", function () {
    console.log("hihi");

    /* ***Banner*** */
    const sliderImgList = document.querySelector(".slider-imglist");
    const sliderImgItem = document.querySelectorAll(".slider-imgitem");
    const dotGroup = document.querySelector(".dot-group");
    let dots;
    let curImg = 1;

    createDots();
    /* let autoPlay = setInterval(() => {
        autoSlider();
    }, 3000); */

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function (e) {
            console.log("click");
            clearDotActive();
            clearInterval(autoPlay);
            curImg = index + 1;
            e.target.classList.add("dot-active");
            sliderImgList.style.left = `${-index * 100}%`;
            autoPlay = setInterval(() => {
                autoSlider();
            }, 3000);
        });
    });

    function autoSlider() {
        clearDotActive();
        dots[curImg].classList.add("dot-active");
        console.log(curImg);

        sliderImgList.style.left = `${-curImg * 100}%`;
        curImg++;
        if (curImg === sliderImgItem.length) {
            curImg = 0;
        }
    }

    function createDots() {
        for (let i = 0; i < sliderImgItem.length; i++) {
            if (!i) {
                dotGroup.innerHTML += ` <li class="dot dot-active"></li>`;
            } else {
                dotGroup.innerHTML += ` <li class="dot "></li>`;
            }
        }

        dots = document.querySelectorAll(".dot");
    }

    function clearDotActive() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("dot-active");
        }
    }
});
