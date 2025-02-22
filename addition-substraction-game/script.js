let correctAnswer = 0;
let score = 0;
let revealedParts = 0;
const puzzleParts = 9; // מספר חלקי הפאזל
const puzzleContainer = document.getElementById('puzzleContainer'); // אלמנט המכיל את הפאזל
const puzzleImage = document.getElementById('puzzleImage'); // התמונה המקורית
const puzzles = ['images/student.webp', 'images/sport.png', 'images/candy.webp', 'images/smurfs.webp', 'images/sloth_circus.jpg', 'images/animal_class.jpg']; // מערך נתיבי התמונות
let currentPuzzleIndex = 0; // אינדקס התמונה הנוכחית
let allPuzzlesCompleted = false; // משתנה לבדיקה האם כל הפאזלים הושלמו

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
        nextPuzzle();
        return;
    }
    revealedParts++;
    if (revealedParts <= puzzleParts && !allPuzzlesCompleted) { // added a condition to prevent drawing new part after completion
        let partSize = 100; // גודל כל חלק בפאזל
        let row = Math.floor((revealedParts - 1) / 3); // שורה של החלק הנוכחי
        let col = (revealedParts - 1) % 3; // עמודה של החלק הנוכחי
        let newPart = document.createElement('div'); // יצירת אלמנט div חדש עבור חלק הפאזל
        newPart.classList.add('puzzlePart'); // הוספת קלאס לאלמנט
        newPart.style.left = col * partSize + 'px'; // מיקום אופקי של החלק
        newPart.style.top = row * partSize + 'px'; // מיקום אנכי של החלק
        newPart.style.backgroundImage = `url(${puzzles[currentPuzzleIndex]})`; // רקע החלק הוא התמונה הנוכחית
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

function nextPuzzle() {
    if (currentPuzzleIndex === puzzles.length - 1) {
        allPuzzlesCompleted = true;
        showConfetti();
        showSuccessMessage();
        return; // prevent changing puzzle index after completion
    }

    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length; // קידום אינדקס התמונה וחזרה ל-0 בסוף המערך
    puzzleImage.src = puzzles[currentPuzzleIndex]; // טעינת התמונה החדשה
}

function showConfetti() {
    confetti.create(document.getElementById('confettiCanvas'), {
        resize: true,
        useWorker: true,
    })({ 
        particleCount: 1000, // פחות חלקיקים
        spread: 360, // פיזור רחב יותר
        origin: { y: 0.6 },
        scalar: 1.5, // הגדלת גודל החלקיקים
        gravity: 0.2, // האטת הנפילה
        ticks: 600 // הארכת משך הזמן
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'כל הכבוד! אתם אלופי החשבון!';
    successMessage.style.display = 'block';
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