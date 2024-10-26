// Function to update the color name input when the color picker changes
function updateColorNameInput(colorValue) {
    const colorNameInput = document.getElementById('colorNameInput');
    colorNameInput.value = getColorName(colorValue); // Get the color name from the color value
}

// Function to update the color picker when the color name input changes
function updateColorInput(colorName) {
    const colorValue = getColorValue(colorName); // Get the hex value from the color name
    if (colorValue) {
        document.getElementById('colorInput').value = colorValue;
    }
}

// Function to generate the color palette
function generatePalette() {
    const inputColor = document.getElementById('colorInput').value;
    const paletteContainer = document.getElementById('palette');
    paletteContainer.innerHTML = ''; // Clear previous palette

    const shades = ['600', '700', '800', '900', '950'];

    // Loop through the shades and create palette blocks
    shades.forEach((shade) => {
        const shadeColor = getShadeColor(inputColor, shade);
        const colorBlock = document.createElement('div');
        colorBlock.classList.add('color-block');
        colorBlock.style.backgroundColor = shadeColor;
        colorBlock.onclick = () => copyColor(shadeColor); // Add click event to copy color

        const colorCode = document.createElement('div');
        colorCode.classList.add('color-code');
        colorCode.innerText = `${shadeColor}`;

        colorBlock.appendChild(colorCode);
        paletteContainer.appendChild(colorBlock);
    });
}

// Function to calculate the shade color (lighten/darken based on the shade value)
function getShadeColor(hex, shade) {
    let colorFactor;
    switch (shade) {
        case '600': colorFactor = 0.5; break;
        case '700': colorFactor = 0.3; break;
        case '800': colorFactor = 0.1; break;
        case '900': colorFactor = -0.1; break;
        case '950': colorFactor = -0.2; break;
        default: colorFactor = 0; break;
    }
    return adjustColorBrightness(hex, colorFactor);
}

// Function to adjust the brightness of the color
function adjustColorBrightness(hex, factor) {
    let usePound = false;
    if (hex[0] === "#") {
        hex = hex.slice(1);
        usePound = true;
    }

    let num = parseInt(hex, 16);
    let r = (num >> 16) + Math.round(255 * factor);
    let g = ((num >> 8) & 0x00FF) + Math.round(255 * factor);
    let b = (num & 0x0000FF) + Math.round(255 * factor);

    r = Math.min(Math.max(0, r), 255);
    g = Math.min(Math.max(0, g), 255);
    b = Math.min(Math.max(0, b), 255);

    return (usePound ? "#" : "") + (("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6));
}

// Function to copy color to clipboard and alert user
function copyColor(color) {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = color; // Set the value to the color code
    document.body.appendChild(tempInput); // Append it to the body
    tempInput.select(); // Select the input value
    document.execCommand('copy'); // Copy the selected value to clipboard
    document.body.removeChild(tempInput); // Remove the temporary input
    // Alert the user
    alert(`Color ${color} copied to clipboard!`);
}

// Function to toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light');
    body.classList.toggle('dark');
}

// Helper function to get hex value from color name
function getColorValue(colorName) {
    const colorMap = {
        "red": "#FF0000",
        "green": "#008000",
        "blue": "#0000FF",
        "yellow": "#FFFF00",
        "purple": "#800080",
        "orange": "#FFA500",
        "pink": "#FFC0CB",
        "black": "#000000",
        "white": "#FFFFFF",
        "gray": "#808080",
        // Add more color mappings as needed
    };
    return colorMap[colorName.toLowerCase()] || null; // Return hex value or null if not found
}

// Helper function to get color name from hex value (optional)
function getColorName(hex) {
    const colorMap = {
        "#FF0000": "Red",
        "#008000": "Green",
        "#0000FF": "Blue",
        "#FFFF00": "Yellow",
        "#800080": "Purple",
        "#FFA500": "Orange",
        "#FFC0CB": "Pink",
        "#000000": "Black",
        "#FFFFFF": "White",
        "#808080": "Gray",
        // Add more mappings as needed
    };
    return colorMap[hex.toUpperCase()] || hex; // Return color name or "Unknown Color" if not found
}
