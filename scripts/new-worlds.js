import { worlds } from '../scripts/worlds.js';
import { loadEverything } from '../main.js';

const submitButton = document.getElementById("submit-button");
const worldsNameInput = document.getElementById("worlds-name");
const worldsCreatorInput = document.getElementById("worlds-creator");
const worldsImageLinkInput = document.getElementById("worlds-image");

const validateString = (input, inputName) => {
    if (!input || typeof input !== "string" || input.trim() === "") {
        return {
            success: false,
            errMessage: `${inputName} is not correct. The length must be more then one symbol`
        };
    }
    return {
        success: true
    }
}

const createNewWorld = () => {
    const name = worldsNameInput.value;
    let validationResult = validateString(name, "World's name");
    if (!validationResult.success) {
        alert(validationResult.errMessage);
        return;
    }

    if (worlds.filter(w => w.name.toLowerCase() === name.toLowerCase()).length > 0) {
        alert("World's name must be unique");
        return;
    }

    const author = worldsCreatorInput.value;
    validationResult = validateString(author, "Creator's name");
    if (!validationResult.success) {
        alert(validationResult.errMessage);
        return;
    }

    const image_link = worldsImageLinkInput.value;
    validationResult = validateString(link, "World's image link");
    if (!validationResult.success) {
        alert(validationResult.errMessage);
        return;
    }

    const newWorld = {
        name,
        author,
        image_link,
    };
    
    saveToFile(newWorld);
    loadEverything();
}

const saveToFile = () => {
    // temp stub
    const newWorld = {
        
    }
}

submitButton.addEventListener('click', createNewWorld);