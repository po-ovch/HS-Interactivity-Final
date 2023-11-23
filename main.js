import { worlds } from './scripts/worlds.js';
import { loadImage } from "./scripts/carousel.js";

const flightsData = [];
export const fromSelector = document.getElementById("from-selector");
export const toSelector = document.getElementById("to-selector");
export const dateSelector = document.getElementById("date-selector");
const flightsList = document.getElementById("flights-list");


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const flightsGenerator = () => {
    worlds.forEach((firstWorld, firstIndex) => {
        for (let index = 0; index < 20; index++) {
            let secondIndex = getRandomInt(0, worlds.length);
    
            while (firstIndex === secondIndex) {
                secondIndex = getRandomInt(0, worlds.length);
            }
    
            for (let index = 0; index < 5; index++) {
                flightsData.push({
                    from: firstWorld.name,
                    to: worlds[secondIndex].name,
                    price: getRandomInt(300, 1500),
                    date: addDays(new Date(), index),
                });
            }
        }
    });
}

const renderFlightsList = (flights) => {
    flightsList.innerHTML = '';

    if (flights.length === 0) {
        flightsList.innerHTML = '<h3>No flights between these worlds for selected date.</h3>';
        return;
    }
    
    flights.slice(0, 4).forEach(flight => {
        const tile = document.createElement('div');
        tile.classList.add('flight');

        tile.innerHTML = 
        `
            <h3>${flight.from} - ${flight.to}</h3>
            <p>Flight date: ${flight.date.toLocaleDateString("en-US")}</p>
            <p>Price: ${flight.price} EUR</p>
        `;
        flightsList.appendChild(tile);
    });
}

const fillData = () => {
    const tos = [...new Set(flightsData.map(flight => flight.to))].sort();
    tos.forEach(to => createOption(toSelector, to));
    toSelector.value = 'Narnia';

    const froms = [...new Set(flightsData.map(flight => flight.from))].sort();
    froms.forEach(from => createOption(fromSelector, from));
    fromSelector.value = 'Hogwarts';

    const today = new Date();
    dateSelector.value = `${today.getUTCFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    renderFlightsList(flightsData);
    loadImage(worlds[0].image_link);
}

const createOption = (selector, value) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerHTML = value;
    selector.appendChild(option);
}

export const loadEverything = () => {
    flightsGenerator();
    fillData();
}

loadEverything();

const searchButton = document.getElementById("search-button");

const executeFlightsSearch = () => {
    const from = fromSelector.value;
    const to = toSelector.value;
    const date = new Date(dateSelector.value);

    if (from === to) {
        alert('From and to worlds can not be the same!');
        return;
    }

    const filteredFlights = flightsData.filter(flight => flight.to === to && flight.from === from &&
        flight.date.toLocaleDateString("en-US") === date.toLocaleDateString("en-US"));    
    renderFlightsList(filteredFlights);
}

searchButton.addEventListener('click', executeFlightsSearch);

const randomButton = document.getElementById("random-flight-button");

randomButton.addEventListener('click', () => {
    const fromIndex = getRandomInt(0, fromSelector.options.length);
    fromSelector.value = fromSelector.options[fromIndex].text;

    let toIndex = getRandomInt(0, fromSelector.options.length);
    while (fromIndex === toIndex) {
        toIndex = getRandomInt(0, fromSelector.options.length);
    }
    toSelector.value = toSelector.options[toIndex].text;

    searchButton.click();
})