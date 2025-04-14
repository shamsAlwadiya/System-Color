const fgColorInput = document.getElementById('fgColor');
const bgColorInput = document.getElementById('bgColor');
const preview = document.getElementById('preview');
const ratioText = document.getElementById('ratio');
const result = document.getElementById('result');

function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function luminance(r, g, b) {
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(rgb1, rgb2) {
    const lum1 = luminance(...rgb1);
    const lum2 = luminance(...rgb2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
}

function updateContrast() {
    const fg = hexToRgb(fgColorInput.value);
    const bg = hexToRgb(bgColorInput.value);
    const contrastRatio = getContrast(fg, bg);

    preview.style.color = fgColorInput.value;
    preview.style.backgroundColor = bgColorInput.value;
    ratioText.textContent = contrastRatio;

    const ratio = parseFloat(contrastRatio);
    if (ratio >= 4.5) {
        result.classList.remove('fail');
        result.classList.add('pass');
        result.innerHTML = `✅ Contrast ratio: <span id="ratio">${contrastRatio}</span> – Good (Meets the standard)`;
    } else if (ratio >= 3.0) {
        result.classList.remove('fail');
        result.classList.add('pass');
        result.innerHTML = `⚠️ Contrast ratio: <span id="ratio">${contrastRatio}</span> – Acceptable (Meets the standard for large text)`;
    } else {
        result.classList.remove('pass');
        result.classList.add('fail');
        result.innerHTML = `❌ Contrast ratio: <span id="ratio">${contrastRatio}</span> – Poor (Does not meet the standard)`;
    }
}

fgColorInput.addEventListener('input', updateContrast);
bgColorInput.addEventListener('input', updateContrast);
updateContrast();