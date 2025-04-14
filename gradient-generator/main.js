const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const typeSelect = document.getElementById("typeSelect");
const angleInput = document.getElementById("angleInput");
const angleLabel = document.getElementById("angleLabel");
const previewBox = document.getElementById("previewBox");
const cssOutput = document.getElementById("cssOutput");

function updateGradient() {
  const c1 = color1.value;
  const c2 = color2.value;
  const type = typeSelect.value;
  const angle = angleInput.value;

  let gradientCSS = "";

  if (type === "linear") {
    gradientCSS = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    angleLabel.style.display = "inline-block";
  } else {
    gradientCSS = `radial-gradient(circle, ${c1}, ${c2})`;
    angleLabel.style.display = "none";
  }

  previewBox.style.background = gradientCSS;
  cssOutput.textContent = `background: ${gradientCSS};`;
}

function copyCSS() {
  navigator.clipboard.writeText(cssOutput.textContent);
  alert("The gradient code has been copied. ✅");
}

color1.addEventListener("input", updateGradient);
color2.addEventListener("input", updateGradient);
typeSelect.addEventListener("change", updateGradient);
angleInput.addEventListener("input", updateGradient);
updateGradient();
