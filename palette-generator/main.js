const baseColorInput = document.getElementById("baseColor");
const paletteContainer = document.getElementById("palette");

function generatePalette(baseHex) {
  const baseRGB = hexToRgb(baseHex);
  const variations = [0.2, 0.4, 0.6, 0.8, 1.2, 1.4, 1.6];

  const colors = variations.map((v) => adjustBrightness(baseRGB, v));
  renderPalette(colors);
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function adjustBrightness([r, g, b], factor) {
  return rgbToHex(
    Math.min(255, Math.floor(r * factor)),
    Math.min(255, Math.floor(g * factor)),
    Math.min(255, Math.floor(b * factor))
  );
}

function renderPalette(colors) {
  paletteContainer.innerHTML = "";
  colors.forEach((color) => {
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    box.innerHTML = `
      <div>🎨</div>
      <div class="color-code">${color}</div>
    `;
    box.onclick = () => {
      navigator.clipboard.writeText(color);
      alert(`Copied ✅ ${color}`);
    };
    paletteContainer.appendChild(box);
  });
}

baseColorInput.addEventListener("input", () => {
  generatePalette(baseColorInput.value);
});
generatePalette(baseColorInput.value);
