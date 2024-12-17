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

// 랜덤이미지, 숫자 만들어주는 배열
function generateRandomImageData(count) {
	const imageDataArray = [];

	for (let i = 0; i < count; i++) {
		const randomNumber = Math.floor(Math.random() * 1000);
		const isMultiple = Math.random() < 0.5;
		imageDataArray.push({
			imageUrl: getRandomImageURL(),
			isMultiple: isMultiple,
			comments: randomNumber,
		});
	}
	return imageDataArray;
}

function getRandomImageURL() {
	const randomId = Math.floor(Math.random() * 1000); // 0~999의 랜덤 ID
	return `https://picsum.photos/id/${randomId}/300/300`;
}

