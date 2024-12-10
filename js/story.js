// id로 요소 가져오기 작업예정
// const storyMainImg = document.getElementById("story-main-img");
// const storyProfileImg = document.getElementById("story-profile-img");
// const storyProfileName = document.getElementById("story-profile-name");
// const storyUploadTime = document.getElementById("story-upload-time");


// json 데이터 가져오기
fetch('./json/stories.json')
	.then(response => {
		if(!response.ok) {
			throw new Error('업로드 대실패!')
		}
		return response.json();
	})
	.then(data => {
		console.log("story", data);
	})

// json 데이터 가져오고 출력
function updateStory(storyData) {

}
// 재생 - 일시정지 버튼 
let isPlaying = true;

function togglePlayPause() {
	isPlaying = !isPlaying;

	const storyPlayButton = document.getElementById("story-btn-play");

	if (isPlaying) {
		storyPlayButton.innerHTML = `<svg aria-label="재생" class="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>재생</title><path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path></svg>`
	} else {
		storyPlayButton.innerHTML = `<svg aria-label="일시 정지" class="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="16" role="img" viewBox="0 0 48 48" width="16"><title>일시 정지</title><path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path></svg>`
	}
}	

document.getElementById("story-btn-play").addEventListener("click", togglePlayPause);


// 이미지 ui 작업 예정
// function renderImages(stories) {
	
// }
