// Ensure the script runs only when the screen width is 767px or below
const checkScreenWidth = () => {
    if (window.innerWidth <= 767) {
        activateMobileFeatures();
    }
};

const activateMobileFeatures = () => {
    // Add '2시간' label above the photo
    const photoContainer = document.querySelector('.photo-container');
    if (photoContainer && !document.querySelector('.time-label')) {
        const timeLabel = document.createElement('div');
        timeLabel.className = 'time-label';
        timeLabel.textContent = '2시간';
        photoContainer.prepend(timeLabel);
    }

    // Handle button transitions (Pause → Meatball → Close)
    const button = document.querySelector('.action-button');
    if (button) {
        button.addEventListener('click', () => {
            if (button.classList.contains('pause-button')) {
                button.classList.replace('pause-button', 'meatball-button');
                button.textContent = '미트볼';
            } else if (button.classList.contains('meatball-button')) {
                button.classList.replace('meatball-button', 'close-button');
                button.textContent = '엑스';
            } else if (button.classList.contains('close-button')) {
                window.location.href = '/'; // Redirect to home
            }
        });
    }

    // DM Section
    const dmSection = document.querySelector('.dm-section');
    if (!dmSection) {
        const dmContainer = document.createElement('div');
        dmContainer.className = 'dm-section';
        dmContainer.innerHTML = `
            <input type="text" placeholder="메시지를 입력하세요" class="dm-input">
            <button class="dm-send-button">보내기</button>
        `;
        document.body.append(dmContainer);
    }

    // Story Transition Effect
    const storyContainer = document.querySelector('.story-container');
    if (storyContainer) {
        let currentIndex = 0;
        const stories = document.querySelectorAll('.story');

        const showStory = (index) => {
            stories.forEach((story, i) => {
                story.style.transform = `translateX(${(i - index) * 100}%)`;
            });
        };

        // Auto transition
        setInterval(() => {
            currentIndex = (currentIndex + 1) % stories.length;
            showStory(currentIndex);
        }, 5000); // 5 seconds

        // Click transition
        storyContainer.addEventListener('click', (e) => {
            const clickX = e.clientX;
            const containerWidth = storyContainer.offsetWidth;

            if (clickX < containerWidth / 5) {
                // Move to the previous story
                currentIndex = (currentIndex - 1 + stories.length) % stories.length;
            } else if (clickX > containerWidth * 4 / 5) {
                // Move to the next story
                currentIndex = (currentIndex + 1) % stories.length;
            }

            showStory(currentIndex);
        });

        showStory(currentIndex); // Initialize
    }
};

// Listen for screen resize events
window.addEventListener('resize', checkScreenWidth);

// Initialize on page load
checkScreenWidth();
