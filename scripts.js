// Function to handle scrolling animation
function handleScrollAnimation() {
    const items = document.querySelectorAll('.animate');
    const triggerBottom = window.innerHeight * 0.85;
  
    items.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
  
      if (itemTop < triggerBottom) {
        item.classList.add('show');
      } else {
        item.classList.remove('show');
      }
    });
  }
  
  // Event listener for scrolling
  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation();
  
  // Function to truncate text in <p> elements
  function truncateText() {
    const paragraphs = document.querySelectorAll('.news-item p, .spotlight-item p');
    const maxLength = 100; // Maximum length before truncating
    paragraphs.forEach(p => {
      if (p.textContent.length > maxLength) {
        const truncated = p.textContent.substring(0, maxLength) + '...';
        p.textContent = truncated;
      }
    });
  }
  
  // Function to load data from JSON file and display it
  function loadData(jsonFile, containerSelector, itemClass, detailPage, filterCategory = 'all') {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        const container = document.querySelector(containerSelector);
        container.innerHTML = '';
        data.forEach((item, index) => {
          if (filterCategory === 'all' || item.category === filterCategory) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add(itemClass, 'animate');
            itemDiv.innerHTML = `
              <img src="${item.image[0]}" alt="${itemClass} Image">
              <h3>${item.title || ''}</h3>
              <p>${item.description}</p>
              <p class="news-time">${new Date(item.time).toLocaleString()}</p>
            `;
            itemDiv.addEventListener('click', () => {
              window.location.href = `${detailPage}?id=${index}`;
            });
            container.appendChild(itemDiv);
          }
        });
        truncateText();
        handleScrollAnimation();
      })
      .catch(error => console.error(`Error loading data from ${jsonFile}:`, error));
  }
  
  // Load data for All News section
  loadData('./data/newsData.json', '.news-list', 'news-item', 'news.html');
  
  // Load data for each category-specific spotlight section
  const categories = ['politics', 'life', 'business', 'entertainment'];
  
  categories.forEach(category => {
    loadData('./data/newsData.json', `.spotlight-list.${category}`, 'spotlight-item', 'news.html', category);
  });
  
  // Function to filter news by category
  function filterNewsByCategory(category) {
    loadData('./data/newsData.json', '.news-list', 'news-item', 'news.html', category);
  }
  
  // Event listeners for category filtering
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const category = event.target.dataset.category;
      filterNewsByCategory(category);
    });
  });
  
  const playPauseButton = document.getElementById('play-pause-button');
  const playPauseIcon = document.getElementById('play-pause-icon');
  const audioPlayer = document.getElementById('audio-player');
  const progress = document.getElementById('progress');
  const currentTimeDisplay = document.getElementById('current-time');
  const totalTimeDisplay = document.getElementById('total-time');
  const volumeSlider = document.getElementById('volume-slider');
  
  playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play().catch(error => console.error('Error playing audio:', error));
      playPauseIcon.classList.remove('fa-play');
      playPauseIcon.classList.add('fa-pause');
    } else {
      audioPlayer.pause();
      playPauseIcon.classList.remove('fa-pause');
      playPauseIcon.classList.add('fa-play');
    }
  });
  
  audioPlayer.addEventListener('timeupdate', () => {
    const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${progressPercentage}%`;
  
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    const totalMinutes = Math.floor(audioPlayer.duration / 60);
    const totalSeconds = Math.floor(audioPlayer.duration % 60);
  
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  });
  
  audioPlayer.addEventListener('loadedmetadata', () => {
    const totalMinutes = Math.floor(audioPlayer.duration / 60);
    const totalSeconds = Math.floor(audioPlayer.duration % 60);
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  });
  
  // Volume control
  volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
  });
  
  // Function to load data from JSON file and display it
  function loadSliderData(jsonFile, containerSelector) {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        const container = document.querySelector(containerSelector);
        container.innerHTML = '';
        data.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item');
          itemDiv.style.backgroundImage = `url(${item.backgroundImage})`;
          itemDiv.innerHTML = `
            <div class="content">
              <div class="name">${item.name}</div>
              <div class="des" style="background-color: rgba(242, 157, 252, 0.5);">${item.description}</div>
            </div>
          `;
          container.appendChild(itemDiv);
        });
      })
      .catch(error => console.error(`Error loading data from ${jsonFile}:`, error));
  }
  
  // Load data for Fun Bug slider
  loadSliderData('./data/slideData.json', '#slide');
  
  // Slider navigation logic
  document.getElementById('next').onclick = function () {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
  }
  document.getElementById('prev').onclick = function () {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
  }
  
  // Function to load grid data from JSON file and display it
  function loadGridData(jsonFile, containerSelector) {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        const container = document.querySelector(containerSelector);
        container.innerHTML = '';
        data.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('grid-item', 'animate');
          itemDiv.innerHTML = `
            <img src="${item.image}" alt="Student Image">
            <div class="quote ${item.quotePosition}">${item.quote}</div>
          `;
          container.appendChild(itemDiv);
        });
      })
      .catch(error => console.error(`Error loading data from ${jsonFile}:`, error));
  }
  
  // Load data for the grid section
  loadGridData('./data/gridData.json', '.grid-section');