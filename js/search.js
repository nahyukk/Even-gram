const searchInput = document.querySelector(".search-box-tab");
const searchListContainer = document.querySelector(".search-list-container");

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.trim().toLowerCase();
  if (searchText != "") {
    filterSearchResults(searchText);
  } else {
    clearSearchResults();
  }
});

// 더미 데이터
const users = [
  {
    username: "rudolph",
    name: "루돌프",
    profileImage: "./assets/images/1_hwiwoo.jpg",
  },
  { username: "santa", name: "산타", profileImage: "./assets/images/img5.jpg" },
	{ username: "santti", name: "산티", profileImage: "./assets/images/img3.jpg" },
  {
    username: "elf",
    name: "엘프",
    profileImage: "./assets/images/3_aeoni.jpg",
  },
];

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

    const username = document.createElement("span");
    username.classList.add("list-id");
    username.textContent = user.username;

    const name = document.createElement("span");
    name.classList.add("list-name");
    name.textContent = user.name;

    textBox.appendChild(username);
    textBox.appendChild(name);

    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("list-delete");
    deleteBtn.textContent = "X";

    userElement.appendChild(profileBox);
    userElement.appendChild(textBox);
    userElement.appendChild(deleteBtn);

    searchListContainer.appendChild(userElement);
  });
}

function clearSearchResults() {
  searchListContainer.innerHTML = "";
}
