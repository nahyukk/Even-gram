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

// 이미지 ui 작업 예정
// function renderImages(stories) {
	
// }

