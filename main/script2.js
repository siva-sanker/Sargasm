document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const startButton = document.getElementById('start-btn');

  startButton.addEventListener('click', () => {
      // Add the hidden class to trigger the fade-out effect
      introOverlay.classList.add('hidden');

      // Optionally remove the overlay element after the transition ends
      setTimeout(() => {
          introOverlay.style.display = 'none';
      }, 1000); // Matches the transition duration in CSS (1s)
  });
});


// Video sources for each section
const videoSources = {
    aboutMe: ['videos/really-am/ambi.mp4'],
    whatPeopleThink: ['videos/what-ppl-think/kochi.mp4', 'videos/what-ppl-think/mrmaru.mp4','videos/what-ppl-think/salaam.mp4'],
    whatIReallyAm: [''],
    education: ['videos/education/educate.mp4','videos/education/kattappana.mp4'],
    roleModels: ['videos/rolemodels/JC.mp4','videos/rolemodels/shanks.mp4',
      'videos/rolemodels/dp.mp4','videos/rolemodels/ironman.mp4','videos/rolemodels/stewie.mp4','videos/rolemodels/skipper.mp4'],
    hobbies: ['videos/hobbies/food.mp4','videos/hobbies/sing.mp4','videos/hobbies/tv.mp4','videos/hobbies/frnds.mp4']
  };
  // Track the current index for each section
  const currentVideoIndices = Object.fromEntries(
    Object.keys(videoSources).map(sectionId => [sectionId, 0])
  );
  
  window.onload = function () {
    for (const [sectionId, videoArray] of Object.entries(videoSources)) {
      const section = document.getElementById(sectionId);
  
      if (!section) {
        console.error(`Section with ID "${sectionId}" not found in HTML.`);
        continue;
      }
  
      const video = section.querySelector('.background-video');
      if (!video) {
        console.error(`.background-video not found in section with ID "${sectionId}".`);
        continue;
      }
  
      // Add hover events to start playing videos in sequence
      section.addEventListener('mouseenter', () => {
        const currentIndex = currentVideoIndices[sectionId];
        video.src = videoArray[currentIndex]; // Set the video source
        video.volume = 0.75; // Set volume
        video.classList.remove('hidden'); // Ensure the video is visible
        video.play(); // Play the video
      });
  
      // Add an event listener for the `ended` event to play the next video
      video.addEventListener('ended', () => {
        // Update to the next video index in the array
        currentVideoIndices[sectionId] = (currentVideoIndices[sectionId] + 1) % videoArray.length;
  
        // Set the source to the next video and play it
        const nextIndex = currentVideoIndices[sectionId];
        video.src = videoArray[nextIndex];
        video.play();
      });
  
      // Ensure video pauses when the user leaves the section
      section.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Reset to the start
      });
    }
  };  

//   Navbar functionality 

  document.addEventListener("DOMContentLoaded", function () {
    const navbarLinks = document.querySelectorAll(".navbar a");

    // Add smooth scroll behavior for each navbar link
    navbarLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the default anchor link behavior
        
        const targetId = this.getAttribute("href").slice(1); // Get the target section ID
        const targetSection = document.getElementById(targetId);

        // Scroll to the section with smooth behavior
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });
  
// Scroll to top button functionality 

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Show button when scrolling down
  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  // Scroll to top when button is clicked
  scrollToTopBtn.onclick = function () {
    // Create the "Going up!" message
    const message = document.createElement("div");
    message.id = "goingUpMessage";
    message.innerHTML = "Pattiche!!";
    message.style.position = "fixed";
    message.style.top = "110px";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.color = "white";
    message.style.padding = "10px 20px";
    message.style.borderRadius = "5px";
    message.style.fontSize = "35px";
    message.style.zIndex = "9999";
    message.style.display = "none";
    
    // Append the message to the body
    document.body.appendChild(message);
    
    // Show the message briefly
    setTimeout(() => {
      message.style.display = "block"; // Show message
    }, 10); // Small delay to trigger animation

    // Automatically hide the message after 1 second and scroll to top
    setTimeout(() => {
      message.style.display = "none"; // Hide message
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 285); // .5 seconds message duration
  };


  const sendButton = document.getElementById('send-btn');

  sendButton.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!name || !comment) {
      alert("Form ninte 'appan' vann filleyyo");
      return;
    }

    const randomMessages = [
      "Do you like coding?",
      "Is JavaScript your favorite language?",
      "Do you enjoy problem-solving?"
    ];

    let questionIndex = 0;

    function askNextQuestion() {
      if (questionIndex < randomMessages.length) {
        const userResponse = confirm(randomMessages[questionIndex]);
        questionIndex++;
        askNextQuestion();
      } else {
        alert("Mmmm Pokko ;>");
      }
    }

    askNextQuestion();
  });

  // When mouse hovers over the button
  sendButton.addEventListener("mouseover", () => {
    sendButton.textContent = ""; // Clear the button text
    sendButton.insertAdjacentHTML("afterbegin", "Send?");
  });

  // When mouse moves out of the button
  sendButton.addEventListener("mouseout", () => {
    sendButton.textContent = ""; // Reset the button text
    sendButton.insertAdjacentHTML("afterbegin", "Send");
  });