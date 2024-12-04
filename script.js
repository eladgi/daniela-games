let correctAnswer = 0;
let score = 0;
let revealedParts = 0;
const puzzleParts = 9; // מספר חלקי הפאזל
const puzzleContainer = document.getElementById('puzzleContainer'); // אלמנט המכיל את הפאזל
const puzzleImage = document.getElementById('puzzleImage'); // התמונה המקורית

function generateExercise() {
    document.getElementById("userAnswer").value = ""
    const isAddition = Math.random() > 0.5;

    let num1, num2, exercise;

    if (isAddition) {
        num1 = Math.floor(Math.random() * 101);
        num2 = Math.floor(Math.random() * (101 - num1));
        exercise = `${num1} + ${num2}`;
        correctAnswer = num1 + num2;
    } else {
        num1 = Math.floor(Math.random() * 101);
        num2 = Math.floor(Math.random() * (num1 + 1));
        exercise = `${num1} - ${num2}`;
        correctAnswer = num1 - num2;
    }

    document.getElementById("textExercise").textContent = "השלם:";
    document.getElementById("numberExercise").textContent = exercise;
    document.getElementById("result").textContent = '';
    document.getElementById("userAnswer").value = '';
    document.getElementById("score").textContent = `ניקוד: ${score}`;
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("userAnswer").value);
    if (isNaN(userAnswer) || userAnswer < 0 || userAnswer > 100) {
        document.getElementById("result").textContent = "אנא הכנס מספר בין 0 ל-100.";
        document.getElementById("result").style.color = "darkred";
        document.getElementById("userAnswer").value = ""
        document.getElementById("userAnswer").focus();
        return;
    }
    const successSound = document.getElementById("successSound");
    const failureSound = document.getElementById("failureSound");

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("result").textContent = "תשובה נכונה!";
        document.getElementById("result").style.color = "green";
        successSound.play();
        setTimeout(() => {
            generateExercise();
            revealPuzzlePart();
        }, 1500);
    } else {
        document.getElementById("result").textContent = userAnswer + " היא לא התשובה הנכונה, נסה שוב.";
        document.getElementById("result").style.color = "darkred";
        failureSound.play();
        document.getElementById("userAnswer").value = ""
    }
    document.getElementById("userAnswer").focus();
}

function revealPuzzlePart() {
    if (revealedParts === puzzleParts) {
        revealedParts = 0;
        resetPuzzle();
    }
    revealedParts++;
    if (revealedParts <= puzzleParts) {
        let partSize = 100; // גודל כל חלק בפאזל
        let row = Math.floor((revealedParts - 1) / 3); // שורה של החלק הנוכחי
        let col = (revealedParts - 1) % 3; // עמודה של החלק הנוכחי
        let newPart = document.createElement('div'); // יצירת אלמנט div חדש עבור חלק הפאזל
        newPart.classList.add('puzzlePart'); // הוספת קלאס לאלמנט
        newPart.style.left = col * partSize + 'px'; // מיקום אופקי של החלק
        newPart.style.top = row * partSize + 'px'; // מיקום אנכי של החלק
        newPart.style.backgroundImage = `url(${puzzleImage.src})`; // רקע החלק הוא התמונה המקורית
        newPart.style.backgroundPosition = `-${col * partSize}px -${row * partSize}px`; // הזזת הרקע כדי להציג את החלק הנכון
        newPart.style.visibility = 'visible'; // הפיכת החלק לנראה
        puzzleContainer.appendChild(newPart); // הוספת החלק לאלמנט המכיל את הפאזל
    }
}

function resetPuzzle() {
    // הסרת כל חלקי הפאזל מהאלמנט המכיל אותם
    while (puzzleContainer.firstChild) {
        puzzleContainer.removeChild(puzzleContainer.firstChild);
    }
}

function initGame() {
    generateExercise();
    resetPuzzle();
}

initGame();

document.getElementById("userAnswer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});