const flashcards = [
    { 
        image: 'img/bed.png', 
        answer: 'bed', 
        audio: 'https://audio12.forvo.com/audios/mp3/z/s/zs_9230373_39_6104.mp3' 
    },
    { 
        image: 'img/pillow.png', 
        answer: 'pillow', 
        audio: 'https://audio12.forvo.com/audios/mp3/t/y/ty_8982200_39_328495_84181.mp3' 
    },
    { 
        image: 'img/blanket.webp', 
        answer: 'blanket', 
        audio: 'https://audio12.forvo.com/audios/mp3/y/h/yh_8978109_39_313214_68100.mp3' 
    },
    { 
        image: 'img/wardrobe.webp', 
        answer: 'wardrobe', 
        audio: 'https://audio12.forvo.com/audios/mp3/f/u/fu_8986237_39_31863_1024466.mp3' 
    },
    { 
        image: 'img/nightstand.png', 
        answer: 'nightstand', 
        audio: 'https://audio12.forvo.com/audios/mp3/o/p/op_9024342_39_657035_1.mp3' 
    },
    { 
        image: 'img/tablelamp.png', 
        answer: 'table lamp', 
        audio: 'https://audio12.forvo.com/audios/mp3/6/a/6a_8986237_39_1218427_903101.mp3' 
    },
    { 
        image: 'img/mirror.webp', 
        answer: 'mirror', 
        audio: 'https://audio12.forvo.com/audios/mp3/o/2/o2_8978242_39_319623_1.mp3' 
    },
    { 
        image: 'img/curtains.webp', 
        answer: 'curtains', 
        audio: 'https://audio12.forvo.com/audios/mp3/e/o/eo_9008515_39_657082_1.mp3' 
    },
    { 
        image: 'img/closet.jpg', 
        answer: 'closet', 
        audio: 'https://audio12.forvo.com/audios/mp3/z/0/z0_9261923_39_434477.mp3' 
    },
    { 
        image: 'img/dresser.png', 
        answer: 'dresser', 
        audio: 'https://audio12.forvo.com/audios/mp3/i/0/i0_8996198_39_509561_1.mp3' 
    },
    { 
        image: 'img/headboard.jpg', 
        answer: 'headboard', 
        audio: 'https://audio12.forvo.com/mp3/9487568/39/9487568_39_328494.mp3' 
    },
    { 
        image: 'img/mattress.webp', 
        answer: 'mattress', 
        audio: 'https://audio12.forvo.com/mp3/9487568/39/9487568_39_374237.mp3' 
    },
    { 
        image: 'img/sheet.jpg', 
        answer: 'sheet', 
        audio: 'https://audio12.forvo.com/audios/mp3/n/k/nk_8975595_39_10489.mp3' 
    },
    { 
        image: 'img/quilt.jpg', 
        answer: 'quilt', 
        audio: 'https://audio12.forvo.com/audios/mp3/w/z/wz_8981864_39_328516_84264.mp3' 
    },
    { 
        image: 'img/bedsidetable.webp', 
        answer: 'bedside table', 
        audio: 'https://audio12.forvo.com/audios/mp3/9/x/9x_9443649_39_1689706.mp3' 
    },
    { 
        image: 'img/drawer.png', 
        answer: 'drawer', 
        audio: 'https://audio12.forvo.com/audios/mp3/s/0/s0_9048505_39_1741_463773.mp3' 
    },
    { 
        image: 'img/alarmclock.webp', 
        answer: 'alarm clock', 
        audio: 'https://audio12.forvo.com/audios/mp3/n/e/ne_9091027_39_1489029_1.mp3' 
    },
    { 
        image: 'img/rug.webp', 
        answer: 'rug', 
        audio: 'https://audio12.forvo.com/audios/mp3/u/p/up_9187295_39_373415.mp3' 
    },
    { 
        image: 'img/ceilingfan.jpg', 
        answer: 'ceiling fan', 
        audio: 'https://audio12.forvo.com/audios/mp3/p/6/p6_9522042_39_4010288.mp3' 
    },
    { 
        image: 'img/hanger.png', 
        answer: 'hanger', 
        audio: 'https://audio12.forvo.com/audios/mp3/h/z/hz_8976598_39_378659_1.mp3' 
    },
    { 
        image: 'img/vanity.webp', 
        answer: 'vanity', 
        audio: 'https://audio12.forvo.com/audios/mp3/x/0/x0_9031158_39_29882_372989.mp3' 
    },
    { 
        image: 'img/drawerbox.webp', 
        answer: 'drawer box', 
        audio: 'https://ia600602.us.archive.org/16/items/drawbox/drawbox.mp3' 
    },
    { 
        image: 'img/comforter.png', 
        answer: 'comforter', 
        audio: 'https://ia600701.us.archive.org/0/items/bedframe/comforter.mp3' 
    },
    { 
        image: 'img/bedframe.jpeg', 
        answer: 'bed frame', 
        audio: 'https://ia600701.us.archive.org/0/items/bedframe/bedframe.mp3' 
    },
    { 
        image: 'img/throwpillow.jpg', 
        answer: 'throw pillow', 
        audio: 'https://audio12.forvo.com/mp3/9784231/39/9784231_39_7579554.mp3' 
    },
    { 
        image: 'img/bookshelf.jpg', 
        answer: 'bookshelf', 
        audio: 'https://audio12.forvo.com/audios/mp3/e/1/e1_8985614_39_571992_1.mp3' 
    },
    { 
        image: 'img/blinds.jpg', 
        answer: 'blinds', 
        audio: 'https://audio12.forvo.com/audios/mp3/m/k/mk_8978607_39_336996_92688.mp3' 
    },
    { 
        image: 'img/nightlight.jpg', 
        answer: 'nightlight', 
        audio: 'https://audio12.forvo.com/audios/mp3/0/q/0q_8986237_39_630162_376008.mp3' 
    },
    { 
        image: 'img/chestofdrawers.webp', 
        answer: 'chest of drawers', 
        audio: 'https://audio12.forvo.com/audios/mp3/p/b/pb_9062871_39_501299_598351.mp3' 
    },
    { 
        image: 'img/footboard.jpg', 
        answer: 'footboard', 
        audio: 'https://audio12.forvo.com/audios/mp3/o/e/oe_9150563_39_2934643.mp3' 
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
