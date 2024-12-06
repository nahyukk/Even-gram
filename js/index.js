document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("right-side-bar");

  // sidebar.html 로드
  fetch("./components/sidebar.html")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to load sidebar.html");
          }
          return response.text();
      })
      .then((html) => {
          sidebarContainer.innerHTML = html;
      })
      .catch((error) => {
          console.error("Error loading sidebar:", error);
      });
});