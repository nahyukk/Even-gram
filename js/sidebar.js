document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.dropdown');
    const sunButton = document.querySelector('.mode-toggle');
    const backButton = document.querySelector('.backbtn');
    const moreMenu = document.getElementById('moreMenu');
    const modeMenu = document.getElementById('modeMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');


    // 더보기 버튼 클릭 시 메뉴 표시/숨김
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        moreMenu.classList.toggle('hidden');
    });

    modeMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        modeMenu.classList.toggle('hidden');   // 모드 전환 메���가 나타나는 부분
    });


    // 페이지 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', () => {
        moreMenu.classList.add('hidden');
        modeMenu.classList.add('hidden');
    });


    // 모드 전환 클릭 시 메뉴 표시/숨김
    sunButton.addEventListener('click', (event) => {
        event.stopPropagation();
        modeMenu.classList.remove('hidden');   // 모드전환 메뉴가 나타나는 부분
        moreMenu.classList.add('hidden');   // 더보기 메뉴 숨기는 부분
    });

    // 뒤로 가기 버튼 클릭시 메뉴 닫기
    backButton.addEventListener('click', (event) => {
        event.stopPropagation();
        modeMenu.classList.add('hidden');
        moreMenu.classList.remove('hidden');    //더보기 메뉴 다시 표시하는 부분
    });

    // 다크 모드 변환시
    darkModeToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        modeMenu.classList.remove('hidden');
    });

    // 다크 모드 변환 시 바뀌는 부분
    darkModeToggle.addEventListener('change', (event) => {
        const isDarkMode = event.target.checked;
        const icons = document.querySelectorAll('.logo-container img, .middle-container img, .bottom-container img, .mode-menu img');    //sidebar의 아이콘 변경
        const menus = document.querySelectorAll('.dropdown-menu, .mode-menu');
        const body = document.body;
        const sidebar = document.querySelector('.left-container');
        const hrEle = document.querySelectorAll('#moreMenu hr, #menu-header hr');

        body.style.backgroundColor = isDarkMode ? "#121212" : "#ffffff";   // body 적용 부분
        body.style.color = isDarkMode ? "#ffffff" : "#000000";
        sidebar.style.backgroundColor = isDarkMode ? "#121212" : "#ffffff"; // 사이드바 부분 적용
        sidebar.style.borderColor = isDarkMode ? "#383838" : "#dbdbdb";    // 사이드바 border 부분 적용

        // 드롭다운 메뉴들 다크모드 변경
        menus.forEach((menu) => {
            menu.style.backgroundColor = isDarkMode ? "#272727" : "#ffffff";    //dropdown-menu 변경
            menu.style.color = isDarkMode ? "#ffffff" : "#000000";
        });

        hrEle.forEach((hr) => {
            hr.style.borderColor = isDarkMode ? "#444444" : "#dbdbdb4d";
            hr.style.backgroundColor = isDarkMode ? "#444444" : "#dbdbdb4d";
        });

        if (isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }

        // 아이콘 다크모드 변경
        icons.forEach((icon) => {
            const originSrc = icon.getAttribute('src');
            if (isDarkMode) {
                icon.setAttribute('src', originSrc.replace('icons/', 'icons/dark_'));
            } else {
                icon.setAttribute('src', originSrc.replace('icons/dark_', 'icons/'));
            }
        });
    });
});