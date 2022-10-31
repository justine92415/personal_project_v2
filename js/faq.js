window.addEventListener("load", function () {
    const orderStep = document.querySelectorAll(".order-step");
    const orderContent = document.querySelectorAll(".order-content");
    const btnOpen = document.querySelectorAll(".btn-open");
    const btnClose = document.querySelectorAll(".btn-close");

    orderStep.forEach((bo, index) => {
        bo.addEventListener("click", () => {
            btnOpen[index].classList.toggle("order-active");
            btnClose[index].classList.toggle("order-active");
            orderContent[index].classList.toggle("order-active");
        });
    });
});
