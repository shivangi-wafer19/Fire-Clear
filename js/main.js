/*
  Simple HTML include system
  Loads external HTML components into elements with data-include attribute

  Usage:
  <div data-include="components/header.html"></div>
*/

document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");

    try {
      const response = await fetch(file);

      // Check if file loaded correctly
      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }

      const content = await response.text();
      el.innerHTML = content;

      // Keep the footer's copyright year current automatically
      const yearEl = document.getElementById("copyright-year");
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }

      // Once the header (or any include containing nav links) is in
      // the page, mark whichever link matches the current URL as active.
      setActiveNavLink();
    } catch (error) {
      console.error("Include error:", error);
      el.innerHTML = "<!-- Component failed to load -->";
    }
  });
});

/* =========================
   ACTIVE NAV LINK
========================= */
// Highlights the nav link that matches the page currently open.
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(function (link) {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* =========================
   NOTE: The former "ROLE SECTION" hover-highlight block targeting
   .role-item has been removed. No page uses that class — the real
   cards are .role-card on fire-safety-management.html, which already
   has an equivalent :hover effect defined in CSS. This block never ran.
========================= */
