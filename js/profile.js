import { loadButtonActions } from "./sidebar.js";
import { toggleDarkModeHandler } from "./sidebar.js";

document.addEventListener("DOMContentLoaded", () => {
	toggleNavContainer();
	renderHTML("right-side-bar", "components/sidebar.html");
	renderHTML("footer-container", "components/footer.html");
	fetchUser();
});

window.addEventListener("resize", () => {
	toggleNavContainer();
});

function renderHTML(id, html) {
	fetch(html)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to load ${html}`);
			}
			return response.text();
		})
		.then((html) => {
			const container = document.getElementById(id);
			console.log(id);
			container.innerHTML = html;

			if (id === "right-side-bar") {
				loadButtonActions();
				toggleDarkModeHandler();
			}
		})
		.catch((error) => {
			console.error("Error loading sidebar:", error);
		});
}

function fetchUser() {
	fetch("json/profile.json")
		.then((response) => {
			if (!response.ok) {
				console.log("error");
			}
			return response.json();
		})
		.then((data) => {
			renderUser(data.user);
			initializeTabs(".profile__tab-button", data.user.post);
		})
		.catch((error) => {
			console.log("JSON Fetching Error: ", error);
		});
}

function initializeTabs(selector, posts, defaultIndex = 0) {
	const tabContainer = document.querySelectorAll(selector);

	// 초기값 지정
	tabContainer.forEach((tab, index) => {
		if (index === defaultIndex) {
			tab.classList.add("active");
			const filteredPosts = getFilteredPosts(posts, "posts");
			renderPosts(filteredPosts, "posts");
		} else {
			tab.classList.remove("active");
		}
	});

	tabContainer.forEach((tab) => {
		tab.addEventListener("click", (event) => {
			event.preventDefault();
			tabContainer.forEach((t) => t.classList.remove("active"));
			tab.classList.add("active");
			const dataType = tab.getAttribute("data-type");
			const filteredPosts = getFilteredPosts(posts, dataType);
			renderPosts(filteredPosts, dataType);
		});
	});
}

function renderUser(user) {
	const profileImage = getCachedImageURL("profileImage", 1)[0];
	document.querySelector(".nav__profile-name").textContent = user.nickName;
	document.querySelector(".profile__image").src = profileImage;
	document.querySelector(".profile__name").textContent = user.nickName;
	document.querySelector("#post_count").textContent = user.post.posts.length;
	document.querySelector("#follower_count").textContent = user.follower;
	document.querySelector("#following_count").textContent = user.following;
	document.querySelector(".profile__description-title").textContent =
		user.title;
	document.querySelector(".profile__description-sub-title").textContent =
		user.description;
}

function getRandomImageURL() {
	const randomId = Math.floor(Math.random() * 1000); // 0~999의 랜덤 ID
	return `https://picsum.photos/id/${randomId}/300/300`;
}

function getCachedImageURL(key, count) {
	let cachedImages = JSON.parse(localStorage.getItem(key));
	// 캐싱된 이미지가 없거나 개수가 부족하면 새로 생성
	if (!cachedImages || cachedImages.length < count) {
		cachedImages = Array.from({ length: count }, () => getRandomImageURL());
		localStorage.setItem(key, JSON.stringify(cachedImages));
	}
	return cachedImages;
}

function getFilteredPosts(postlist, type) {
	if (!postlist || !postlist[type]) {
		return [];
	}
	return postlist[type];
}

function renderPosts(posts, type) {
	const postContainer = document.querySelector(
		".profile__post-section-container"
	);
	const insertedDescripotion = document.querySelector(
		".profile__post-saved_description"
	);
	const cachedPostImages = getCachedImageURL(`${type}Images`, posts.length);

	postContainer.innerHTML = ""; // 기존 데이터 초기화

	if (type === "saved") {
		renderSavedPosts(
			posts,
			cachedPostImages,
			postContainer,
			insertedDescripotion
		);
	} else {
		renderNormalPosts(
			posts,
			cachedPostImages,
			postContainer,
			insertedDescripotion,
			type
		);
	}
}

function renderSavedPosts(
	posts,
	cachedPostImages,
	postContainer,
	insertedDescription
) {
	if (!insertedDescription) {
		const savedDescription = createSavedDescription();
		postContainer.parentNode.insertBefore(savedDescription, postContainer);
	}
	const savedContainer = createSavedPostContainer(posts, cachedPostImages);
	postContainer.appendChild(savedContainer);
}

function renderNormalPosts(
	posts,
	cachedPostImages,
	postContainer,
	insertedDescription,
	type
) {
	if (insertedDescription) {
		insertedDescription.remove();
	}
	posts.forEach((post, index) => {
		const postElement = createPostElement(post, cachedPostImages[index], type);
		postContainer.appendChild(postElement);
	});
}

function createSavedDescription() {
	const savedDescription = document.createElement("div");
	savedDescription.className = "profile__post-saved_description";

	const infoLabel = document.createElement("span");
	infoLabel.textContent = "저장한 내용은 회원님만 볼 수 있습니다.";
	savedDescription.appendChild(infoLabel);
	return savedDescription;
}

function createPostElement(post, imageUrl, type) {
	const postElement = document.createElement("div");
	postElement.className = "profile__post_item-container";

	const postImage = document.createElement("img");
	postImage.className = "profile__post_image";
	postImage.src = imageUrl;
	postImage.alt = `${type}_image`;

	postElement.appendChild(postImage);

	if (post.image_count > 1) {
		const multipleIcon = createMultipleImageIcon();
		postElement.appendChild(multipleIcon);
	}

	if (type === "posts") {
		const hoverContainer = createHoverContainer(post);
		postElement.appendChild(hoverContainer);
	}

	return postElement;
}

function createMultipleImageIcon() {
	// 컨테이너 선택
	const container = document.createElement("div");
	container.className = "profile__post_image-multiple";

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

function createHoverContainer(post) {
	const hoverContainer = document.createElement("div");
	hoverContainer.className = "profile__post-hover-container";

	const hoverItem = document.createElement("div");
	hoverItem.className = "profile__post-hover-item";

	hoverItem.appendChild(
		createHoverItem("assets/icons/profile_post_like.png", post.likes)
	);
	hoverItem.appendChild(
		createHoverItem("assets/icons/profile_post_comment.png", post.comments)
	);

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

function createSavedPostContainer(posts, cachedPostImages) {
	const savedItemsContainer = document.createElement("div");
	savedItemsContainer.className = "profile__post-section-saved-items-container";

	posts.forEach((post, index) => {
		const postElement = createPostElement(
			post,
			cachedPostImages[index],
			"saved"
		);
		savedItemsContainer.appendChild(postElement);
	});

	const coveredContainer = createSavedCoveredContainer();
	savedItemsContainer.appendChild(coveredContainer);

	return savedItemsContainer;
}

function createSavedCoveredContainer() {
	const coveredContainer = document.createElement("div");
	coveredContainer.className = "profile__post-section-covered-container";

	const allPostsLabel = document.createElement("span");
	allPostsLabel.textContent = "모든 게시물";
	coveredContainer.appendChild(allPostsLabel);

	return coveredContainer;
}

// 상단 네비게이션 미디어쿼리
function toggleNavContainer() {
	const navContainer = document.querySelector(".nav__container");
	if (window.innerWidth <= 574) {
		navContainer.style.display = "flex";
	} else {
		navContainer.style.display = "none";
	}
}
