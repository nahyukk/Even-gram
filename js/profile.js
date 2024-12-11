document.addEventListener("DOMContentLoaded", () => {
	toggleNavContainer();
	renderRightSidebar();
	fetchUser();
});

window.addEventListener("resize", () => {
	toggleNavContainer();
});

/* 우측 사이드바 */
function renderRightSidebar() {
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
}

function fetchUser() {
	fetch("../json/profile.json")
		.then((response) => {
			if (!response.ok) {
				console.log("error");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
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
	console.log(profileImage);
	document.querySelector(".nav__profile-name").textContent = user.nickName;
	document.querySelector(".profile__image").src = profileImage;
	document.querySelector(".profile__name").textContent = user.nickName;
	document.querySelector("#profile__post-info-posts").textContent =
		"게시물 " + user.post.posts.length;
	document.querySelector("#profile__post-info-followers").textContent =
		"팔로워 " + user.follower;
	document.querySelector("#profile__post-info-following").textContent =
		"팔로잉 " + user.following;
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
	const multipleIcon = document.createElement("img");
	multipleIcon.className = "profile__post_image-multiple";
	multipleIcon.src = "./assets/icons/profile_post_multiple.png";
	multipleIcon.alt = "post_image_multiple";

	return multipleIcon;
}

function createHoverContainer(post) {
	const hoverContainer = document.createElement("div");
	hoverContainer.className = "profile__post-hover-container";

	const hoverItem = document.createElement("div");
	hoverItem.className = "profile__post-hover-item";

	hoverItem.appendChild(
		createHoverItem("./assets/icons/profile_post_like.png", post.likes)
	);
	hoverItem.appendChild(
		createHoverItem("./assets/icons/profile_post_comment.png", post.comments)
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
