const hexInput = document.getElementById('hexInput');
const rgbInput = document.getElementById('rgbInput');
const colorPreview = document.getElementById('colorPreview');

hexInput.addEventListener('input', () => {
    const hex = hexInput.value.trim().replace('#', '');
    if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const rgb = `${r}, ${g}, ${b}`;
        rgbInput.value = rgb;
        colorPreview.style.backgroundColor = `#${hex}`;
    }
});

rgbInput.addEventListener('input', () => {
    const rgb = rgbInput.value.trim();
    const parts = rgb.split(',');
    if (parts.length === 3) {
        const r = parseInt(parts[0]);
        const g = parseInt(parts[1]);
        const b = parseInt(parts[2]);
        if ([r, g, b].every(n => !isNaN(n) && n >= 0 && n <= 255)) {
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
                .toString(16)
                .slice(1)
                .toUpperCase()}`;
            hexInput.value = hex;
            colorPreview.style.backgroundColor = hex;
        }
    }
});

function copyHex() {
    navigator.clipboard.writeText(hexInput.value);
    alert('✅ Copied HEX');
}

function copyRGB() {
    navigator.clipboard.writeText(rgbInput.value);
    alert('✅ Copied RGB');
}