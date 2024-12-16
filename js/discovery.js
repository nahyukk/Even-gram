document.addEventListener("DOMContentLoaded", () => {
	renderHTML("right-side-bar", "./components/sidebar.html");
	renderHTML("footer-container", "./components/footer.html");
});

function renderHTML(id, html) {
	const sidebarContainer = document.getElementById(id);

	fetch(html)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to load ${html}`);
			}
			return response.text();
		})
		.then((html) => {
			sidebarContainer.innerHTML = html;
		})
		.catch((error) => {
			console.error("Error loading sidebar:", error);
		});
}
