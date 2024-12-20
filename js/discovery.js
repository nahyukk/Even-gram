import { loadButtonActions } from "./sidebar.js";
import { toggleDarkModeHandler } from "./sidebar.js";

document.addEventListener("DOMContentLoaded", () => {
	renderHTML("right-side-bar", "components/sidebar.html");
	renderHTML("footer-container", "components/footer.html");
	const randomImage = generateRandomImageData(15);
	renderPosts(randomImage);
	createScrollOberver();
});

if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
	window.scrollTo(0, 0);
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
			if (id === "right-side-bar") {
				loadButtonActions();
				toggleDarkModeHandler();
			}
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
		const imageUrl =
			(i + 1) % 10 === 3 || (i + 1) % 10 === 6
				? getRandomImageURL(600)
				: getRandomImageURL(300);
		imageDataArray.push({
			imageUrl: imageUrl,
			isMultiple: isMultiple,
			comments: randomNumber,
		});
	}
	return imageDataArray;
}

function getRandomImageURL(height) {
	const randomId = Math.floor(Math.random() * 1000); // 0~999의 랜덤 ID
	return `https://picsum.photos/id/${randomId}/300/${height}`;
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
	// 컨테이너 선택
	const container = document.createElement("div");
	container.className = "post_image-multiple";

	// SVG 요소 생성
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("fill", "currentColor");
	svg.setAttribute("height", "20");
	svg.setAttribute("width", "20");
	svg.setAttribute("role", "img");
	svg.setAttribute("viewBox", "0 0 48 48");

	// Path 요소 추가
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute(
		"d",
		"M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"
	);
	svg.appendChild(path);

	// 컨테이너에 추가
	container.appendChild(svg);
	return container;
}

// 호버 아이템
function createHoverContainer(post) {
	const hoverContainer = document.createElement("div");
	hoverContainer.className = "post-hover-container";

	const hoverItem = document.createElement("div");
	hoverItem.className = "post-hover-item";
	const commentItem = createHoverItem(
		"assets/icons/profile_post_comment.png",
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
