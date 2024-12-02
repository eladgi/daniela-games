let correctAnswer = 0;
let score = 0;  // משתנה לניקוד

function generateExercise() {
    // ייצור תרגיל אקראי
    const isAddition = Math.random() > 0.5; // חיבור או חיסור
    
    let num1, num2, exercise;
    
    if (isAddition) {
        // חיבור, סכום עד 100
        num1 = Math.floor(Math.random() * 101); // מספר בין 0 ל-100
        num2 = Math.floor(Math.random() * (101 - num1)); // מספר כך שסכום השניים לא יעלה על 100
        exercise = `${num1} + ${num2}`;
        correctAnswer = num1 + num2;
    } else {
        // חיסור, תמיד תוצאה חיובית
        num1 = Math.floor(Math.random() * 101); // מספר בין 0 ל-100
        num2 = Math.floor(Math.random() * (num1 + 1)); // מספר כך שהתוצאה תהיה חיובית
        exercise = `${num1} - ${num2}`;
        correctAnswer = num1 - num2;
    }

    // הצגת התרגיל במסך
    document.getElementById("textExercise").textContent = "השלם:";
    document.getElementById("numberExercise").textContent = exercise; // הצגת המספרים
    document.getElementById("result").textContent = '';
    document.getElementById("userAnswer").value = '';
    document.getElementById("score").textContent = `ניקוד: ${score}`;  // הצגת הניקוד
}

// פונקציה לבדוק את התשובה
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("userAnswer").value);
    if (userAnswer === correctAnswer) {
        score++;  // הגדלת הניקוד
        document.getElementById("result").textContent = "תשובה נכונה!";
        document.getElementById("result").style.color = "green";
        setTimeout(() => {
            generateExercise(); // יצירת תרגיל חדש אחרי 1.5 שניות
        }, 1500);
    } else {
        document.getElementById("result").textContent = "תשובה לא נכונה, נסה שוב.";
        document.getElementById("result").style.color = "red";
    }
}

// יצירת תרגיל ראשון
generateExercise();

// הוספת האזנה ללחיצת מקש "Enter" בתיבת הטקסט
document.getElementById("userAnswer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});
