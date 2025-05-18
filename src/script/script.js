let randomColorArray = [];
let imageArray = [];

const usrColorInput = document.querySelector('.color-input');
const modeSelect = document.querySelector('.mode-input');
const container = document.querySelector('.container');

// Fetch and display color scheme
function fetchColors() {
    const selectedColor = usrColorInput.value.slice(1); // remove the "#" from hex
    const selectedMode = modeSelect.value;

    console.log("Color Selected:", selectedColor);
    console.log("Mode Selected:", selectedMode);

    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=5`)
        .then(response => response.json())
        .then(data => {
            // Clear old data
            randomColorArray = [];
            imageArray = [];

            // Store hex values and images
            data.colors.slice(0, 5).forEach(color => {
                randomColorArray.push(color.hex.value);
                imageArray.push(color.image.bare);
            });

            // Create object 
            const colorsData = {
                colorValueHex: selectedColor,
                colorHexArray: randomColorArray,
                colorImageArray: imageArray
            };

            console.log("Color Scheme:", colorsData);

            // Render color previews
            renderColors();
        })
        .catch(error => console.error("Error fetching color scheme:", error));
}

// Render color previews to the container
function renderColors() {
    let htmlOutput = '';

    imageArray.forEach((imgSrc, index) => {
        htmlOutput += `
            <div style="text-align: center; margin: 10px;">
                <img src="${imgSrc}" alt="Color swatch" style="max-width: 100px;" />
                <div>${randomColorArray[index]}</div>
            </div>
        `;
    });

    container.innerHTML = htmlOutput;
}

// Trigger color update on both inputs
usrColorInput.addEventListener('input', fetchColors);
modeSelect.addEventListener('change', fetchColors);

//  fetch default colors on load
window.addEventListener('DOMContentLoaded', fetchColors);
