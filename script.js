/**
 * ==========================================================================
 * SHIVAM SHANU - MODERN PORTFOLIO INTERACTION SUITE
 * Dynamic Typewriter, Skill Category Filters, Modern Contact Form & Controls
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Elements
  const themeToggle = document.getElementById("themeToggle");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuDrawer = document.getElementById("menuDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const drawerLinks = document.querySelectorAll(".drawer-link");
  const backToTopBtn = document.getElementById("backToTopBtn");
  const body = document.body;

  // 2. Theme Management (Dark / Light)
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  body.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
    });
  }

  // 3. Dynamic Typewriter Effect in Hero Section
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
    const roles = [
      "Computer Science Student",
      "Aspiring Software Developer",
      "B.Tech CSE (IoT) • MAKAUT",
      "Creative Web Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 85;
    const deletingSpeed = 45;
    const pauseTime = 1800;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }

    typeLoop();
  }

  // 4. Slide-Out Hamburger Drawer Navigation (All Sections)
  function openDrawer() {
    if (menuDrawer && drawerBackdrop) {
      menuDrawer.classList.add("open");
      drawerBackdrop.classList.add("active");
      body.classList.add("drawer-open");
      if (hamburgerBtn) {
        const icon = hamburgerBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        }
      }
    }
  }

  function closeDrawer() {
    if (menuDrawer && drawerBackdrop) {
      menuDrawer.classList.remove("open");
      drawerBackdrop.classList.remove("active");
      body.classList.remove("drawer-open");
      if (hamburgerBtn) {
        const icon = hamburgerBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      if (menuDrawer && menuDrawer.classList.contains("open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
    }
  });

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
      }
    });
  });

  // 5. ScrollSpy & Back to Top
  const sections = document.querySelectorAll("section[id]");

  function handleScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 110;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });

        drawerLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Back to top button
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 6. Smooth Scroll for Anchor Links (With Fixed Header Offset)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 7. Skills Category Filter Tabs
  const catTabs = document.querySelectorAll(".cat-tab");
  const skillCards = document.querySelectorAll(".modern-skill-card");

  catTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      catTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      skillCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.animation = "fadeInCard 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 8. Interactive Quick Contact Form
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;

      // Simulated clean response
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Message Sent!</span>`;
        formFeedback.className = "form-feedback-message success";
        formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been received. I will reply soon.`;

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          formFeedback.style.display = "none";
        }, 5000);
      }, 1000);
    });
  }
});
