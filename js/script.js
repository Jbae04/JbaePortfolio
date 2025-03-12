// Real-time clock and date
function updateDateTime() {
    const now = new Date();
    // Format time: HH:MM:SS
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', timeOptions);
    
    // Format date: weekday, month day, year
    const dateOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    const dateText = now.toLocaleDateString('en-US', dateOptions).toLowerCase();
    document.getElementById('date').textContent = dateText;
  }
  
  // Theme toggle
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    // Update active state on buttons
    document.querySelectorAll('.theme-button').forEach(button => {
      if (button.classList.contains(theme)) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    // Store preference
    localStorage.setItem('theme', theme);
  }
  
  // Create snowflake effect
  function createSnowflakes() {
    const container = document.getElementById('snow-container');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    // Create about 50 snowflakes (reduced from 70 for better visibility of each)
    for (let i = 0; i < 70; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      
      // Random position
      const posX = Math.random() * screenWidth;
      const posY = Math.random() * screenHeight;
      
      // Random size (3px to 6px) - increased from original
      const size = Math.random() * 3 + 3;
      
      // Apply styles
      snowflake.style.left = `${posX}px`;
      snowflake.style.top = `${posY}px`;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.opacity = Math.random() * 0.6 + 0.3; // Increased opacity
      
      // Snowflake animation behavior in the background
      const speedY = Math.random() * 0.5 + 0.2; // Fall speed reduced from original
      const speedX = Math.random() * 0.3 - 0.15; // Drift speed reduced from original
      
      // Animation function for snowflake
      function animateSnowflake() {
        let currentY = parseFloat(snowflake.style.top);
        let currentX = parseFloat(snowflake.style.left);
        currentY += speedY;
        currentX += speedX;
        
        // Reset it if it's off-screen
        if (currentY > screenHeight) {
          currentY = -10;
          currentX = Math.random() * screenWidth;
        }
        if (currentX < 0) currentX = screenWidth;
        if (currentX > screenWidth) currentX = 0;
        
        snowflake.style.top = `${currentY}px`;
        snowflake.style.left = `${currentX}px`;
        requestAnimationFrame(animateSnowflake);
      }
      
      container.appendChild(snowflake);
      requestAnimationFrame(animateSnowflake);
    }
  }
  
  // Window resize handling
  function handleResize() {
    const container = document.getElementById('snow-container');
    container.innerHTML = '';
    createSnowflakes();
    
    // Re-center content vertically when window is resized
    adjustContentPosition();
  }
  
  // Function to adjust content position based on viewport height
  function adjustContentPosition() {
    const container = document.querySelector('.container');
    const content = document.querySelector('.content');
    const viewportHeight = window.innerHeight;
    
    // Ensure container properly fills viewport
    container.style.minHeight = `${viewportHeight}px`;
  }
  
  // Loading the saved theme
  function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    function openGmail(event) {
        event.preventDefault();
        const emailAddress = "bae.joseph04@gmail.com";
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
        window.open(gmailComposeUrl, '_blank');
      }
  }
  
  // Initialization
  document.addEventListener('DOMContentLoaded', function() {
    // Starting clock
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Create the snow effect
    createSnowflakes();
    
    // Initial position adjustment
    adjustContentPosition();
    
    // Handle the window resizing
    window.addEventListener('resize', handleResize);
    
    // Load the theme
    loadSavedTheme();
    const emailButton = document.getElementById('email-button');
    if (emailButton) {
      emailButton.addEventListener('click', function(event) {
        event.preventDefault();
        const emailAddress = "bae.joseph04@gmail.com";
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
        window.open(gmailComposeUrl, '_blank');
      });
    }
  });