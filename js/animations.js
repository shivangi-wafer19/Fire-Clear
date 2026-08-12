/* ==========================================
   Page 1
========================================== */

/* ==========================================
   Hero / Banner Image Slider
   - simple auto-playing photo slider
   - reusable: any container with class
     "image-slider" holding ".slide" elements
     and ".slider-dot" dots will run the same
     way, so the same code covers every banner
     on the site, not just the home page hero
========================================== */

function startImageSlider(slider) {
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".slider-dot");
  let current = 0;
  let intervalId = null;
  const intervalMs = 4000; // 4 seconds, matches this comment and the code below

  if (slides.length === 0) return;

  // Don't run the slider at all if it's hidden (e.g. display:none on mobile) —
  // no point animating something the user can't see, and it keeps setInterval
  // from running forever in the background.
  if (slider.offsetParent === null) return;

  function showSlide(index) {
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
      dot.classList.remove("active");
      dot.setAttribute("aria-pressed", "false");
    });

    slides[index].classList.add("active");

    if (dots[index]) {
      dots[index].classList.add("active");
      dots[index].setAttribute("aria-pressed", "true");
    }

    current = index;
  }

  function startAutoAdvance() {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(function () {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }, intervalMs);
  }

  // clicking (or activating via keyboard) a dot jumps straight to that photo
  // and resets the auto-advance timer so it doesn't fire again immediately
  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showSlide(index);
      startAutoAdvance();
    });
  });

  startAutoAdvance();
}

document.querySelectorAll(".image-slider").forEach(function (slider) {
  startImageSlider(slider);
});

/* ==========================================
   Page 2
========================================== */
/* ==========================================
   Shared Scroll Reveal Animation
========================================== */

/*
  Reusable IntersectionObserver helper.

  What this does:
  - Finds elements matching the selector
  - Watches when they enter the viewport
  - Adds the required animation class
  - Can optionally stop observing after the first reveal

  Parameters:
  selector    = Elements to observe
  activeClass = Class added when element becomes visible
  threshold   = How much of element must be visible
  once        = Whether to stop observing after first reveal
*/

function revealOnScroll(selector, activeClass, threshold = 0.2, once = true) {
  const items = document.querySelectorAll(selector);

  // Do nothing if there are no matching elements on this page.
  if (!items.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Add animation class.
          entry.target.classList.add(activeClass);

          // Stop observing after the first reveal if required.
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: threshold,
    },
  );

  // Start observing each matching element.
  items.forEach(function (item) {
    observer.observe(item);
  });
}

/* ==========================================
   Card Animations
========================================== */

// Work cards
revealOnScroll(".work-card", "show", 0.3, false);

// Service cards
revealOnScroll(".service-card", "show-card", 0.2, false);

/* ==========================================
   Shared Page Animations
========================================== */

// General animated elements
revealOnScroll(".animate-up, .animate-left, .animate-right", "show", 0.2, true);
/*
=========================================
ACCORDION FUNCTIONALITY
=========================================

What this does:
- When user clicks a service item
- It expands that item
- If clicked again → it collapses
- Also removes red border when active

Where used:
- Works on elements with class "service-item"
*/

document.querySelectorAll(".service-header").forEach(function (header) {
  function toggleAccordion() {
    // Get parent item
    const item = header.parentElement;

    // Toggle active class (open/close)
    item.classList.toggle("active");
    const isOpen = item.classList.contains("active");

    header.setAttribute("aria-expanded", isOpen ? "true" : "false");

    // Change + to -
    const icon = header.querySelector(".toggle-icon");

    if (isOpen) {
      icon.textContent = "-";
    } else {
      icon.textContent = "+";
    }
  }

  header.addEventListener("click", toggleAccordion);

  // Keyboard support: these headers are role="button" divs, so Enter/Space
  // need to be wired up manually (a real <button> would get this for free).
  header.addEventListener("keydown", function (event) {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "Spacebar"
    ) {
      event.preventDefault();
      toggleAccordion();
    }
  });
});

/*
=========================================
TRIGGERS & OUTCOMES SECTION //
SECTION LOAD ANIMATION
=========================================

What this does:
- When page loads
- Left section slides from left
- Right section slides from right
- Both settle into position smoothly

Where used:
- .value-left
- .value-right
*/

window.addEventListener("load", function () {
  const left = document.querySelector(".value-left");
  const right = document.querySelector(".value-right");

  if (!left || !right) return;

  // Add class after small delay for smooth effect
  setTimeout(function () {
    left.classList.add("show");
    right.classList.add("show");
  }, 100);
});

/* ==========================================
   Page 3
========================================== */

/*
=========================================
NOTE: The former "LEFT TEXT + RIGHT IMAGE ANIMATION" block targeting
.competence-text / .competence-image has been removed. Those classes
never existed in any page's HTML, so the block threw a TypeError on
every single page load.
=========================================
*/

/*
=========================================
SCROLL FADE-IN ANIMATION
=========================================

What this does:
- Each .pblock-section fades in when it enters the viewport
- Uses IntersectionObserver for better performance
- Prevents unnecessary work during scrolling

Where used:
- .pblock-section
*/

const pblockSections = document.querySelectorAll(".pblock-section");

if (pblockSections.length > 0) {
  const pblockObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Add class to start the CSS animation
          entry.target.classList.add("show-pblock");

          // Stop observing after the animation has started
          pblockObserver.unobserve(entry.target);
        }
      });
    },
    {
      // Start animation when 10% of the section is visible
      threshold: 0.1,

      // Keep the same 100px trigger offset as the old code
      rootMargin: "0px 0px -100px 0px",
    },
  );

  // Observe each pblock section
  pblockSections.forEach(function (block) {
    pblockObserver.observe(block);
  });
}

/* ==========================================
   Page 4 Animations
========================================== */

/* ==========================================
   Page Load Animations
========================================== */

function fadeInOnLoad(selector, axis, distance, delay, duration) {
  const elements = document.querySelectorAll(selector);

  if (!elements.length) return;

  elements.forEach(function (element) {
    // Starting position
    element.style.opacity = "0";

    if (axis === "x") {
      element.style.transform = `translateX(${distance}px)`;
    } else {
      element.style.transform = `translateY(${distance}px)`;
    }

    // Start animation
    setTimeout(function () {
      element.style.transition = `all ${duration}s ease`;
      element.style.opacity = "1";
      element.style.transform =
        axis === "x" ? "translateX(0)" : "translateY(0)";
    }, delay);
  });
}

window.addEventListener("load", function () {
  // Hero
  fadeInOnLoad(".hero-content", "y", 20, 100, 0.6);

  // Intro
  fadeInOnLoad(".intro-left", "x", -30, 100, 0.5);
  fadeInOnLoad(".intro-right", "x", 30, 100, 0.5);

  // Principle section
  fadeInOnLoad(".principle-image-box", "x", -40, 100, 0.5);
  fadeInOnLoad(".principle-text-box", "x", 40, 100, 0.5);

  // Page 4 hero and intro
  fadeInOnLoad(".hero-section, .intro-section", "y", 30, 150, 0.6);

  // Overview
  fadeInOnLoad(".overview-content", "y", 30, 250, 0.6);
});

/* ======================================
   Recommendation Accordion
====================================== */

const recommendationItems = document.querySelectorAll(".recommendation-item");

recommendationItems.forEach(function (item) {
  item.addEventListener("click", function () {
    this.classList.toggle("active");

    this.setAttribute(
      "aria-expanded",
      this.classList.contains("active") ? "true" : "false",
    );
  });

  item.addEventListener("keydown", function (event) {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "Spacebar"
    ) {
      event.preventDefault();
      this.click();
    }
  });
});

/* ==========================================
   Governance List Interaction
========================================== */

const governanceItems = document.querySelectorAll(".governance-item");

governanceItems.forEach(function (item) {
  item.addEventListener("click", function () {
    // Remove active class from all items
    governanceItems.forEach(function (card) {
      card.classList.remove("active");
      card.setAttribute("aria-selected", "false");
    });

    // Highlight clicked item
    this.classList.add("active");
    this.setAttribute("aria-selected", "true");
  });

  item.addEventListener("keydown", function (event) {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "Spacebar"
    ) {
      event.preventDefault();
      this.click();
    }
  });
});
