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
const swiper = document.querySelector('.carousel_wrapper');
const prevButtons = document.querySelectorAll('.carousel_prev');
const nextButtons = document.querySelectorAll('.carousel_next');
const bullets = document.querySelectorAll('.carousel_circle');

let currentSlide = 0;

function showSlide(slideIndex) {
    swiper.style.transform = `translateX(-${slideIndex * 470}px)`;
    currentSlide = slideIndex;

    bullets.forEach((bullet, index) => {
        if (index === currentSlide) {
            bullet.classList.add('active');
        } else {
            bullet.classList.remove('active');
        }
    });
}

prevButtons.forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    });
});

nextButtons.forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
        if (currentSlide < 3) {
            showSlide(currentSlide + 1);
        }
    });
});

bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
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
// 배열에 피드 데이터를 저장합니다.
const feedData = [
    {
        username: "hwiwoo_coffee",
        location: "고양시",
        profileImage: "./assets/images/1_hwiwoo.jpg",
        update: "1시간",
        postImages: [
            "./assets/images/1-1_hwiwoo.jpeg",
            "./assets/images/1-2_hwiwoo.jpeg",
            "./assets/images/1-3_hwiwoo.jpeg",
            "./assets/images/1-4_hwiwoo.jpeg",
            "./assets/images/1-5_hwiwoo.jpeg",
            "./assets/images/1-6_hwiwoo.jpeg",
            "./assets/images/1-7_hwiwoo.jpeg",
            "./assets/images/1-8_hwiwoo.jpeg",
            "./assets/images/1-9_hwiwoo.jpeg",
            "./assets/images/1-10_hwiwoo.jpeg",
        ],
        likes: 95,
        caption: "반려견과 편안하게 즐길 수 있는 휘우커피의 공간🐕",
        comments: 48,
    },
    {
        username: "nolimitcoffeebar",
        location: "서울 용산구",
        update: "1일",
        profileImage: "./assets/images/2_nolimit.jpg",
        postImages: [
            "./assets/images/2-1_nolimit.jpeg",
            "./assets/images/2-2_nolimit.jpeg",
            "./assets/images/2-3_nolimit.jpeg",
            "./assets/images/2-4_nolimit.jpeg",
            "./assets/images/2-5_nolimit.jpeg",
            "./assets/images/2-6_nolimit.jpeg",
            "./assets/images/2-7_nolimit.jpeg",
            "./assets/images/2-8_nolimit.jpeg",
        ],
        likes: 120,
        caption: "커피, 편견없는 해석과 새로운 접근의 공간",
        comments: 32,
    },
    {
        username: "cafe_aeoni",
        location: "서울 송파구, 송파나루역",
        update: "1일",
        profileImage: "./assets/images/3_aeoni.jpg",
        postImages: [
            "./assets/images/3-1_aeoni.jpeg",
            "./assets/images/3-2_aeoni.jpg",
            "./assets/images/3-3_aeoni.jpeg",
            "./assets/images/3-4_aeoni.jpeg",
            "./assets/images/3-5_aeoni.jpeg",
            "./assets/images/3-6_aeoni.jpeg",
            "./assets/images/3-7_aeoni.jpeg",
            "./assets/images/3-8_aeoni.jpeg",
            "./assets/images/3-9_aeoni.jpeg",
            "./assets/images/3-10_aeoni.jpeg",
        ],
        likes: 48,
        caption: "이번주 이오니에 준비된 다양한 스페셜티커피들을 소개드리겠습니다",
        comments: 39,
    },
    {
        username: "__nutten",
        location: "서울 서초구",
        update: "1주",
        profileImage: "./assets/images/4_nutten.jpg",
        postImages: [
            "./assets/images/4-1_nutten.jpeg",
            "./assets/images/4-2_nutten.jpeg",
            "./assets/images/4-3_nutten.jpeg",
            "./assets/images/4-4_nutten.jpeg",
            "./assets/images/4-5_nutten.jpeg",
            "./assets/images/4-6_nutten.jpeg",
            "./assets/images/4-7_nutten.jpeg",
            "./assets/images/4-8_nutten.jpeg",
            "./assets/images/4-9_nutten.jpeg",
            "./assets/images/4-10_nutten.jpeg",
            "./assets/images/4-11_nutten.jpeg",
        ],
        likes: 52,
        caption: "힐링하기 좋은 환하고 따뜻한 카페 누뗀!",
        comments: 61,
    },
    {
        username: "thanksoat",
        location: "땡스오트, 안국",
        update: "2주",
        profileImage: "./assets/images/5_thanksoat.jpg",
        postImages: [
            "./assets/images/5-1_thanksoat.jpeg",
            "./assets/images/5-2_thanksoat.jpeg",
            "./assets/images/5-3_thanksoat.jpeg",
            "./assets/images/5-4_thanksoat.jpeg",
            "./assets/images/5-5_thanksoat.jpeg",
            "./assets/images/5-6_thanksoat.jpeg",
            "./assets/images/5-7_thanksoat.jpeg",
            "./assets/images/5-8_thanksoat.jpeg",
            "./assets/images/5-9_thanksoat.jpeg",
        ],
        likes: 77,
        caption: "우푸 커피가 오트 커피로 바뀌었습니다!",
        comments: 54,
    },
];

// 메인 컨텐츠 리스트를 가져옵니다.
const mainContentsList = document.querySelector(".main-contents-list");

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
              <span style="margin: 0 4px; color: #737373;">•</span>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-0.133 0 0.6 0.6" class="bi bi-chevron-double-left">
                  <path d="M0.243 0.157a0.025 0.025 0 0 0 -0.035 0L0.082 0.283a0.025 0.025 0 0 0 0 0.035l0.125 0.125a0.025 0.025 0 0 0 0.035 0 0.025 0.025 0 0 0 0 -0.035L0.135 0.3 0.243 0.193a0.025 0.025 0 0 0 0 -0.035"/>
                </svg>
              </button>
              <button type="button" class="carousel_next">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-0.133 0 0.6 0.6" transform="scale(-1 1)" class="bi bi-chevron-double-left">
                  <path d="M0.243 0.157a0.025 0.025 0 0 0 -0.035 0L0.082 0.283a0.025 0.025 0 0 0 0 0.035l0.125 0.125a0.025 0.025 0 0 0 0.035 0 0.025 0.025 0 0 0 0 -0.035L0.135 0.3 0.243 0.193a0.025 0.025 0 0 0 0 -0.035"/>
                </svg>
              </button>
            </div>
          <div class="carousel_pagination">
            ${feed.postImages
            .map((_, index) => `<div class="carousel_circle" data-index="${index}"></div>`)
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
        <div class="main-content-comment st-mg-t-8 st-gray">댓글 ${feed.comments}개 모두 보기</div>
        <div class="main-content-input st-mg-t-8 st-gray">
          <div class="main-content-input-flex">
            <input class="main-content-textbox" placeholder="댓글 달기..." autocomplete="off" autocorrect="off">
              <div class="main-content-text-upload" style="display: none;">게시</div>
                <svg aria-label="이모티콘" style="cursor: pointer;" fill="#737373" height="13" viewBox="0 0 24 24" width="13">
                <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167m-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167m5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503m0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5"/>
                </svg>
              </div>        
          </div>
      </div>
    `;

    mainContentsList.appendChild(article);
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

    function showSlide(index) {
        currentSlide = index;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
        bullets.forEach((bullet, idx) => {
            bullet.classList.toggle("active", idx === index);
        });
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

    // 첫 슬라이드로 초기화
    showSlide(0);
}

// 무한 스크롤 이벤트 추가
let lastFeedIndex = -1; // 이전에 추가된 피드의 인덱스 저장

function loadMoreFeeds() {
    let newFeedIndex;

    // 새 피드가 이전 피드와 다를 때까지 반복
    do {
        newFeedIndex = Math.floor(Math.random() * feedData.length);
    } while (newFeedIndex === lastFeedIndex);

    lastFeedIndex = newFeedIndex; // 새로운 피드 인덱스를 저장

    const feedToRender = feedData[newFeedIndex]; // 선택된 피드 데이터
    renderFeed(feedToRender); // 피드 렌더링

    // 가장 마지막으로 추가된 피드의 슬라이더 초기화
    const newCarousel = mainContentsList
        .lastElementChild // 가장 마지막으로 추가된 피드
        .querySelector(".carousel_main"); // 해당 피드의 슬라이더

    if (newCarousel) {
        initializeCarousel(newCarousel); // 슬라이더 초기화
    }
}

// 무한 스크롤 이벤트 연결
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
        loadMoreFeeds(); // 추가된 피드와 함께 슬라이더 초기화
    }
});

// 초기 로드
loadMoreFeeds();


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
            const currentLikes = parseInt(likesElement.textContent.match(/\d+/)[0], 10);

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
