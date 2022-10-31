let txt1 = document.querySelectorAll(".txt1");
console.log(txt1);

const observer1 = new IntersectionObserver(
    (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log(entry.target);
                // 目標元素進入 viewport 時執行
                console.log("is in");
                for (let i = 0; i < txt1.length; i++) {
                    if (!txt1[i].classList.contains("playani")) {
                        setTimeout(() => {
                            txt1[i].classList += "playani";
                        }, i * 1500);
                    }
                }
            } else {
                // 目標元素離開 viewport 時執行
            }
        });
    },
    {
        root: null,
        rootMargin: "0px",
        threshold: 1,
    }
);

const txtsection1 = document.querySelector(".txtsection1");

observer1.observe(txtsection1);

/* ***************************************** */

let txt2 = document.querySelectorAll(".txt2");
console.log(txt2);

const observer2 = new IntersectionObserver(
    (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log(entry.target);
                // 目標元素進入 viewport 時執行
                console.log("is in");
                for (let i = 0; i < txt2.length; i++) {
                    if (!txt2[i].classList.contains("playani")) {
                        setTimeout(() => {
                            txt2[i].classList += "playani";
                        }, i * 1500);
                    }
                }
            } else {
                // 目標元素離開 viewport 時執行
            }
        });
    },
    {
        root: null,
        rootMargin: "0px",
        threshold: 1,
    }
);

const txtsection2 = document.querySelector(".txtsection2");

observer2.observe(txtsection2);
