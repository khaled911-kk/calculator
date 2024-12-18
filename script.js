let display = document.querySelector("#display");
let operationTag = document.querySelector(".operation");
let resultTag = document.querySelector(".result");
let buttons = document.querySelectorAll("button");
let copyButton = document.querySelector(".copy-btn");
let clickSound = new Audio("./sound/mixkit-typewriter-soft-click-1125.wav");

let calculator = document.querySelector(".calculator");
let themeToggleBtn = document.querySelector(".theme-toggler");
let togglerIcon = document.querySelector(".toggler-icon");
let isDark = true;
let body = document.body;

buttons.forEach((item) => {
  item.addEventListener("click", () => {
    playSound();

    if (item.id == "clear") {
      resultTag.innerHTML = "";
      operationTag.innerHTML = "";
      setTimeout(() => {
        if (resultTag.innerHTML.trim() === "Clear") {
          resultTag.innerHTML = "";
        }
      }, 800);
    } else if (item.id == "backspace") {
      let string = resultTag.innerHTML.toString();
      resultTag.innerHTML = string.substr(0, string.length - 1);
    } else if (item.id === "equal") {
      previousContent = resultTag.innerHTML || 0;

      try {
        let result = eval(resultTag.innerHTML) || "0";

        operationTag.innerHTML = `${previousContent} =`;
        resultTag.innerHTML = result;

        display.classList.add("operation-move-up");
        setTimeout(() => {
          display.classList.remove("operation-move-up");
        }, 500);
      } catch (error) {
        console.log(error);
        resultTag.innerHTML = "Error";
        setTimeout(() => (resultTag.innerHTML = previousContent), 800);
      }
    } else {
      resultTag.innerHTML += item.id;
    }
  });
});

document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (
    !isNaN(key) ||
    ["+", "-", "*", "/", ".", "(", ")"].includes(key) ||
    key === "Backspace" ||
    key === "Escape" ||
    key === "Enter"
  ) {
    playSound();
  }

  if (key === "Enter") {
    key = "equal";
  } else if (key === "Escape") {
    key = "clear";
  }

  let button = document.querySelector(`button[id="${key}"]`);

  if (button) {
    button.classList.add("active-key");
  }

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
    if (
      resultTag.innerHTML.trim() == "Error" ||
      resultTag.innerHTML.trim() == "Clear"
    ) {
      resultTag.innerHTML = "";
    }
    resultTag.innerHTML += key;
  } else if (key === "equal") {
    previousContent = resultTag.innerHTML || 0;

    try {
      let result = eval(resultTag.innerHTML) || "0";

      operationTag.innerHTML = `${previousContent} =`;
      resultTag.innerHTML = result;

      display.classList.add("operation-move-up");
      setTimeout(() => {
        display.classList.remove("operation-move-up");
      }, 500);
    } catch (error) {
      console.log(error);
      resultTag.innerHTML = "Error";
      setTimeout(() => (resultTag.innerHTML = previousContent), 800);
    }
  } else if (key === "Backspace") {
    let string = resultTag.innerHTML.toString();
    resultTag.innerHTML = string.substr(0, string.length - 1);
  } else if (key === "clear") {
    resultTag.innerHTML = "Clear";
    operationTag.innerHTML = "";
    setTimeout(() => {
      if (resultTag.innerHTML.trim() === "Clear") {
        resultTag.innerHTML = "";
      }
    }, 800);
  }
});

// Toggle dark and light mode function
function themeToggle() {
  playSound();
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  body.classList.toggle("dark");
  isDark = !isDark;
  localStorage.setItem("theme", isDark ? "dark" : "light");
}
themeToggleBtn.addEventListener("click", () => {
  themeToggle();
});

// sound effect function
function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}
