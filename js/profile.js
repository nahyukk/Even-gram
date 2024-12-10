const randomImageURL = "https://picsum.photos/300/300";

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
		});
}

function renderUser(user) {
	document.querySelector(".profile__image").src = randomImageURL;
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
	posts.forEach((post) => {
		const postElement = document.createElement("div");
		postElement.className = "profile__post_item-container";
		postElement.innerHTML = `
      <img
        class="profile__post_image"
        src=${randomImageURL}
        alt="profile_image"
      />
      <div class="profile__post-hover-container">
        <div class="profile__post-hover-item">
          <img src="./assets/icons/profile_post_like.png" />
          <span>${post.likes}</span>
          <img src="./assets/icons/profile_post_comment.png" />
          <span>${post.comments}</span>
        </div>
      </div>
    `;
		postContainer.appendChild(postElement);
	});
}

fetchUser();
