//your code here
document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("flex");
  document.body.prepend(imageContainer);

  const message = document.createElement("h3");
  message.id = "h";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  document.body.prepend(message);

  const para = document.createElement("p");
  para.id = "para";
  document.body.appendChild(para);

  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.textContent = "Reset";
  resetButton.style.display = "none";
  document.body.appendChild(resetButton);

  const verifyButton = document.createElement("button");
  verifyButton.id = "verify";
  verifyButton.textContent = "Verify";
  verifyButton.style.display = "none";
  document.body.appendChild(verifyButton);

  const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg"
  ];

  let selectedImages = [];
  let selectedElements = [];

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function setupGame() {
    imageContainer.innerHTML = "";
    selectedImages = [];
    selectedElements = [];
    para.textContent = "";
    verifyButton.style.display = "none";
    resetButton.style.display = "none";

    const duplicateIndex = Math.floor(Math.random() * imageUrls.length);
    const images = [...imageUrls, imageUrls[duplicateIndex]];
    shuffleArray(images);

    images.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.dataset.index = index;
      img.addEventListener("click", () => selectImage(img));
      imageContainer.appendChild(img);
    });
  }

  function selectImage(img) {
    if (selectedElements.includes(img)) return;

    img.classList.add("selected");
    selectedElements.push(img);
    selectedImages.push(img.src);

    if (selectedElements.length > 2) {
      selectedElements.forEach((el) => el.classList.remove("selected"));
      selectedElements = [img];
      selectedImages = [img.src];
    }

    resetButton.style.display = "block";
    verifyButton.style.display = selectedElements.length === 2 ? "block" : "none";
  }

  function verifySelection() {
    if (selectedImages[0] === selectedImages[1]) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = "none";
  }

  resetButton.addEventListener("click", setupGame);
  verifyButton.addEventListener("click", verifySelection);

  setupGame();
});
