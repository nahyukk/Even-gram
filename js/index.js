// DOM 로드 완료 시 실행 (중앙 컨트롤러)
document.addEventListener("DOMContentLoaded", () => {
  initializeSidebar(); // 사이드바 로드
  initializeFeed(); // 피드 초기화 및 무한 스크롤 설정
  initializeCommentInput(); // 댓글 입력 로직 초기화
  initializeLikeAndBookmark(); // 좋아요 및 북마크 기능 초기화
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadStories(); // 스토리 로딩 후 버튼 업데이트
  currentIndex = localStorage.getItem("currentStoryIndex")
    ? parseInt(localStorage.getItem("currentStoryIndex"))
    : 0;
  updateStoryButtons();
});

// JSON 파일 불러오기 (연동)
function fetchJSON(url, onSuccess) {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.json();
    })
    .then(onSuccess)
    .catch((error) => console.error(`Error loading JSON from ${url}:`, error));
}

// 사이드 바 불러오기 코드
function initializeSidebar() {
  const sidebarContainer = document.getElementById("right-side-bar");
  fetch("./components/sidebar.html")
    .then((response) => response.text())
    .then((html) => (sidebarContainer.innerHTML = html))
    .catch((error) => console.error("Error loading sidebar.html:", error));
}

// ---------- 슬라이더 관련 ----------

// 슬라이더(Carousel)를 초기화
function initializeCarousel(carousel) {
  const wrapper = carousel.querySelector(".carousel_wrapper");
  const prevButton = carousel.querySelector(".carousel_prev");
  const nextButton = carousel.querySelector(".carousel_next");
  const pagination = carousel.querySelector(".carousel_pagination");
  const slides = wrapper.querySelectorAll(".carousel_slide");

  pagination.innerHTML = ""; // 기존 점 제거
  slides.forEach((_, index) => {
    const bullet = document.createElement("div");
    bullet.classList.add("carousel_circle");
    bullet.setAttribute("data-index", index);
    pagination.appendChild(bullet);
  });

  const bullets = pagination.querySelectorAll(".carousel_circle");
  let currentSlide = 0;

  function updateButtonVisibility() {
    prevButton.classList.toggle("carousel_button_disabled", currentSlide === 0);
    nextButton.classList.toggle(
      "carousel_button_disabled",
      currentSlide === slides.length - 1
    );
  }

  function showSlide(index) {
    currentSlide = index;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    bullets.forEach((bullet, idx) =>
      bullet.classList.toggle("active", idx === index)
    );
    updateButtonVisibility();
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) showSlide(currentSlide - 1);
    });
    nextButton.addEventListener("click", () => {
      if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
    });
  }

  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => showSlide(index));
  });

  showSlide(0);
  updateButtonVisibility();
}

// ---------- 피드 등장 관련 ----------

let shuffledFeeds = [];
let currentFeedIndex = 0;

// JSON 데이터를 가져오고 배열을 섞는 작업
function initializeFeed() {
  fetchJSON("./json/feed.json", (data) => {
    shuffledFeeds = shuffle([...data.feeds]);
    currentFeedIndex = 0;

    renderAndInitializeFirstFeed(); // 첫번째 피드 렌더링 및 슬라이더 초기화
    setupInfiniteScroll(); // 무한 스크롤 설정
  });
}

// 첫 번째 피드 렌더링하고 슬라이더 초기화
function renderAndInitializeFirstFeed() {
  const mainContentsList = document.querySelector(".main-contents-list");
  const feedToRender = shuffledFeeds[currentFeedIndex];
  renderFeed(feedToRender);
  currentFeedIndex++;

  const firstCarousel =
    mainContentsList.lastElementChild.querySelector(".carousel_main");
  if (firstCarousel) initializeCarousel(firstCarousel);
}

// 무한 스크롤 설정
function setupInfiniteScroll() {
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadMoreFeeds(); // 추가 피드 로드 및 렌더링
    }
  });
}

// 추가 피드 로드 및 렌더링
function loadMoreFeeds() {
  const mainContentsList = document.querySelector(".main-contents-list");

  if (currentFeedIndex >= shuffledFeeds.length) {
    shuffledFeeds = shuffle([...shuffledFeeds]);
    currentFeedIndex = 0;
  }

  const feedToRender = shuffledFeeds[currentFeedIndex];
  currentFeedIndex++;
  renderFeed(feedToRender);

  const newCarousel =
    mainContentsList.lastElementChild.querySelector(".carousel_main");
  if (newCarousel) initializeCarousel(newCarousel);
}

// 배열을 무작위로 섞는 함수 (Fisher-Yates 알고리즘)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 피드 렌더링 및 디자인
function renderFeed(feed) {
  const mainContentsList = document.querySelector(".main-contents-list");
  const article = document.createElement("article");
  article.classList.add("main-content");

  article.innerHTML = `
    <div class="main-content-profile">
      <div class="main-content-profile-flex">
        <div class="main-profile-image">
          <span>
            <img src="${feed.profileImage}" alt="${feed.username}" />
          </span>
        </div>
        <div class="main-profile-info">
          <div class="main-profile-meta">
            <div class="main-profile-name st-bold">${feed.username}</div>
            <span style="margin: 0 4px; color: var(--secondary-text-color);">•</span>
            <a class="main-profile-date" href="#">${feed.update}</a>
          </div>
          <div class="main-profile-site">${feed.location}</div>
        </div>
        <div class="main-profile-more">
          <div class="main-profile-more-icon"></div>
        </div>
      </div>
    </div>
    <div class="main-content-slider">
      <div class="carousel_main">
        <div class="carousel_wrapper">
          ${feed.postImages
            .map(
              (image) => `
              <div class="carousel_slide">
                <img src="${image}" alt="#" />
              </div>`
            )
            .join("")}
        </div>
          <div class="carousel_button_container">
            <button type="button" class="carousel_prev">
              <svg aria-label="이전" fill="#fff" opacity=".75" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
              <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5m3.707 12.22-4.5 4.488A1 1 0 0 1 9.8 15.795l3.792-3.783L9.798 8.21a1 1 0 1 1 1.416-1.412l4.5 4.511a1 1 0 0 1-.002 1.414"/>
              </svg>
            </button>
            <button type="button" class="carousel_next">
              <svg aria-label="다음" fill="#fff" opacity=".75" height="26" viewBox="0 0 24 24" width="26">
              <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5m3.707 12.22-4.5 4.488A1 1 0 0 1 9.8 15.795l3.792-3.783L9.798 8.21a1 1 0 1 1 1.416-1.412l4.5 4.511a1 1 0 0 1-.002 1.414"/>
              </svg>
            </button>
          </div>
        <div class="carousel_pagination">
          ${feed.postImages
            .map(
              (_, index) =>
                `<div class="carousel_circle" data-index="${index}"></div>`
            )
            .join("")}
        </div>
      </div>
    </div>
    <div class="main-content-inner">
      <div class="main-content-icon">
        <div class="main-content-icon-left">
          <span style="margin-left: -8px;"><div class="content-icon-slot"><div class="icon-heart icon-box"></div></div></span>
          <span><div class="content-icon-slot"><div class="icon-msg icon-box"></div></div></span>
          <span><div class="content-icon-slot"><div class="icon-dm icon-box"></div></div></span>
        </div>
        <div class="main-content-icon-right">
          <div class="icon-bookmark icon-box"></div>
        </div>
      </div>
      <div class="main-content-like st-bold">좋아요 ${feed.likes}개</div>
      <div class="main-content-text st-mg-t-8">
        <span class="st-bold">${feed.username}</span>${feed.caption}
      </div>
      <div class="main-content-comment st-mg-t-8 st-gray">댓글 ${
        feed.comments
      }개 모두 보기</div>
      <div class="main-content-input st-mg-t-8 st-gray">
        <div class="main-content-input-flex">
          <input class="main-content-textbox" placeholder="댓글 달기..." autocomplete="off" autocorrect="off">
            <div class="main-content-text-upload" style="display: none;">게시</div>
              <svg aria-label="이모티콘" class="comment-emoji" height="13" viewBox="0 0 24 24" width="13">
              <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167m-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167m5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503m0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5"/>
              </svg>
            </div>        
        </div>
    </div>
  `;

  mainContentsList.appendChild(article);
}

// ---------- 피드 내용 관련 ----------

// 댓글 입력 창과 게시 버튼
function initializeCommentInput() {
  const mainContentsList = document.querySelector(".main-contents-list");

  mainContentsList.addEventListener("input", (event) => {
    if (event.target.classList.contains("main-content-textbox")) {
      const uploadButton = event.target
        .closest(".main-content-input-flex")
        .querySelector(".main-content-text-upload");
      uploadButton.style.display =
        event.target.value.trim() === "" ? "none" : "block";
    }
  });
}

// 좋아요와 북마크 버튼 토글
function initializeLikeAndBookmark() {
  const mainContentsList = document.querySelector(".main-contents-list");

  mainContentsList.addEventListener("click", (event) => {
    const heartIcon = event.target.closest(".icon-heart");
    const bookmarkIcon = event.target.closest(".icon-bookmark");

    if (heartIcon) toggleHeart(heartIcon);
    if (bookmarkIcon) toggleBookmark(bookmarkIcon);
  });

  function toggleHeart(heartIcon) {
    const likesElement = heartIcon
      .closest(".main-content-inner")
      .querySelector(".main-content-like");
    const currentLikes = parseInt(likesElement.textContent.match(/\d+/)[0], 10);
    const isLiked = heartIcon.classList.toggle("liked");

    likesElement.textContent = `좋아요 ${currentLikes + (isLiked ? 1 : -1)}개`;
  }

  function toggleBookmark(bookmarkIcon) {
    bookmarkIcon.classList.toggle("liked");
  }
}

// 좋아요 하트 통통이 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  const mainContentsList = document.querySelector(".main-contents-list");

  // 좋아요 애니메이션 트리거
  mainContentsList.addEventListener("click", (event) => {
    // 클릭된 요소가 .icon-heart인지 확인
    const heartIcon = event.target.closest(".icon-heart");

    // 애니메이션 트리거
    if (heartIcon) {
      heartIcon.classList.remove("animate"); // 기존 애니메이션 클래스 제거
      void heartIcon.offsetWidth; // 리플로우 발생 (애니메이션 초기화)
      heartIcon.classList.add("animate"); // 애니메이션 클래스 다시 추가
    }
  });
});

// ---------- 스토리 관련 ----------

// 스토리 불러오기
async function loadStories() {
  try {
    const response = await fetch("../json/stories.json");
    const data = await response.json();
    const stories = data.stories;

    const storyList = document.querySelector(".story-list");
    if (!storyList) throw new Error("스토리 목록 컨테이너가 없습니다.");

    storyList.innerHTML = ""; // 기존 목록 제거

    stories.forEach((story) => {
      const storyItem = document.createElement("div");
      storyItem.className = "story-item";
      storyItem.innerHTML = `
        <img src="${story.profileImage}" alt="${story.username}">
        <p>${story.username}</p>
      `;

      // 스토리 항목 클릭 시 이동 (userId 전달)
      storyItem.addEventListener("click", () => {
        const url = `/story.html?userId=${story.userId}`;
        window.location.href = url;
      });
      storyList.appendChild(storyItem);
    });
  } catch (error) {
    console.error(error.message);
  }
}

const storyList = document.querySelector(".story-list");
const leftButton = document.querySelector(".story-button.story-left");
const rightButton = document.querySelector(".story-button.story-right");

let currentIndex = localStorage.getItem("currentStoryIndex")
  ? parseInt(localStorage.getItem("currentStoryIndex"))
  : 0;
const storyWidth = 85;
const storiesPerSlide = 3;

// 버튼 상태를 업데이트하는 함수
function updateStoryButtons() {
  const updatedItems = document.querySelectorAll(".story-item").length;
  const visibleItems = Math.ceil(storyList.offsetWidth / storyWidth);
  const maxIndex = updatedItems - visibleItems;

  currentIndex = Math.min(currentIndex, maxIndex - 1);

  storyList.style.transform = `translateX(-${currentIndex * storyWidth}px)`;

  // 버튼 상태 업데이트
  leftButton.style.display = currentIndex === 0 ? "none" : "flex";
  if (currentIndex != 0) {
    rightButton.style.display = currentIndex >= maxIndex - 1 ? "none" : "flex";
  }
}

leftButton.addEventListener("click", () => {
  if (currentIndex >= storiesPerSlide) {
    currentIndex -= storiesPerSlide;
  } else {
    currentIndex = 0;
  }
  localStorage.setItem("currentStoryIndex", currentIndex);
  updateStoryButtons();
});

rightButton.addEventListener("click", () => {
  const updatedItems = document.querySelectorAll(".story-item").length;
  const visibleItems = Math.floor(storyList.offsetWidth / storyWidth);
  const maxIndex = updatedItems - visibleItems;

  if (currentIndex <= maxIndex - storiesPerSlide) {
    currentIndex += storiesPerSlide;
  } else {
    currentIndex = maxIndex;
  }
  localStorage.setItem("currentStoryIndex", currentIndex);
  updateStoryButtons();
});
