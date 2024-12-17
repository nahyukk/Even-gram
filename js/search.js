const searchInput = document.querySelector(".search-box-tab");
const searchListContainer = document.querySelector(".search-list-container");

let users = [];

loadUsers();

async function loadUsers() {
  try {
    const response = await fetch("../json/search.json");
    const data = await response.json();
    users = data.users;
  } catch (error) {
    console.log("json 데이터 못불렀다.");
  }
}

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.trim().toLowerCase();
  if (searchText != "") {
    filterSearchResults(searchText);
  } else {
    clearSearchResults();
  }
});

function filterSearchResults(searchText) {
  clearSearchResults();

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchText) ||
      user.name.includes(searchText)
  );

  if (filteredUsers.length === 0) {
    console.log("검색 결과가 없습니다.");
    return;
  }

  filteredUsers.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList.add("search-list-style");
    userElement.style.display = "flex";

    const profileBox = document.createElement("div");
    profileBox.classList.add("search-list-box");
    const profileImg = document.createElement("img");
    profileImg.classList.add("search-profile");
    profileImg.src = user.profileImage;
    profileImg.alt = "프로필 이미지";
    profileBox.appendChild(profileImg);

    const textBox = document.createElement("div");
    textBox.classList.add("search-list-text-box");

    const usernameBox = document.createElement("div");
    usernameBox.classList.add("search-list-text-box-username");

    const username = document.createElement("span");
    username.classList.add("list-id");
    username.textContent = user.username;

    const verified = document.createElement("div");
    if (user.verified) {
      verified.classList.add("verified-img");
      verified.innerHTML = `<svg aria-label="인증됨" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>인증됨</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>`;
    }

    const followersBox = document.createElement("div");
    followersBox.classList.add("search-list-followers-box");

    const name = document.createElement("span");
    name.classList.add("list-name");
    name.textContent = user.name;

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.textContent = " · ";

    const followers = document.createElement("span");
    followers.classList.add("list-followers");

    if (user.verified) {
      followers.textContent = `팔로워 ${formatFollowers(user.followers)}명`;
    } else {
      followers.textContent = `${user.follower}님 외 ${formatFollowers(
        user.followers
      )}명이 팔로우합니다.`;
    }

    usernameBox.appendChild(username);
    usernameBox.appendChild(verified);

    followersBox.appendChild(name);
    followersBox.appendChild(dot);
    followersBox.appendChild(followers);

    textBox.appendChild(usernameBox);
    textBox.appendChild(followersBox);

    userElement.appendChild(profileBox);
    userElement.appendChild(textBox);

    searchListContainer.appendChild(userElement);
  });
}

function clearSearchResults() {
  searchListContainer.innerHTML = "";
}

function formatFollowers(followers) {
  if (followers >= 10000) {
    const formatted = (followers / 10000).toFixed(1);
    return `${formatted}만`;
  }
  return `${followers}`;
}
