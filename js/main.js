(() => {
  const UploadButton = document.querySelector(".control-upload");
  const Preview = document.querySelector(".control-preview");
  const WordInput = document.querySelector(".control-word");
  const RepeatInput = document.querySelector(".control-repeat");
  const GenerateButton = document.querySelector(".control-generate");
  const Board = document.querySelector(".board");

  function handleInput(url) {
    Preview.src = url;
  }

  function createResult(image) {
    const word = WordInput.value;
    const repeat = Math.max(Number(RepeatInput.value), 1);

    // Canvas for measuring a character's size on the canvas.
    const textCanvas = document.createElement("canvas");
    const textContext = textCanvas.getContext("2d");
    const fontSize = 16;
    const font = `${fontSize}px "Nanum Gothic Coding"`;
    textContext.font = font;
    const charInfo = textContext.measureText("A");

    // Canvas for extracting the value of each pixel.
    const pixelWidth = word.length * repeat;
    const pixelHeight = Math.floor((pixelWidth / image.width) * image.height * 0.5);
    const pixelCanvas = document.createElement("canvas");
    const pixelContext = pixelCanvas.getContext("2d");

    pixelCanvas.width = pixelWidth;
    pixelCanvas.height = pixelHeight;
    pixelContext.drawImage(image, 0, 0, image.width, image.height, 0, 0, pixelWidth, pixelHeight);
    const pixelData = pixelContext.getImageData(0, 0, pixelWidth, pixelHeight).data;

    // Draw the characters.
    const boardContext = Board.getContext("2d");
    const boardMarginX = 5;
    const boardMarginY = 0;
    const boardWidth = charInfo.width * word.length * repeat + boardMarginX * 2;
    const boardHeight = Math.floor((boardWidth / image.width) * image.height) + boardMarginY * 2;

    Board.width = boardWidth;
    Board.height = boardHeight;
    boardContext.fillStyle = "#000000";
    boardContext.fillRect(0, 0, boardWidth, boardHeight);
    boardContext.font = font;

    for (let y = 0; y < pixelHeight; y++) {
      for (let x = 0; x < pixelWidth; x++) {
        const pixelIndex = (pixelWidth * y + x) * 4;
        const r = pixelData[pixelIndex];
        const g = pixelData[pixelIndex + 1];
        const b = pixelData[pixelIndex + 2];
        const a = 1;

        boardContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

        boardContext.fillText(
          word[x % word.length],
          x * charInfo.width + boardMarginX,
          (y + 1) * fontSize + boardMarginY
        );
      }
    }
  }

  UploadButton.addEventListener("click", () => {
    const Input = document.createElement("input");
    Input.type = "file";
    Input.accept = "image/*";
    Input.multiple = false;

    Input.addEventListener("change", () => {
      const files = Input.files;

      if (files === null || files.length < 1) {
        return;
      }

      const file = files[0];
      const url = URL.createObjectURL(file);
      handleInput(url);
    });

    Input.click();
  });

  GenerateButton.addEventListener("click", () => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = Preview.src;

    image.addEventListener("load", () => {
      createResult(image);
    });
  });

  handleInput("assets/monalisa.jpg");
})();
