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
});