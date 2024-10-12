let words = {};
let audioLinks = {};
let keys = [];
let currentWordIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = [];

// Cargar palabras desde words.json
fetch('words.json')
    .then(response => response.json())
    .then(data => {
        words = data;
        keys = Object.keys(words); // Obtener las claves (palabras en inglés)
        return fetch('audio.json'); // Cargar el archivo de audio
    })
    .then(response => response.json())
    .then(data => {
        audioLinks = data; // Guardar los enlaces de audio
        shuffleKeys(); // Barajar las claves
        showFlashcard(); // Mostrar la primera flashcard
    })
    .catch(error => console.error('Error cargando el archivo JSON:', error));

// Función para barajar las palabras
function shuffleKeys() {
    keys.sort(() => Math.random() - 0.5);
}

function showFlashcard() {
    const currentWord = keys[currentWordIndex];
    const imageFileName = currentWord.replace(/\s+/g, '_'); // Reemplaza los espacios por guiones bajos
    document.getElementById("image").src = `images/${imageFileName}.png`; // Cargar imagen
    document.getElementById("answer-input").value = ""; // Limpiar campo de texto
    document.getElementById("result-message").textContent = ""; // Limpiar mensaje de resultado
    document.getElementById("counter").textContent = `${currentWordIndex + 1}/${keys.length}`; // Actualizar contador

    // Seleccionar automáticamente el campo de texto al cargar la página
    document.getElementById("answer-input").focus();
}


// Función para pasar a la siguiente palabra
function nextWord() {
    const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
    const correctAnswer = keys[currentWordIndex]; // La palabra correcta es la clave actual

    // Verifica la respuesta
    if (userAnswer === correctAnswer) {
        document.getElementById("result-message").textContent = "¡Correct!";
        document.getElementById('result-message').style.color = '#7bf777';
        document.getElementById("result-message").classList.add("correct"); // Agregar clase de respuesta correcta
        document.getElementById("result-message").classList.remove("incorrect"); // Asegurarse de quitar clase de incorrecta
        correctAnswers++;
    } else {
        document.getElementById("result-message").textContent = `Incorrect. The answer is: ${correctAnswer}`;
        document.getElementById('result-message').style.color = '#fc8f8f';
        document.getElementById("result-message").classList.add("incorrect"); // Agregar clase de respuesta incorrecta
        document.getElementById("result-message").classList.remove("correct"); // Asegurarse de quitar clase de correcta
        incorrectAnswers.push(correctAnswer); // Guardar respuesta incorrecta
    }

    // Reproducir el audio
    const audioUrl = audioLinks[correctAnswer]; // Obtener la URL del audio
    const audio = new Audio(audioUrl);
    audio.play();

    // Cambia a la siguiente flashcard después de 2 segundos
    currentWordIndex++;
    if (currentWordIndex < keys.length) {
        setTimeout(showFlashcard, 2000);
    } else {
        setTimeout(showResult, 2000);
    }
}

// Evento para el botón "Siguiente"
document.getElementById("next-btn").addEventListener("click", nextWord);

// Evento para cambiar a la siguiente palabra al presionar "Enter"
document.getElementById("answer-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        nextWord();
    }
});

// Función para mostrar el resultado final
function showResult() {
    document.querySelector(".flashcard-container").style.display = "none"; // Ocultar la flashcard
    document.getElementById("correct-count").textContent = `Correct: ${correctAnswers}`; // Mostrar correctas
    if (incorrectAnswers.length > 0) {
        document.getElementById("incorrect-count").textContent = `Incorrect: ${incorrectAnswers.length} (${incorrectAnswers.join(", ")})`; // Mostrar incorrectas
    } else {
        document.getElementById("incorrect-count").textContent = `Incorrect: ${incorrectAnswers.length}`; // Mostrar incorrectas sin paréntesis vacíos
    }
    document.getElementById("result-summary").style.display = "block"; // Mostrar resumen
}

// Reiniciar el juego
document.getElementById("restart-btn").addEventListener("click", function() {
    currentWordIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = [];
    shuffleKeys(); // Barajar las claves de nuevo
    showFlashcard(); // Mostrar la primera flashcard
    document.getElementById("result-summary").style.display = "none"; // Ocultar resumen
    document.querySelector(".flashcard-container").style.display = "flex"; // Mostrar la flashcard
});
