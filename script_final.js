document.addEventListener("DOMContentLoaded", function () {
    // Fetch and initialize sliders
    fetch("./dslideData.json")
        .then(response => response.json())
        .then(data => {
            initializeSlider("featured-slide", "featured-prev", "featured-next", data.featuredSlides);
            initializeSlider("spotlight-slide", "spotlight-prev", "spotlight-next", data.spotlightSlides); // Adjust as needed
        })
        .catch(error => console.error("Error loading data:", error));

    function initializeSlider(slideContainerId, prevButtonId, nextButtonId, slidesData) {
        const slideContainer = document.querySelector(`#${slideContainerId} .slides`);
        const prevButton = document.getElementById(prevButtonId);
        const nextButton = document.getElementById(nextButtonId);

        slidesData.forEach(slide => {
            const slideItem = document.createElement('div');
            slideItem.classList.add('slide-item');
            slideItem.style.backgroundImage = `url(${slide.backgroundImage})`;
            slideItem.innerHTML = `
                <div class="content">
                    <h3>${slide.name}</h3>
                    <p>${slide.description}</p>
                </div>
            `;
            slideContainer.appendChild(slideItem);
        });

        let currentIndex = 0;

        function updateSlider() {
            const offset = -currentIndex * 100;
            slideContainer.style.transform = `translateX(${offset}%)`;
        }

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slidesData.length - 1;
            updateSlider();
        });

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex < slidesData.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });

        updateSlider();
    }
});
