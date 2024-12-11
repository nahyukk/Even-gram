// id로 요소 가져오기 작업예정
// const storyMainImg = document.getElementById("story-main-img");
// const storyProfileImg = document.getElementById("story-profile-img");
// const storyProfileName = document.getElementById("story-profile-name");
// const storyUploadTime = document.getElementById("story-upload-time");

let currentStoryIndex = 0;
let currentMediaIndex = 0;
let storiesData = [];

// json 데이터 가져오기
fetch("./json/stories.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("업로드 대실패!");
    }
    return response.json();
  })
  .then((data) => {
    console.log("story", data);
    storiesData = data.stories;
    updateStories(currentStoryIndex, currentMediaIndex);
  })
  .catch((error) => {
    console.error("JSON Fetching Error", error);
  });

// json 데이터 가져오고 출력
function updateStories(userIndex, mediaIndex) {
  const user = storiesData[userIndex];
  const story = user.stories[mediaIndex];

  document.getElementById("story-main-img-img").src = story.mediaUrl;
  document.querySelector("#story-profile-img img").src = user.profileImage;
  document.querySelector("#story-profile-name").textContent = user.username;
  document.querySelector("#story-upload-time").textContent = formatTimestamp(
    story.timestamp
  );
}

// 시간 스탬프 계산
function formatTimestamp(timestamp) {
  const timeDiff = new Date() - new Date(timestamp);
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `방금 전`;
  }
}

// 로고, x 클릭시 홈으로 이동 - 추후 링크 변화시 수정 필요
document.getElementById("story-out-logo").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.getElementById("story-out-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// 재생 - 일시정지 버튼
let isPlaying = true;

function togglePlayPause() {
  isPlaying = !isPlaying;

  const storyPlayButton = document.getElementById("story-btn-play");

  if (isPlaying) {
    storyPlayButton.innerHTML = `<svg aria-label="재생" class="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>재생</title><path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path></svg>`;
  } else {
    storyPlayButton.innerHTML = `<svg aria-label="일시 정지" class="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 48 48" width="16"><title>일시 정지</title><path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path></svg>`;
  }
}

document
  .getElementById("story-btn-play")
  .addEventListener("click", togglePlayPause);

// 모달 열기
function modalOpen() {
  const modal = document.getElementById("story-modal-overlay");
  modal.classList.remove("modal-hidden");
}

document
  .getElementById("story-btn-meatball")
  .addEventListener("click", modalOpen);

// 모달 닫기 - 취소 버튼
document.querySelector("#btn-취소").addEventListener("click", () => {
  document.getElementById("story-modal-overlay").classList.add("modal-hidden");
});

// 모달 닫기 - 외부 영역
window.addEventListener("click", (event) => {
  const modal = document.getElementById("story-modal-overlay");
  if (event.target === modal) {
    modal.classList.add("modal-hidden");
  }
});

// 하단부 액션
const dmContainer = document.getElementById("story-bottom-dm");
const dmInput = document.getElementById("story-dm-form");
const heartButton = document.getElementById("story-btn-heart");
const dmButton = document.getElementById("story-btn-dm");
const quickemotionBtn = document.querySelectorAll(".quickemotion-btns button");
console.log("quickemotionBtn 초기화:", quickemotionBtn);

// 디엠 input form
// placeholder
function handlePlaceholder() {
  if (dmInput.textContent.trim() === "") {
    dmInput.classList.add("placeholder-active");
  } else {
    dmInput.classList.remove("placeholder-active");
  }
}
handlePlaceholder();
dmInput.addEventListener("input", handlePlaceholder);

// 입력창 focus 시 img 어둡게, 버튼 숨기고 입력창 확장
const dmOverlay = document.getElementById("story-dm-overlay");
const quickEmotion = document.getElementById("story-dm-quickemotion");

dmInput.addEventListener("focus", () => {
  dmOverlay.style.opacity = "1";
  heartButton.classList.add("btn-hidden");
  dmButton.classList.add("btn-hidden");
  dmContainer.classList.add("dm-expand");
  quickEmotion.classList.remove("quickemotion-hidden");
});

dmInput.addEventListener("blur", (event) => {
  const allButtons = [sendButton, ...Array.from(quickemotionBtn)];
  if (event.relatedTarget && allButtons.includes(event.relatedTarget)) {
    return;
  }

  dmOverlay.style.opacity = "0";
  heartButton.classList.remove("btn-hidden");
  dmButton.classList.remove("btn-hidden");
  dmContainer.classList.remove("dm-expand");
  dmContainer.classList.remove("send-btn-active");
  quickEmotion.classList.add("quickemotion-hidden");
});

// 보내기 버튼
function handleSend() {
  if (dmInput.textContent.trim() === "") {
    dmContainer.classList.remove("send-btn-active");
  } else {
    dmContainer.classList.add("send-btn-active");
  }
}
dmInput.addEventListener("input", handleSend);

// 보내기 버튼 클릭
const sendButton = document.getElementById("story-send-btn");
const sendModal = document.getElementById("story-send-modal");
sendButton.addEventListener("click", (event) => {
  event.stopPropagation();
  dmInput.textContent = "";
  dmContainer.classList.remove("send-btn-active");
  dmOverlay.style.opacity = "0";
  dmContainer.classList.remove("dm-expand");
  heartButton.classList.remove("btn-hidden");
  dmButton.classList.remove("btn-hidden");
  dmInput.classList.add("placeholder-active");
	quickEmotion.classList.add("quickemotion-hidden");
  dmInput.blur();
  sendModal.classList.add("send-modal-visible");
  sendModal.classList.remove("send-modal-hidden");
  setTimeout(() => {
    sendModal.classList.remove("send-modal-visible");
    sendModal.classList.add("send-modal-hidden");
  }, 1000);
});

// 빠른 공감 버튼 클릭
quickemotionBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    sendModal.classList.add("send-modal-visible");
    sendModal.classList.remove("send-modal-hidden");
    dmOverlay.style.opacity = "0";
    heartButton.classList.remove("btn-hidden");
    dmButton.classList.remove("btn-hidden");
    dmContainer.classList.remove("dm-expand");
    dmContainer.classList.remove("send-btn-active");
    quickEmotion.classList.add("quickemotion-hidden");
    dmInput.blur();

    setTimeout(() => {
      sendModal.classList.remove("send-modal-visible");
      sendModal.classList.add("send-modal-hidden");
    }, 1000);
  });
});

// 하트 버튼
const likedSVG = `<svg aria-label="좋아요 취소" class="x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>좋아요 취소</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;

const defaultSVG = `<svg aria-label="좋아요" class="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>좋아요</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>`;

function toggleHeartIcon() {
  const isLiked = heartButton.classList.toggle("heart-btn-clicked");

  heartButton.innerHTML = isLiked ? likedSVG : defaultSVG;

  if (isLiked) {
    animateRedBig();
  }
}

// 하트 버튼 애니메이션
function animateRedBig() {
  heartButton.style.transform = "scale(1.2)";
  heartButton.style.transition = "transform 0.1s ease";

  setTimeout(() => {
    heartButton.style.transform = "scale(1)";
  }, 150);
}

function animateGrayBig() {
  heartButton.style.transform = "scale(1.2)";
  heartButton.style.transition = "transform 0.1s ease";

  setTimeout(() => {
    heartButton.style.transform = "scale(1)";
  }, 150);
}

heartButton.addEventListener("mouseleave", () => {
  if (!heartButton.classList.contains("heart-btn-clicked")) {
    animateGrayBig();
  }
});

heartButton.addEventListener("click", toggleHeartIcon);
