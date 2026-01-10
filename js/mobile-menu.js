// Mobile Menu Toggle
(function () {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuToggle || !mobileMenu) return;

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    const newState = !isExpanded;

    menuToggle.setAttribute("aria-expanded", newState);
    mobileMenu.setAttribute("aria-hidden", !newState);

    // Prevent body scroll when menu is open
    if (newState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Toggle menu on button click
  menuToggle.addEventListener("click", toggleMenu);

  // Close menu when clicking on a link
  const menuLinks = mobileMenu.querySelectorAll(".mobile-menu-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Small delay to allow navigation
      setTimeout(closeMenu, 100);
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });
})();
