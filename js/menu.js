const btnMenu = document.querySelector(".btn-menu");
const menuContent = document.querySelector(".menu-content");
const iconMenu = document.querySelector(".icon-menu");
const iconClose = document.querySelector(".icon-close");
btnMenu.addEventListener("click", () => {
    menuContent.classList.toggle("menu-content--active");
    iconMenu.classList.toggle("icon-active");
    iconClose.classList.toggle("icon-active");
});
