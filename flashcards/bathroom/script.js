const flashcards = [
    { 
        image: 'img/bathtub.webp', 
        answer: 'bathtub', 
        audio: 'https://audio12.forvo.com/audios/mp3/o/8/o8_8985614_39_446374_1.mp3' 
    },
    { 
        image: 'img/faucet.png', 
        answer: 'faucet', 
        audio: 'https://audio12.forvo.com/audios/mp3/k/u/ku_9054385_39_74213_30323.mp3' 
    },
    { 
        image: 'img/toilet.jpg', 
        answer: 'toilet', 
        audio: 'https://audio12.forvo.com/audios/mp3/f/r/fr_8972856_39_14720_1.mp3' 
    },
    { 
        image: 'img/shower.jpg', 
        answer: 'shower', 
        audio: 'https://audio12.forvo.com/audios/mp3/q/z/qz_9054385_39_400677_260462.mp3' 
    },
    { 
        image: 'img/sink.jpg', 
        answer: 'sink', 
        audio: 'https://audio12.forvo.com/audios/mp3/k/m/km_9054385_39_337686_93907.mp3' 
    },
    { 
        image: 'img/toothbrush.png', 
        answer: 'toothbrush', 
        audio: 'https://audio12.forvo.com/mp3/9487568/39/9487568_39_501186.mp3' 
    },
    { 
        image: 'img/toothpaste.webp', 
        answer: 'toothpaste', 
        audio: 'https://audio12.forvo.com/audios/mp3/6/n/6n_8978439_39_398920_1.mp3' 
    },
    { 
        image: 'img/towel.jpg', 
        answer: 'towel', 
        audio: 'https://audio12.forvo.com/audios/mp3/l/5/l5_9148783_39_64930_611966.mp3' 
    },
    { 
        image: 'img/shampoo.png', 
        answer: 'shampoo', 
        audio: 'https://audio12.forvo.com/audios/mp3/d/v/dv_8971536_39_1194_993.mp3' 
    },
    { 
        image: 'img/soap.webp', 
        answer: 'soap', 
        audio: 'https://audio12.forvo.com/audios/mp3/0/0/00_9054385_39_370300_96417.mp3' 
    },
    { 
        image: 'img/showerhead.webp', 
        answer: 'showerhead', 
        audio: 'https://audio12.forvo.com/audios/mp3/7/t/7t_9431504_39_3383225.mp3' 
    }

];

let unusedCards = [...flashcards]; // Copia del array para las tarjetas no usadas
let correctAnswers = 0;
let incorrectAnswers = 0;
let currentCardNumber = 1;
const totalCards = flashcards.length;

function updateCounter() {
    document.getElementById('counter').textContent = `${currentCardNumber}/${totalCards}`;
}

function showNextCard() {
    if (unusedCards.length === 0) {
        showSummary(); // Mostrar el resumen si ya no hay tarjetas
        return;
    }

    // Seleccionar una tarjeta aleatoria y eliminarla del array de tarjetas no usadas
    const randomIndex = Math.floor(Math.random() * unusedCards.length);
    const flashcard = unusedCards.splice(randomIndex, 1)[0];

    document.getElementById('flashcard-image').src = flashcard.image;
    document.getElementById('answer-input').value = '';
    document.getElementById('result-message').textContent = '';
    document.getElementById('flashcard-image').dataset.answer = flashcard.answer; // Guardar la respuesta correcta en el dataset
    document.getElementById('flashcard-image').dataset.audio = flashcard.audio; // Guardar el audio en el dataset

    // Actualizar el contador
    updateCounter();

    // Seleccionar automáticamente el campo de texto
    document.getElementById('answer-input').focus();
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.toLowerCase().trim();
    const correctAnswer = document.getElementById('flashcard-image').dataset.answer;
    const audioSrc = document.getElementById('flashcard-image').dataset.audio;
    
    if (userAnswer === correctAnswer) {
        document.getElementById('result-message').textContent = '¡Correcto!';
        document.getElementById('result-message').style.color = '#7bf777';
        correctAnswers++;
        // Cambia de tarjeta después de 2 segundos si la respuesta es correcta
        setTimeout(showNextCard, 2000);
    } else {
        document.getElementById('result-message').textContent = `Incorrecto. La respuesta es: ${correctAnswer}`;
        document.getElementById('result-message').style.color = '#fc8f8f';
        incorrectAnswers++;
        // Cambia de tarjeta después de 4 segundos si la respuesta es incorrecta
        setTimeout(showNextCard, 4000);
    }

    // Reproducir el audio de la palabra
    const audio = new Audio(audioSrc);
    audio.play();

    // Aumentar el número de la tarjeta actual
    currentCardNumber++;
}

function showSummary() {
    document.querySelector('.flashcard-container').innerHTML = `
        <h2 style="color: white; font-weight: bold;">Resumen</h2>
        <p style="color: #7bf777; font-weight: bold;">Respuestas correctas: ${correctAnswers}</p>
        <p style="color: #fc8f8f; font-weight: bold;">Respuestas incorrectas: ${incorrectAnswers}</p>
        <button class="retry-button">Reintentar</button>
    `;

    // Añadir evento al botón de reintentar
    document.querySelector('.retry-button').addEventListener('click', resetGame);
}

function resetGame() {
    unusedCards = [...flashcards]; // Reiniciar las tarjetas no usadas
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentCardNumber = 1;

    // Reiniciar el contenido del contenedor de flashcards
    document.querySelector('.flashcard-container').innerHTML = `
        <img id="flashcard-image" src="" alt="Flashcard Image">
        <input type="text" id="answer-input" placeholder="Escribe el nombre en inglés" autocomplete="off">
        <button id="check-button">Comprobar</button>
        <p id="result-message"></p>
    `;

    // Añadir eventos nuevamente
    document.getElementById('check-button').addEventListener('click', checkAnswer);
    document.getElementById('answer-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            document.getElementById('check-button').click();
        }
    });

    // Mostrar la primera tarjeta
    showNextCard();
}

// Añadir evento para escuchar la tecla "Enter"
document.getElementById('answer-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('check-button').click();
    }
});

document.getElementById('check-button').addEventListener('click', checkAnswer);

// Mostrar la primera tarjeta al cargar la página
showNextCard();
