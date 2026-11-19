"use strict";

const menuButton = document.querySelector("[data-menu-open]");
const siteMenu = document.querySelector("#site-menu");

menuButton.hidden = false;

menuButton.addEventListener("click", () => {
    siteMenu.inert = false;
    siteMenu.showModal();
    menuButton.setAttribute("aria-expanded", "true");
});

siteMenu.addEventListener("close", () => {
    siteMenu.inert = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
});
