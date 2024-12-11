
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
			renderPosts(data.user.posts);
		})
		.catch((error) => {
			console.log("JSON Fetching Error: ", error);
		});
}

function renderUser(user) {
	const profileImage = getCachedImageURL("profileImage", 1)[0];
	console.log(profileImage);
	document.querySelector(".nav__profile-name").textContent = user.nickName;
	document.querySelector(".profile__image").src = profileImage;
	document.querySelector(".profile__name").textContent = user.nickName;
	document.querySelector("#profile__post-info-posts").textContent =
		"게시물 " + user.posts.length;
	document.querySelector("#profile__post-info-followers").textContent =
		"팔로워 " + user.follower;
	document.querySelector("#profile__post-info-following").textContent =
		"팔로잉 " + user.following;
	document.querySelector(".profile__description-title").textContent =
		user.title;
	document.querySelector(".profile__description-sub-title").textContent =
		user.description;
}

function renderPosts(posts) {
	const postContainer = document.querySelector(
		".profile__post-section-container"
	);

	const cachedPostImages = getCachedImageURL("postImages", posts.length);

	postContainer.innerHTML = ""; // 기존 데이터 초기화
	posts.forEach((post, index) => {
		const postElement = document.createElement("div");
		postElement.className = "profile__post_item-container";

		const postImage = document.createElement("img");
		postImage.className = "profile__post_image";
		postImage.src = cachedPostImages[index];
		postImage.alt = "post_image";

		if (post.image_count > 1) {
			const postImage = document.createElement("img");
			postImage.className = "profile__post_image-multiple";
			postImage.src = "./assets/icons/profile_post_multiple.png";
			postImage.alt = "post_image_multiple";
			postElement.append(postImage);
		}

		const hoverContainer = document.createElement("div");
		hoverContainer.className = "profile__post-hover-container";

		const hoverItem = document.createElement("div");
		hoverItem.className = "profile__post-hover-item";

		const likeIcon = document.createElement("img");
		likeIcon.src = "./assets/icons/profile_post_like.png";
		const likeSpan = document.createElement("span");
		likeSpan.textContent = post.likes;

		const commentIcon = document.createElement("img");
		commentIcon.src = "./assets/icons/profile_post_comment.png";
		const commentSpan = document.createElement("span");
		commentSpan.textContent = post.comments;

		hoverItem.appendChild(likeIcon);
		hoverItem.appendChild(likeSpan);
		hoverItem.appendChild(commentIcon);
		hoverItem.appendChild(commentSpan);

		hoverContainer.appendChild(hoverItem);

		postElement.append(postImage);
		postElement.append(hoverContainer);

		postContainer.appendChild(postElement);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	fetchUser();
});

/* 프로필 탭 클릭 */

/*
	버튼 3개 중 클릭한 버튼 외에는 inactive
	renderPosts를 새로 가져와야 함
	 -> json 수정 필요?
	버튼 하나 릴스 -> 저장됨으로 바꾸기.. 아이콘도 ㅠ
*/

const tabContainer = document.querySelectorAll(
	".profile__tab-button-container"
);

// 초기값 지정
tabContainer.forEach((tab, index) => {
	if (index === 0) {
		tab.classList.add("active");
	} else {
		tab.classList.remove("active");
	}
});

tabContainer.forEach((tab) => {
	tab.addEventListener("click", () => {
		console.log(tab);
		tabContainer.forEach((tab) => tab.classList.remove("active"));
		tab.classList.add("active");
	});
});