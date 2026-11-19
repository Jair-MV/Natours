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
const bookingHeading = document.querySelector("#booking");
const bookingForm = bookingHeading.closest("form");
const bookingTour = bookingForm.querySelector("[data-booking-tour]");
const bookingStatus = bookingForm.querySelector("[role='status']");
let bookingTrigger;
let continuingToBooking = false;

document.querySelectorAll("[data-book-tour]").forEach((button) => {
    button.addEventListener("click", () => {
        const tour = button.closest(".tour-card");
        bookingTrigger = button;
        selectedTour.textContent = tour.querySelector(".tour-card__title").textContent.trim();
        bookingDialog.showModal();
    });
});

bookingDialog.querySelector("[data-continue-booking]").addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    bookingTour.textContent = `Selected tour: ${selectedTour.textContent}`;
    bookingTour.hidden = false;
    bookingStatus.textContent = "";
    continuingToBooking = true;
    bookingDialog.close();
});

bookingDialog.addEventListener("close", () => {
    (continuingToBooking ? bookingHeading : bookingTrigger)?.focus({ preventScroll: true });
    bookingTrigger = null;
    continuingToBooking = false;
});

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    bookingStatus.textContent = "Details validated. Nothing was sent and no reservation was made.";
});
bookingForm.addEventListener("input", () => {
    bookingStatus.textContent = "";
});
bookingForm.querySelector("[type='submit']").disabled = false;

const storiesVideo = document.querySelector(".stories__video");
const storiesVideoControl = document.querySelector("[data-stories-video-control]");
const storiesVideoAction = storiesVideoControl.querySelector("[data-stories-video-action]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let storiesVisible = false;
let storiesPlaybackPreference;

function syncStoriesPlayback() {
    const shouldPlay = storiesVisible && (storiesPlaybackPreference ?? !reducedMotion.matches);

    if (shouldPlay) {
        // Browsers may block autoplay; the Play control remains available.
        storiesVideo.play().catch(() => {});
    } else {
        storiesVideo.pause();
    }
}

function updateStoriesVideoControl() {
    storiesVideoAction.textContent = storiesVideo.paused ? "Play" : "Pause";
}

storiesVideoControl.hidden = false;
storiesVideoControl.addEventListener("click", () => {
    storiesPlaybackPreference = storiesVideo.paused;
    syncStoriesPlayback();
});
storiesVideo.addEventListener("play", updateStoriesVideoControl);
storiesVideo.addEventListener("pause", updateStoriesVideoControl);
reducedMotion.addEventListener("change", () => {
    storiesPlaybackPreference = undefined;
    syncStoriesPlayback();
});

const storiesVisibilityObserver = new IntersectionObserver(([entry]) => {
    storiesVisible = entry.isIntersecting;
    syncStoriesPlayback();
});

storiesVisibilityObserver.observe(storiesVideo);
