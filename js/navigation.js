/* ==========================================
   Mobile Navigation Menu
   ------------------------------------------
   The header is injected later by main.js
   (it fetches header.html and drops it in),
   so #menuToggle / #navMenu don't exist yet
   at the moment this file first runs.

   Using event delegation on document.body
   sidesteps that entirely — the listener sits
   on an element that's always there from the
   start, and we just check what was actually
   clicked when the click happens.
========================================== */

document.body.addEventListener("click", function (event) {
  // Hamburger icon clicked — open/close the dropdown
  const toggle = event.target.closest("#menuToggle");

  if (toggle) {
    const menu = document.getElementById("navMenu");
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
    toggle.setAttribute("aria-expanded", menu.classList.contains("active") ? "true" : "false");
    return;
  }

  // A nav link was clicked — close the menu behind it
  const link = event.target.closest("#navMenu a");

  if (link) {
    const menu = document.getElementById("navMenu");
    const menuButton = document.getElementById("menuToggle");
    menu.classList.remove("active");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// Also allow closing the menu with the Escape key for keyboard users
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const menu = document.getElementById("navMenu");
    const menuButton = document.getElementById("menuToggle");
    if (menu && menu.classList.contains("active")) {
      menu.classList.remove("active");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  }
});
