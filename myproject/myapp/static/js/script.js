if (window.location.pathname.includes('test')) {
    console.log("Тест почався");

    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get("text") || "HELLOWORLD"; // Текст за замовчуванням
    let currentIndex = 0;
    let errorCount = 0;
    let typedCharacters = []; // Це масив для всіх введених символів (правильних і неправильних)
    let startTime = null;
    let timerInterval = null;
    let isTestFinished = false;
    const maxTime = 30; // Фіксований час у секундах

    const textContainer = document.getElementById("text-container");
    const errorCountSpan = document.getElementById("error-count");
    const accuracySpan = document.getElementById("accuracy");
    const timerSpan = document.getElementById("timer");

    // Ініціалізація тексту
    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.id = `letter-${index}`;
        span.style.color = "black";
        textContainer.appendChild(span);
    });

    // Ініціалізація таймера (відлік від 30 до 0)
    let timeLeft = maxTime;
    timerSpan.textContent = timeLeft;

    document.addEventListener("keydown", (event) => {
        if (isTestFinished) return;

        const key = event.key;

        // Старт таймера при першому натисканні
        if (startTime === null) {
            startTime = new Date();
            timerInterval = setInterval(updateTimer, 1000); // Оновлювати кожну секунду
            setTimeout(finishTest, maxTime * 1000); // Закінчення тесту через 30 секунд
        }

        console.log("Клавіша натиснута:", key);

        // Обробка Backspace
        if (key === "Backspace") {
            console.log("Backspace натиснуто");
            if (currentIndex > 0) {
                currentIndex--;
                const span = document.getElementById(`letter-${currentIndex}`);
                span.style.color = "black"; // Повернення кольору до чорного
                typedCharacters.pop(); // Видаляємо останній символ
                updateAccuracy();
            }
            return;
        }

        // Ігнорувати інші непотрібні клавіші
        if (key.length > 1) {
            return;
        }

        // Обробка символів
        const currentLetter = text[currentIndex];
        const span = document.getElementById(`letter-${currentIndex}`);

        if (key === currentLetter) {
            span.style.color = "green"; // Правильна буква
            typedCharacters.push({ char: key, correct: true });
        } else {
            span.style.color = "red"; // Неправильна буква
            errorCount++;
            errorCountSpan.textContent = errorCount;
            typedCharacters.push({ char: key, correct: false });
        }

        currentIndex++;

        // Якщо ввели весь текст, завершити тест
        if (currentIndex >= text.length) {
            finishTest();
        }

        updateAccuracy();
    });

    function updateAccuracy() {
        const correctCount = typedCharacters.filter((item) => item.correct).length;
        const totalTyped = typedCharacters.length;
        const accuracy = totalTyped > 0 ? ((correctCount / totalTyped) * 100).toFixed(2) : 100;
        accuracySpan.textContent = accuracy;
    }

    function updateTimer() {
        if (timeLeft <= 0) return; // Якщо час вичерпано, не оновлювати

        timeLeft--;
        console.log("Час залишився:", timeLeft);
        timerSpan.textContent = timeLeft;
    }

    function finishTest() {
        if (isTestFinished) return;

        isTestFinished = true;
        clearInterval(timerInterval);

        const correctCount = typedCharacters.filter((item) => item.correct).length;
        const totalTyped = typedCharacters.length;
        const accuracy = totalTyped > 0 ? ((correctCount / totalTyped) * 100).toFixed(2) : 100;

        const wordsTyped = totalTyped / 5; // Вважаємо, що слово = 5 символів
        const wordsPerSecond = (wordsTyped / maxTime).toFixed(2);

        alert(`
          Час вичерпано!
          Помилок: ${errorCount}
          Точність: ${accuracy}%
          Швидкість: ${wordsPerSecond} слів/секунду
        `);
    }
}
