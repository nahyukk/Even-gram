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
  if (searchText !== "") {
    filterSearchResults(searchText);
  } else {
    showRecentSearches();
  }
});

// 페이지 로드 시 최근 검색어 표시
window.addEventListener("DOMContentLoaded", () => {
  showRecentSearches();
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

    userElement.addEventListener("click", () => {
      saveToLocalStorage(user.username);
      // 검색 중이던 내용은 유지하기 때문에 showRecentSearches() 호출 제거
    });

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

// localStorage에 username 저장하는 함수
function saveToLocalStorage(username) {
  let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  if (!recentSearches.includes(username)) {
    recentSearches.unshift(username); // 가장 최근 검색어를 앞에 추가
    if (recentSearches.length > 10) recentSearches.pop(); // 최대 10개 유지
  }
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

function showRecentSearches() {
  clearSearchResults(); // 기존 결과 초기화

  const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  if (recentSearches.length === 0) {
    console.log("최근 검색 항목이 없습니다.");
    return;
  }

  const recentUsers = users.filter((user) => recentSearches.includes(user.username));
  recentUsers.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList.add("search-list-style");
    userElement.style.display = "flex";

    const profileBox = document.createElement("div");
    profileBox.classList.add("search-list-box");
    const profileImg = document.createElement("img");
    profileImg.classList.add("search-profile");
    profileImg.src = user.profileImage;
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

    // 삭제 버튼 클릭 이벤트
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // 부모 요소 클릭 방지
      removeFromLocalStorage(user.username);
      showRecentSearches(); // 삭제 후 업데이트된 최근 검색어 표시
    });

    userElement.appendChild(profileBox);
    userElement.appendChild(textBox);
    userElement.appendChild(deleteBtn);

    searchListContainer.appendChild(userElement);
  });
}

function removeFromLocalStorage(username) {
  let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  recentSearches = recentSearches.filter((item) => item !== username); // 선택된 username 삭제
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}