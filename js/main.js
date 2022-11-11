(() => {
  const UploadButton = document.querySelector(".control-upload");
  const Preview = document.querySelector(".control-preview");
  const WordInput = document.querySelector(".control-word");
  const RepeatInput = document.querySelector(".control-repeat");
  const GenerateButton = document.querySelector(".control-generate");
  const Board = document.querySelector(".board");

  function createPreview(url) {
    Preview.src = url;
  }

  function processTarget(url) {
    createPreview(url);
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
      processTarget(url);
    });

    Input.click();
  });

  processTarget("assets/monalisa.jpg");
})();
