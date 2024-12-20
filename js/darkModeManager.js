export function initializeDarkMode() {
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
	const savedTheme = localStorage.getItem("color-theme");

	// 로컬 스토리지에 저장된 테마가 있으면 해당 테마 적용
	// 아니면 os에 해당하는 테마 적용
	let currentTheme =
		savedTheme || (prefersDarkScheme.matches ? "dark" : "light");
	document.documentElement.classList.add(currentTheme);
	document.body.classList.add(currentTheme);

	console.log(currentTheme);
	console.log(document.body.classList);

	// 브라우저 설정 변경 시 동기화
	prefersDarkScheme.addEventListener("change", (e) => {
		const newTheme = e.matches ? "dark" : "light";
		document.documentElement.classList.add(newTheme);
		localStorage.setItem("color-theme", newTheme);
	});
}

export function toggleDarkMode(isDarkMode) {
	const newTheme = isDarkMode ? "dark" : "light";
	const currentTheme = document.documentElement.getAttribute("dark");
	document.documentElement.setAttribute("dark", newTheme);
	document.documentElement.classList.remove(currentTheme);
	document.documentElement.classList.add(newTheme);

	localStorage.setItem("color-theme", newTheme);
}
