"use strict";

const menuButton = document.querySelector("[data-menu-open]");
const siteMenu = document.querySelector("#site-menu");
let menuDestination;

menuButton.hidden = false;

menuButton.addEventListener("click", () => {
    siteMenu.inert = false;
    siteMenu.showModal();
    menuButton.setAttribute("aria-expanded", "true");
});

siteMenu.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    menuDestination = document.getElementById(link.hash.slice(1));

    if (menuDestination) siteMenu.close();
});

siteMenu.addEventListener("close", () => {
    siteMenu.inert = true;
    menuButton.setAttribute("aria-expanded", "false");
    (menuDestination ?? menuButton).focus({ preventScroll: true });
    menuDestination = null;
});

const bookingDialog = document.querySelector("#booking-dialog");
const selectedTour = bookingDialog.querySelector("[data-selected-tour]");
let bookingTrigger;

document.querySelectorAll("[data-book-tour]").forEach((button) => {
    button.addEventListener("click", () => {
        const tour = button.closest(".tour-card");
        bookingTrigger = button;
        selectedTour.textContent = tour.querySelector(".tour-card__title").textContent.trim();
        bookingDialog.showModal();
    });
});

bookingDialog.addEventListener("close", () => {
    bookingTrigger?.focus({ preventScroll: true });
    bookingTrigger = null;
});
