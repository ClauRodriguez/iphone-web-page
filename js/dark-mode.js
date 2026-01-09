// Dark Mode Toggle
(function () {
  const DARK_MODE_KEY = "darkMode";
  const toggleButton = document.getElementById("dark-mode-toggle");

  // Check localStorage and apply theme
  function initTheme() {
    const savedTheme = localStorage.getItem(DARK_MODE_KEY);
    if (savedTheme === "true") {
      document.body.classList.add("dark-mode");
      updateToggleIcon(true);
    } else {
      document.body.classList.remove("dark-mode");
      updateToggleIcon(false);
    }
  }

  // Update toggle icon
  function updateToggleIcon(isDark) {
    if (!toggleButton) return;
    const icon = toggleButton.querySelector("i");
    if (icon) {
      icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    }
  }

  // Toggle dark mode
  function toggleDarkMode() {
    const isDark = document.body.classList.contains("dark-mode");
    if (isDark) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem(DARK_MODE_KEY, "false");
      updateToggleIcon(false);
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem(DARK_MODE_KEY, "true");
      updateToggleIcon(true);
    }
  }

  // Initialize theme on page load
  initTheme();

  // Add event listener to toggle button
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleDarkMode);
  }
})();
