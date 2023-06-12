// Axel Cotón Gutiérrez Copyright 2023
      // Generar imágenes aleatorias
  const images = [
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5pelotas/master/img/pelota.png?token=GHSAT0AAAAAACDQ2OUHITXRSOA227HISRE6ZEHNFJQ",
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5pelotas/master/img/pelota.png?token=GHSAT0AAAAAACDQ2OUHITXRSOA227HISRE6ZEHNFJQ",
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5pelotas/master/img/pelota.png?token=GHSAT0AAAAAACDQ2OUHITXRSOA227HISRE6ZEHNFJQ",
"https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5pelotas/master/img/pelota.png?token=GHSAT0AAAAAACDQ2OUHITXRSOA227HISRE6ZEHNFJQ",
"https://github.com/AxelCotonGutierrez/Contarhasta5pelotas/blob/master/img/pelota.png?raw=true"
  ];

  let score = 0; // Contador de respuestas correctas
  let questionsCount = 0; // Contador de preguntas realizadas
  let previousNumImages = -1; // Variable para almacenar el número de imágenes de la pregunta anterior

  // Función para restablecer los resultados y mensajes del juego anterior
  function resetGame() {
    const scoreElement = document.querySelector("#score");
    const resultElement = document.querySelector("#result");

    scoreElement.textContent = "";
    resultElement.textContent = "";
    scoreElement.style.color = "initial";
    resultElement.style.color = "initial";
  }

  function generateQuestion() {
    resetGame(); // Restablecer resultados y mensajes del juego anterior

    // Verificar si se han realizado las 5 preguntas
    if (questionsCount >= 5) {
      const scoreElement = document.querySelector("#score");
      scoreElement.textContent = `\u00A1Fin!`;

      if (score === 5) {
        scoreElement.textContent += ` \u00A1Felicidades, eres un/a campeón/a!`;
        scoreElement.style.color = "green";
      } else {
        scoreElement.textContent += ` \u00A1Vuelve a intentarlo!`;
        scoreElement.style.color = "red";
      }

      // Mostrar botón "Volver a jugar"
      const playAgainButton = document.querySelector("#play-again-button");
      playAgainButton.style.display = "block";

      return;
    }

    let numImages = generateRandomNumImages();

    while (numImages === previousNumImages) {
      numImages = generateRandomNumImages();
    }

    previousNumImages = numImages;

    // Generar imágenes aleatorias para la pregunta actual
    const chosenImages = [];

    for (let i = 0; i < numImages; i++) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const image = document.createElement("img");
      image.src = images[randomIndex];
      image.alt = "Imagen";
      image.classList.add("game-image"); // Agregar la clase "game-image" a las imágenes
      chosenImages.push(image);
    }

    // Mostrar imágenes en el HTML
    const imageContainer = document.querySelector("#image-container");
    imageContainer.innerHTML = ""; // Limpiar el contenedor de imágenes

    chosenImages.forEach((image) => {
      imageContainer.appendChild(image);
    });

    // Pedir al jugador que adivine
    const guessButtons = document.querySelectorAll(".guess-button");

    // Eliminar eventos click anteriores
    guessButtons.forEach((button) => {
      button.removeEventListener("click", handleGuess);
    });

    // Asignar eventos click nuevos
    guessButtons.forEach((button) => {
      button.addEventListener("click", handleGuess);
    });
  }

  function generateRandomNumImages() {
    return Math.floor(Math.random() * 5) + 1;
  }

  function handleGuess(event) {
    const guess = parseInt(event.target.textContent);
    const resultElement = document.querySelector("#result");
    questionsCount++;

    const numImages = document.querySelectorAll("#image-container img").length;

    if (guess === numImages) {
      score++;
      resultElement.textContent = "\u00A1Correcto!";
      resultElement.style.color = "green";
    } else {
      resultElement.textContent = `Incorrecto, había ${numImages} imágenes.`;
      resultElement.style.color = "red";
    }

    // Actualizar puntaje y generar la siguiente pregunta
    const scoreElement = document.querySelector("#score");
    scoreElement.textContent = ` ${score} respuestas correctas de ${questionsCount}`;

    setTimeout(generateQuestion, 1000);
  }

  function restartGame() {
    // Restablecer variables de juego
    score = 0;
    questionsCount = 0;
    previousNumImages = -1;

    // Ocultar botón "Volver a jugar"
    const playAgainButton = document.querySelector("#play-again-button");
    playAgainButton.style.display = "none";

    // Reiniciar el juego
    generateQuestion();
  }

  // Llamar a la función para iniciar el juego
  generateQuestion();
  
  // Agregar evento clic al botón "Volver a jugar"
  const playAgainButton = document.querySelector("#play-again-button");
  playAgainButton.addEventListener("click", restartGame);