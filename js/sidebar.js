import { initializeDarkMode } from "./darkModeManager.js";
import { toggleDarkMode } from "./darkModeManager.js";

document.addEventListener("DOMContentLoaded", () => {
	initializeDarkMode();
	loadButtonActions();
	toggleDarkModeHandler();
});

export function loadButtonActions() {
	const toggleButton = document.querySelector(".dropdown");
	const sunButton = document.querySelector(".mode-toggle");
	const backButton = document.querySelector(".backbtn");
	const moreMenu = document.getElementById("moreMenu");
	const modeMenu = document.getElementById("modeMenu");
	const darkModeToggle = document.getElementById("darkModeToggle");
	const searchMenu = document.querySelector(".search-tab");
	const searchBtn = document.getElementById("search-btn");
	const leftcontainer = document.querySelector(".left-container");

	// 더보기 버튼 클릭 시 메뉴 표시/숨김
	toggleButton.addEventListener("click", (event) => {
		event.stopPropagation(); // 이벤트 버블링 방지
		moreMenu.classList.toggle("hidden");
	});

	modeMenu.addEventListener("click", (event) => {
		event.stopPropagation();
		modeMenu.classList.toggle("hidden");
	});

	if (searchMenu) { // 없을 경우 실행 안함
		searchMenu.addEventListener("click", (event) => {
			event.stopPropagation();
			modeMenu.classList.add("hidden");
			moreMenu.classList.add("hidden");
		});
	}

	// 페이지 외부 클릭 시 메뉴 닫기
	document.addEventListener("click", () => {
		moreMenu.classList.add("hidden");
		modeMenu.classList.add("hidden");
		searchMenu.classList.remove("show");
		leftcontainer.classList.remove("small");
	});

	// 모드 전환 클릭 시 메뉴 표시/숨김
	sunButton.addEventListener("click", (event) => {
		event.stopPropagation();
		modeMenu.classList.remove("hidden"); // 모드전환 메뉴가 나타나는 부분
		moreMenu.classList.add("hidden"); // 더보기 메뉴 숨기는 부분
		searchMenu.classList.remove("show");
		leftcontainer.classList.remove("small");
	});

	// 뒤로 가기 버튼 클릭시 메뉴 닫기
	backButton.addEventListener("click", (event) => {
		event.stopPropagation();
		modeMenu.classList.add("hidden");
		moreMenu.classList.remove("hidden"); //더보기 메뉴 다시 표시하는 부분
	});

	// 검색 탭 클릭시 메뉴 표시/숨김
	if (searchBtn) { // 없을 경우 실행 안함
		searchBtn.addEventListener("click", (event) => {
			event.stopPropagation();
			searchMenu.classList.toggle("show");
			leftcontainer.classList.toggle("small");
			modeMenu.classList.add("hidden");
		});
	}

	// 다크 모드 변환시
	darkModeToggle.addEventListener("click", (event) => {
		event.stopPropagation();
		modeMenu.classList.remove("hidden");
		searchMenu.classList.remove("show");
		leftcontainer.classList.remove("small");
	});
}

export function toggleDarkModeHandler() {
	const darkModeToggle = document.getElementById("darkModeToggle");
	// 다크 모드 변환 시 바뀌는 부분
	darkModeToggle.addEventListener("change", (event) => {
		const isDarkMode = event.target.checked;
		toggleDarkMode(isDarkMode);
		const icons = document.querySelectorAll(
			".logo-container img, .middle-container img, .bottom-container img, .mode-menu img, .dropdown-menu img, .min-bottom-btn img, .left-sidebar-min-header img, .search-box-icon img"
		); //sidebar의 아이콘 변경
		const menus = document.querySelectorAll(".dropdown-menu, .mode-menu");

		// 드롭다운 메뉴들 다크모드 변경
		menus.forEach((menu) => {
			menu.style.backgroundColor = isDarkMode ? "#272727" : "#ffffff"; //dropdown-menu 변경
			menu.style.color = isDarkMode ? "#ffffff" : "#000000";
		});

		// 아이콘 다크모드 변경
		icons.forEach((icon) => {
			const originSrc = icon.getAttribute("src");
			if (isDarkMode) {
				icon.setAttribute("src", originSrc.replace("icons/", "icons/dark_"));
			} else {
				icon.setAttribute("src", originSrc.replace("icons/dark_", "icons/"));
			}
		});
	});
}

function toggleSearch(isFocused) {
	const searchBar = document.querySelector(".min-search-box");
	const clearIcon = document.getElementById("clear-icon");
	const iconSection = document.getElementById("icon-section");

	if (isFocused) {
		searchBar.classList.add("focused");
		iconSection.classList.add("focused");
		clearIcon.style.display = "block";
		if (iconSection) iconSection.style.display = "none";
	} else {
		searchBar.classList.remove("focused");
		clearIcon.style.display = "none";
		if (iconSection) iconSection.style.display = "flex";
	}
}

function clearSearch() {
	const searchInput = document.getElementById("search-input");
	searchInput.value = "";
	searchInput.blur();
	toggleSearch(false);
}
