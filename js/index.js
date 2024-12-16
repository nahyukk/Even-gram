document.addEventListener("DOMContentLoaded", () => {
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
});

// 피드 슬라이더 스크립트
const swiper = document.querySelector(".carousel_wrapper");
const prevButtons = document.querySelectorAll(".carousel_prev");
const nextButtons = document.querySelectorAll(".carousel_next");
const bullets = document.querySelectorAll(".carousel_circle");

let currentSlide = 0;

function showSlide(slideIndex) {
  swiper.style.transform = `translateX(-${slideIndex * 470}px)`;
  currentSlide = slideIndex;

  bullets.forEach((bullet, index) => {
    if (index === currentSlide) {
      bullet.classList.add("active");
    } else {
      bullet.classList.remove("active");
    }
  });
}

prevButtons.forEach((prevButton) => {
  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  });
});

nextButtons.forEach((nextButton) => {
  nextButton.addEventListener("click", () => {
    if (currentSlide < 3) {
      showSlide(currentSlide + 1);
    }
  });
});

bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    showSlide(index);
  });
});

showSlide(0);

// 텍스트 박스 호버 시 게시 버튼이 나타나는 스크립트 (완성)
document.addEventListener("DOMContentLoaded", () => {
  const mainContentsList = document.querySelector(".main-contents-list");

  // 이벤트 위임 방식으로 댓글 박스와 게시 버튼 관련 로직 처리 (무한스크롤 관련)
  mainContentsList.addEventListener("focusin", (event) => {
    if (event.target.classList.contains("main-content-textbox")) {
      const showDiv = event.target
        .closest(".main-content-input-flex")
        .querySelector(".main-content-text-upload");
      if (event.target.value.trim() === "") {
        showDiv.style.display = "none";
      } else {
        showDiv.style.display = "block";
      }
    }
  });

  mainContentsList.addEventListener("input", (event) => {
    if (event.target.classList.contains("main-content-textbox")) {
      const showDiv = event.target
        .closest(".main-content-input-flex")
        .querySelector(".main-content-text-upload");
      if (event.target.value.trim() !== "") {
        showDiv.style.display = "block";
      } else {
        showDiv.style.display = "none";
      }
    }
  });

  mainContentsList.addEventListener("focusout", (event) => {
    if (event.target.classList.contains("main-content-textbox")) {
      const showDiv = event.target
        .closest(".main-content-input-flex")
        .querySelector(".main-content-text-upload");
      if (event.target.value.trim() === "") {
        showDiv.style.display = "none";
      }
    }
  });
});

// 피드 반복 (무한스크롤)
document.addEventListener("DOMContentLoaded", () => {
  const mainContentsList = document.querySelector(".main-contents-list");

  // JSON 데이터 로드
  fetch("./json/feed.json") // JSON 파일 경로
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load feed.json");
      }
      return response.json(); // JSON 데이터를 JavaScript 객체로 변환
    })
    .then((data) => {
      data.feeds.forEach((feed) => renderFeed(feed)); // 데이터를 순회하며 피드 렌더링
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
});

// 피드를 렌더링하는 함수
function renderFeed(feed) {
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

  // 컨테이너에 추가
  const mainContentsList = document.querySelector(".main-contents-list");
  mainContentsList.appendChild(article);

  // 슬라이더 초기화 (기존 코드 재사용)
  initializeCarousel(article.querySelector(".carousel_main"));
}

function initializeCarousel(carousel) {
  const wrapper = carousel.querySelector(".carousel_wrapper");
  const prevButton = carousel.querySelector(".carousel_prev");
  const nextButton = carousel.querySelector(".carousel_next");
  const pagination = carousel.querySelector(".carousel_pagination");
  const slides = wrapper.querySelectorAll(".carousel_slide");

  // 기존 점 제거 후 새 점 생성
  pagination.innerHTML = ""; // 점 초기화
  slides.forEach((_, index) => {
    const bullet = document.createElement("div");
    bullet.classList.add("carousel_circle");
    bullet.setAttribute("data-index", index);
    pagination.appendChild(bullet);
  });

  const bullets = pagination.querySelectorAll(".carousel_circle");

  let currentSlide = 0;

  function updateButtonVisibility() {
    // 첫 번째 슬라이드에서는 이전 버튼을 비활성화
    if (currentSlide === 0) {
      prevButton.classList.add("carousel_button_disabled");
    } else {
      prevButton.classList.remove("carousel_button_disabled");
    }

    // 마지막 슬라이드에서는 다음 버튼을 비활성화
    if (currentSlide === slides.length - 1) {
      nextButton.classList.add("carousel_button_disabled");
    } else {
      nextButton.classList.remove("carousel_button_disabled");
    }
  }

  function showSlide(index) {
    currentSlide = index;
    wrapper.style.transform = `translateX(-${index * 100}%)`;

    bullets.forEach((bullet, idx) => {
      bullet.classList.toggle("active", idx === index);
    });

    updateButtonVisibility(); // 버튼 상태 업데이트
  }

  // 슬라이더 버튼 이벤트 연결
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", () => {
      if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
    });
  }

  // 점 클릭 이벤트 연결
  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => showSlide(index));
  });

  // 초기 상태 업데이트
  showSlide(0);
  updateButtonVisibility(); // 초기 버튼 상태 업데이트
}

// 무한 스크롤 이벤트 추가
let shuffledFeeds = []; // 셔플된 배열
let currentFeedIndex = 0; // 현재 피드 위치 추적

// 배열을 셔플하는 함수 (Fisher-Yates 알고리즘)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 두 요소 교환
  }
  return array;
}

// 첫 번째 피드 렌더링 및 초기화
function renderAndInitializeFirstFeed() {
  const mainContentsList = document.querySelector(".main-contents-list");

  // 첫 번째 피드를 렌더링
  const feedToRender = shuffledFeeds[currentFeedIndex]; // 현재 인덱스의 피드
  renderFeed(feedToRender); // 렌더링
  currentFeedIndex++; // 다음 인덱스로 이동

  // 첫 번째 피드 슬라이더 초기화
  const firstCarousel = mainContentsList.lastElementChild // 가장 마지막으로 추가된 피드
    .querySelector(".carousel_main");

  if (firstCarousel) {
    initializeCarousel(firstCarousel); // 슬라이더 초기화
  }
}

// 피드를 로드하는 함수
function loadMoreFeeds() {
  const mainContentsList = document.querySelector(".main-contents-list");

  // 모든 피드를 순회했으면 다시 셔플
  if (currentFeedIndex >= shuffledFeeds.length) {
    console.log("All feeds displayed. Reshuffling...");
    shuffledFeeds = shuffle([...shuffledFeeds]); // 기존 배열 다시 셔플
    currentFeedIndex = 0; // 인덱스 초기화
  }

  // 현재 인덱스의 피드 가져오기
  const feedToRender = shuffledFeeds[currentFeedIndex];
  currentFeedIndex++; // 다음 인덱스로 이동

  renderFeed(feedToRender);

  // 마지막 추가된 피드 슬라이더 초기화
  const newCarousel = mainContentsList.lastElementChild // 가장 마지막으로 추가된 피드
    .querySelector(".carousel_main");

  if (newCarousel) {
    initializeCarousel(newCarousel); // 슬라이더 초기화
  }
}

// JSON 데이터를 로드한 후 초기화
function initializeFeedData(feedData) {
  shuffledFeeds = shuffle([...feedData]); // feedData를 셔플
  currentFeedIndex = 0; // 초기화

  // 첫 번째 피드 렌더링 및 초기화
  renderAndInitializeFirstFeed();

  // 무한 스크롤 이벤트 연결
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadMoreFeeds(); // 추가된 피드를 렌더링
    }
  });
}

// 새로고침 시 항상 최상단에서 시작
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0); // 스크롤을 최상단으로 이동
});
history.scrollRestoration = "manual"; // 스크롤 위치 저장 방지

// 초기 로드
fetch("./json/feed.json")
  .then((response) => response.json())
  .then((data) => {
    initializeFeedData(data.feeds); // JSON 데이터를 기반으로 초기화
  })
  .catch((error) => console.error("Error loading JSON:", error));

// 좋아요 버튼 토글 기능
document.addEventListener("DOMContentLoaded", () => {
  const mainContentsList = document.querySelector(".main-contents-list");

  // 좋아요 버튼 클릭 이벤트 위임
  mainContentsList.addEventListener("click", (event) => {
    const heartIcon = event.target.closest(".icon-heart");
    if (heartIcon) {
      // 클릭된 heart 아이콘을 기준으로 관련 요소 탐색
      const likesElement = heartIcon
        .closest(".main-content-inner")
        .querySelector(".main-content-like");

      // 현재 좋아요 숫자 추출
      const currentLikes = parseInt(
        likesElement.textContent.match(/\d+/)[0],
        10
      );

      // 좋아요 토글 상태 확인 (클래스를 통해 상태를 저장)
      const isLiked = heartIcon.classList.contains("liked");

      if (isLiked) {
        // 좋아요 취소
        likesElement.textContent = `좋아요 ${currentLikes - 1}개`;
        heartIcon.classList.remove("liked");
      } else {
        // 좋아요 추가
        likesElement.textContent = `좋아요 ${currentLikes + 1}개`;
        heartIcon.classList.add("liked");
      }
    }
  });

  // 북마크 버튼 토글 기능
  // 북마크 버튼 클릭 이벤트 위임
  mainContentsList.addEventListener("click", (event) => {
    const bookmarkIcon = event.target.closest(".icon-bookmark");
    if (bookmarkIcon) {
      // 북마크 토글 상태 확인 (클래스를 통해 상태를 저장)
      const isBookmark = bookmarkIcon.classList.contains("liked");

      if (isBookmark) {
        // 북마크 취소
        bookmarkIcon.classList.remove("liked");
      } else {
        bookmarkIcon.classList.add("liked");
      }
    }
  });
});

// 좋아요 하트 통통이
document.addEventListener("DOMContentLoaded", () => {
  const mainContentsList = document.querySelector(".main-contents-list");

  // 좋아요 애니메이션 트리거
  mainContentsList.addEventListener("click", (event) => {
    // 클릭된 요소가 .icon-heart인지 확인
    const heartIcon = event.target.closest(".icon-heart");

    if (heartIcon) {
      console.log("Triggering animation for", heartIcon);

      // 애니메이션 트리거
      heartIcon.classList.remove("animate"); // 기존 애니메이션 클래스 제거
      void heartIcon.offsetWidth; // 리플로우 발생 (애니메이션 초기화)
      heartIcon.classList.add("animate"); // 애니메이션 클래스 다시 추가
    }
  });
});

// 스토리 부분
async function loadStories() {
  try {
    const response = await fetch("/json/stories.json");
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

loadStories();
