const navbar = document.getElementById("navbar");
const scrollTopButton = document.getElementById("scrollTop");
const preloader = document.getElementById("preloader");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const headerElement = document.querySelector(".site-header");
const isHomePage = document.body.classList.contains("page--home");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getHomeHeaderThreshold() {
  const aboutSection = document.getElementById("about");
  if (aboutSection instanceof HTMLElement) {
    return Math.max(aboutSection.offsetTop - 180, 120);
  }

  const heroSection = document.getElementById("home");
  if (heroSection instanceof HTMLElement) {
    return Math.max(heroSection.offsetHeight - 140, 120);
  }

  return 120;
}

function updateScrollState() {
  const scrolled = window.scrollY > 100;
  navbar?.classList.toggle("scrolled", scrolled);
  scrollTopButton?.classList.toggle("show", scrolled);

  if (!isHomePage) {
    headerElement?.classList.add("is-visible");
    return;
  }

  const shouldRevealHeader = window.scrollY >= getHomeHeaderThreshold();
  headerElement?.classList.toggle("is-visible", shouldRevealHeader);
}

function closeMobileNav() {
  if (navPanel?.classList.contains("is-open")) {
    navPanel.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
}

function setupAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      closeMobileNav();
    });
  });
}

function setupScrollTop() {
  if (!(scrollTopButton instanceof HTMLButtonElement)) {
    return;
  }

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });
}

function setupSectionObserver() {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const links = Array.from(document.querySelectorAll(".navbar-nav .nav-link"));

  if (!sections.length || !links.length) {
    return;
  }

  const syncActiveLink = () => {
    const offset = 120;
    let current = "";

    for (const section of sections) {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.id;
      }
    }

    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", syncActiveLink, { passive: true });
  syncActiveLink();
}

function setupMobileNav() {
  if (!(navToggle instanceof HTMLButtonElement) || !(navPanel instanceof HTMLElement)) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navPanel.classList.toggle("is-open", !expanded);
  });
}

function setupReveals() {
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealItems.length) {
    return;
  }

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupTestimonials() {
  const carousel = document.querySelector("[data-testimonial-carousel]");
  const items = Array.from(document.querySelectorAll("[data-testimonial-item]"));
  const prev = document.querySelector("[data-testimonial-prev]");
  const next = document.querySelector("[data-testimonial-next]");

  if (!(carousel instanceof HTMLElement) || items.length < 2) {
    return;
  }
  if (!(prev instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)) {
    return;
  }

  let current = 0;
  let timer;

  const render = () => {
    items.forEach((item, index) => {
      item.classList.toggle("is-active", index === current);
    });
  };

  const move = (direction) => {
    current = (current + direction + items.length) % items.length;
    render();
  };

  const start = () => {
    if (reduceMotion) {
      return;
    }
    stop();
    timer = window.setInterval(() => move(1), 5000);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  prev.addEventListener("click", () => {
    move(-1);
    start();
  });

  next.addEventListener("click", () => {
    move(1);
    start();
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  render();
  start();
}

function setupCapabilityPreview() {
  const preview = document.querySelector("[data-capability-preview]");
  const previewImage = preview?.querySelector("[data-capability-preview-image]");
  const previewTitle = preview?.querySelector(".capability-preview__caption");
  const closeButtons = Array.from(preview?.querySelectorAll("[data-capability-preview-close]") ?? []);
  const triggers = Array.from(document.querySelectorAll("[data-capability-preview-trigger]"));

  if (!(preview instanceof HTMLElement) || !(previewImage instanceof HTMLImageElement) || !(previewTitle instanceof HTMLElement)) {
    return;
  }
  if (!triggers.length || !closeButtons.length) {
    return;
  }

  let activeTrigger = null;
  let closeTimer = undefined;

  const clearCloseTimer = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = undefined;
    }
  };

  const closePreview = () => {
    if (preview.hidden) {
      return;
    }

    clearCloseTimer();
    preview.classList.remove("is-open");
    preview.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-capability-preview-open");

    closeTimer = window.setTimeout(() => {
      preview.hidden = true;
      previewImage.removeAttribute("src");
      previewImage.alt = "";
      previewTitle.textContent = "";
    }, reduceMotion ? 0 : 220);

    if (activeTrigger instanceof HTMLElement) {
      activeTrigger.focus();
    }
  };

  const openPreview = (trigger) => {
    const src = trigger.dataset.capabilityPreviewSrc;
    if (!src) {
      return;
    }

    clearCloseTimer();
    activeTrigger = trigger;
    previewImage.src = src;
    previewImage.alt = trigger.dataset.capabilityPreviewAlt ?? "";
    previewTitle.textContent = trigger.dataset.capabilityPreviewTitle ?? "";
    preview.hidden = false;
    preview.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-capability-preview-open");

    window.requestAnimationFrame(() => {
      preview.classList.add("is-open");
      const closeButton = preview.querySelector(".capability-preview__close");
      if (closeButton instanceof HTMLButtonElement) {
        closeButton.focus();
      }
    });
  };

  triggers.forEach((trigger) => {
    if (!(trigger instanceof HTMLElement)) {
      return;
    }

    trigger.addEventListener("click", () => openPreview(trigger));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPreview(trigger);
      }
    });
  });

  closeButtons.forEach((button) => {
    if (!(button instanceof HTMLElement)) {
      return;
    }
    button.addEventListener("click", closePreview);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && preview.classList.contains("is-open")) {
      closePreview();
    }
  });
}

function dismissPreloader() {
  if (!preloader) {
    return;
  }

  preloader.classList.add("fade-out");
  window.setTimeout(() => {
    preloader.remove();
  }, reduceMotion ? 0 : 180);
}

if (document.readyState === "complete") {
  window.requestAnimationFrame(dismissPreloader);
} else {
  window.addEventListener("load", () => {
    window.requestAnimationFrame(dismissPreloader);
  }, { once: true });
}

setupAnchorScroll();
setupScrollTop();
setupSectionObserver();
setupMobileNav();
setupReveals();
setupTestimonials();
setupCapabilityPreview();
updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });
