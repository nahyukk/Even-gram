document.addEventListener("DOMContentLoaded", () => {
	renderHTML("right-side-bar", "./components/sidebar.html");
	renderHTML("footer-container", "./components/footer.html");
	const randomImage = generateRandomImageData(15);
	renderPosts(randomImage);
	createScrollOberver();
});

// 무한스크롤 생성 옵저버
function createScrollOberver() {
	let options = {
		root: null,
		threshold: 0.8,
	};

	const observer = new IntersectionObserver(callback, options);
	const target = document.querySelector(".discovery__post-container");
	observer.observe(target);
}

// 해당 지점 도달시 
const callback = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const randomImage = generateRandomImageData(15);
			renderPosts(randomImage);
		}
	});
  observer.observe(document.querySelector("#footer-container"));
};

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

// 전체 포스트 랜더링
function renderPosts(posts) {
	const postContainer = document.querySelector(".discovery__post-container");
	posts.forEach((post) => {
		const postElement = createPostElement(post);
		postContainer.appendChild(postElement);
	});
}

// 포스트 요소 랜더링
function createPostElement(post) {
	const postElement = document.createElement("div");
	postElement.className = "post_item-container";

	const postImage = document.createElement("img");
	postImage.className = "post_image";
	postImage.src = post.imageUrl;
	postImage.alt = `discover_image`;

	postElement.appendChild(postImage);

	if (post.isMultiple) {
		const multipleIcon = createMultipleImageIcon();
		postElement.appendChild(multipleIcon);
	}

	const hoverContainer = createHoverContainer(post);
	postElement.appendChild(hoverContainer);

	return postElement;
}

// 이미지 여러개일경우 표시
function createMultipleImageIcon() {
	const multipleIcon = document.createElement("img");
	multipleIcon.className = "post_image-multiple";
	multipleIcon.src = "./assets/icons/profile_post_multiple.png";
	multipleIcon.alt = "post_image_multiple";

	return multipleIcon;
}

// 호버 아이템
function createHoverContainer(post) {
	const hoverContainer = document.createElement("div");
	hoverContainer.className = "post-hover-container";

	const hoverItem = document.createElement("div");
	hoverItem.className = "post-hover-item";
	const commentItem = createHoverItem(
		"./assets/icons/profile_post_comment.png",
		post.comments
	);
	hoverItem.appendChild(commentItem);

	hoverContainer.appendChild(hoverItem);
	return hoverContainer;
}

function createHoverItem(iconSrc, textContent) {
	const icon = document.createElement("img");
	icon.src = iconSrc;

	const span = document.createElement("span");
	span.textContent = textContent || 0;

	const container = document.createElement("div");
	container.appendChild(icon);
	container.appendChild(span);

	return container;
}
