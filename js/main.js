/*
  Simple HTML include system
  Loads external HTML components into elements with data-include attribute

  Usage:
  <div data-include="header.html"></div>
*/

document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");

  // Cache prevents the same HTML file from being fetched more than once.
  const cache = new Map();

  try {
    await Promise.all(
      [...includes].map(async (el) => {
        const file = el.getAttribute("data-include");

        try {
          // Use cached HTML if this file has already been fetched.
          if (!cache.has(file)) {
            const response = await fetch(file);

            // Check if the file loaded correctly.
            if (!response.ok) {
              throw new Error(`Could not load ${file}`);
            }

            const content = await response.text();
            cache.set(file, content);
          }

          // Insert the cached HTML into the element.
          el.innerHTML = cache.get(file);
        } catch (error) {
          console.error("Include error:", error);
          el.innerHTML = "<!-- Component failed to load -->";
        }
      }),
    );

    // Update the copyright year after all components are loaded.
    const yearEl = document.getElementById("copyright-year");

    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Run navigation highlighting only once after all includes are loaded.
    setActiveNavLink();
  } catch (error) {
    console.error("Include system error:", error);
  }
});

/* =========================
   ACTIVE NAV LINK
========================= */

// Highlights the nav link that matches the current page.
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(function (link) {
    const href = link.getAttribute("href");

    // Ignore links without an href.
    if (!href) {
      return;
    }

    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/*
  NOTE:
  The former ".role-item" hover-highlight block has been removed.
  No page uses that class. The actual cards use ".role-card",
  which already has the required hover effect in CSS.
*/
