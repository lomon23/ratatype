if (window.location.pathname.includes('test')) {  // Замість 'test.html', перевіряємо тільки 'test'
  const urlParams = new URLSearchParams(window.location.search);
  const text = urlParams.get("text") || "HELLOWORLD"; // За замовчуванням "HELLOWORLD"

  let currentIndex = 0;
  let errorCount = 0;
  let correctCount = 0;
  let startTime = null;
  let timerInterval = null;

  const textContainer = document.getElementById("text-container");
  const errorCountSpan = document.getElementById("error-count");
  const accuracySpan = document.getElementById("accuracy");
  const timerSpan = document.getElementById("timer");

  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.id = `letter-${index}`;
    span.style.color = index === currentIndex ? "green" : "black";
    textContainer.appendChild(span);
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    const currentLetter = text[currentIndex];

    if (startTime === null) {
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 100);
    }

    if (key.toUpperCase() === currentLetter.toUpperCase()) {
      const span = document.getElementById(`letter-${currentIndex}`);
      span.style.visibility = "hidden";
      currentIndex++;
      correctCount++;

      if (currentIndex === text.length) {
        clearInterval(timerInterval);
        alert("Congratulations! You typed all the letters!");
      } else {
        const nextSpan = document.getElementById(`letter-${currentIndex}`);
        nextSpan.style.color = "green";
      }

      updateAccuracy();
    } else {
      const span = document.getElementById(`letter-${currentIndex}`);
      errorCount++;
      errorCountSpan.textContent = errorCount;

      span.style.color = "red";
      setTimeout(() => {
        span.style.color = "black";
      }, 300);
    }
  });

  function updateAccuracy() {
    const accuracy = ((correctCount / (correctCount + errorCount)) * 100).toFixed(2);
    accuracySpan.textContent = accuracy;
  }

  function updateTimer() {
    const elapsedTime = ((new Date() - startTime) / 1000).toFixed(2);
    timerSpan.textContent = elapsedTime;
  }
}
