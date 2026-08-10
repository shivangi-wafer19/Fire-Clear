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
  var slides = slider.querySelectorAll(".slide");
  var dots = slider.querySelectorAll(".slider-dot");
  var current = 0;
  var intervalId = null;
  var intervalMs = 4000; // 4 seconds, matches this comment and the code below

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
      var next = (current + 1) % slides.length;
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
   Card Animation on Scroll
========================================== */

const cards = document.querySelectorAll(".work-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.3,
  },
);

cards.forEach((card) => {
  observer.observe(card);
});

/* ==========================================
   Fade Cards on Scroll
========================================== */

const serviceCards = document.querySelectorAll(".service-card");

const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-card");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

serviceCards.forEach((card) => {
  serviceObserver.observe(card);
});

/* ==========================================
   Page 2
========================================== */

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
    var item = header.parentElement;

    // Toggle active class (open/close)
    item.classList.toggle("active");
    var isOpen = item.classList.contains("active");
    header.setAttribute("aria-expanded", isOpen ? "true" : "false");

    // Change + to -
    var icon = header.querySelector(".toggle-icon");

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
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      toggleAccordion();
    }
  });
});

/*
=========================================
How We Work Section //
STEP HOVER EFFECT
=========================================

What this does:
- Adds a small highlight when user hovers on a step
- Purely visual (no functionality change)

Where used:
- .step-item elements
*/

var steps = document.querySelectorAll(".step-item");

steps.forEach(function (step) {
  step.addEventListener("mouseenter", function () {
    step.style.transform = "translateY(-5px)";
  });

  step.addEventListener("mouseleave", function () {
    step.style.transform = "translateY(0)";
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
  var left = document.querySelector(".value-left");
  var right = document.querySelector(".value-right");

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
Hero Section //
HERO FADE-IN EFFECT
=========================================

What this does:
- Content fades in smoothly on page load
- Keeps UI clean and professional

Where used:
- .hero-content
*/

window.addEventListener("load", function () {
  const hero = document.querySelector(".hero-content");

  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(20px)";

    setTimeout(function () {
      hero.style.transition = "all .6s ease";
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 100);
  }
});

/*
=========================================
LEFT-RIGHT FADE IN
=========================================

What this does:
- Left side comes slightly from left
- Right side comes slightly from right
- Keeps animation subtle and professional

Where used:
- .intro-left
- .intro-right
*/

window.addEventListener("load", function () {
  var left = document.querySelector(".intro-left");
  var right = document.querySelector(".intro-right");

  if (!left || !right) return;

  left.style.opacity = "0";
  right.style.opacity = "0";

  left.style.transform = "translateX(-30px)";
  right.style.transform = "translateX(30px)";

  setTimeout(function () {
    left.style.transition = "all 0.5s ease";
    right.style.transition = "all 0.5s ease";

    left.style.opacity = "1";
    right.style.opacity = "1";

    left.style.transform = "translateX(0)";
    right.style.transform = "translateX(0)";
  }, 100);
});

/*
=========================================
SECTION ANIMATION
=========================================

What this does:
- Image slides from left
- Text slides from right
- Smooth professional effect

Where used:
- .principle-image-box
- .principle-text-box
*/

window.addEventListener("load", function () {
  var img = document.querySelector(".principle-image-box");
  var text = document.querySelector(".principle-text-box");

  if (!img || !text) return;

  img.style.opacity = "0";
  text.style.opacity = "0";

  img.style.transform = "translateX(-40px)";
  text.style.transform = "translateX(40px)";

  setTimeout(function () {
    img.style.transition = "all 0.5s ease";
    text.style.transition = "all 0.5s ease";

    img.style.opacity = "1";
    text.style.opacity = "1";

    img.style.transform = "translateX(0)";
    text.style.transform = "translateX(0)";
  }, 100);
});

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
- Each section fades in when visible
- Keeps UI smooth & modern

Where used:
- .pblock-section
*/

window.addEventListener("scroll", function () {
  var blocks = document.querySelectorAll(".pblock-section");

  blocks.forEach(function (block) {
    var position = block.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {
      block.style.opacity = "1";
      block.style.transform = "translateY(0)";
      block.style.transition = "all 0.5s ease";
    }
  });
});

/* initial state */
document.querySelectorAll(".pblock-section").forEach(function (block) {
  block.style.opacity = "0";
  block.style.transform = "translateY(40px)";
});

/* ==========================================
   Page 4 Animations
========================================== */

window.addEventListener("load", function () {
  /* Hero & Intro */

  document
    .querySelectorAll(".hero-section, .intro-section")
    .forEach(function (section) {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "all .6s ease";

      setTimeout(function () {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }, 150);
    });

  /* Overview */

  var overview = document.querySelector(".overview-content");

  if (overview) {
    overview.style.opacity = "0";
    overview.style.transform = "translateY(30px)";
    overview.style.transition = "all .6s ease";

    setTimeout(function () {
      overview.style.opacity = "1";
      overview.style.transform = "translateY(0)";
    }, 250);
  }
});

/* ==========================================
   Shared Scroll Animation
========================================== */

const animatedItems = document.querySelectorAll(
  ".animate-up, .animate-left, .animate-right",
);

if (animatedItems.length > 0) {
  const animationObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          animationObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  animatedItems.forEach(function (item) {
    animationObserver.observe(item);
  });
}

/* ======================================
   Recommendation Accordion
====================================== */

const recommendationItems = document.querySelectorAll(".recommendation-item");

recommendationItems.forEach(function (item) {
  item.addEventListener("click", function () {
    this.classList.toggle("active");
    this.setAttribute("aria-expanded", this.classList.contains("active") ? "true" : "false");
  });
  item.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
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
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      this.click();
    }
  });
});
