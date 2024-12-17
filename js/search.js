const searchInput = document.querySelector(".search-box-tab");
const searchListContainer = document.querySelector(".search-list-container");

let users = [];
let debounceTimer;

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
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText != "") {
      filterSearchResults(searchText);
      toggleSearchExtras(true); // 검색 중이므로 숨김
    } else {
      showRecentSearches();
      toggleSearchExtras(false); // 검색어가 없으므로 표시
    }
  }, 500);
});

// 페이지 로드 시 최근 검색어 표시
window.addEventListener("DOMContentLoaded", () => {
  showRecentSearches();
});

function filterSearchResults(searchText) {
  clearSearchResults();

  const initialSearchText = getInitialConsonant(searchText);

  const filteredUsers = users.filter((user) => {
    const username = user.username.toLowerCase();
    const name = user.name;

    const initialName = getInitialConsonant(name);
    const initialUsername = getInitialConsonant(username);

    return (
      username.includes(searchText) || // 영문 검색
      name.includes(searchText) || // 한글 검색
      initialName.includes(initialSearchText) || // 한글 초성 검색
      initialUsername.includes(initialSearchText) // 영문 초성 검색
    );
  });

  if (filteredUsers.length === 0) {
    const noResults = document.querySelector(".no-results");
    if (noResults) {
      noResults.style.display = "flex";
    }
    return;
  } else {
    const noResults = document.querySelector(".no-results");
    if (noResults) {
      noResults.style.display = "none";
    }
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

    const usernameBox = document.createElement("div");
    usernameBox.classList.add("search-list-text-box-username");

    const username = document.createElement("span");
    username.classList.add("search-list-id");
    username.textContent = user.username;

    const verified = document.createElement("div");
    if (user.verified) {
      verified.classList.add("verified-img");
      verified.innerHTML = `<svg aria-label="인증됨" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>인증됨</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>`;
    }

    const followersBox = document.createElement("div");
    followersBox.classList.add("search-list-followers-box");

    const name = document.createElement("span");
    name.classList.add("search-list-name");
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

// 검색 리스트 지우는 함수

function clearSearchResults() {
  searchListContainer.innerHTML = "";
}

// 팔로워 n 만명 바꿔주는 함수

function formatFollowers(followers) {
  if (followers >= 10000) {
    const formatted = (followers / 10000).toFixed(1);
    return `${formatted}만`;
  }
  return `${followers}`;
}

// 한글 초성 추출 함수
function getInitialConsonant(text) {
  const cho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 44032 && code <= 55203) {
        const index = Math.floor((code - 44032) / 588);
        return cho[index]; // 초성 반환
      }
      return char; // 한글이 아니면 그대로 반환
    })
    .join("");
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

  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  const recentUsers = users.filter((user) =>
    recentSearches.includes(user.username)
  );
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

    // 전체 지우기 함수 추가
    const deleteAll = document.querySelector(".delete-text");

    deleteAll.addEventListener("click", () => {
      clearSearchResults();
			removeFromLocalStorage(user.username);
			showRecentSearches();
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

const searchNameContent = document.querySelector(".search-name-content"); // 최근 검색
const searchBoxLine = document.querySelector(".search-box-line"); // 검색 상자 하단 라인

// 검색 중 또는 검색 전 상태에 따라 요소 숨기기/보이기
function toggleSearchExtras(isSearching) {
  const displayValue = isSearching ? "none" : "block";
  searchNameContent.style.display = displayValue;
  searchBoxLine.style.display = displayValue;
}
