import axios from "axios";

console.log("Hoe zie ik dit?")

/* STAPPENPLAN
    x0. Zorg ervoor dat de bezoeker vanaf de main pagina naar deze pagina kan gaan.
    x1. Maak een asynchrone functie met het juiste endpoint (https://restcountries.com/v2/name/{name})
    2. Verzamel alle nodige informatie die ik weer wil geven:
        Nodig van main pagina: flag, name, population
        Nieuwe info: subregion, capital, currencies (let op: currencies is een array)
    3. Combineer deze functies in 1 functie die alle info weergeeft op de pagina.
    4. Creëer een zoekbalk waarin de bezoeker kan typen.
    5. Zorg ervoor dat - wanneer een bezoeker begint met typen - er een lijst tevoorschijn komt met mogelijke landen.
    6. Laat info over het bovenste land uit te lijst zien zodra de bezoeker op Enter drukt/op Zoek klikt.
    7. Zorg ervoor dat er een foutmelding komt als er geen land gevonden kan worden.
    8. Zorg ervoor dat de foutmelding verdwijnt zodra de bezoeker een nieuw land zoekt.
    9. Styleer de pagina.
 */

const inputField = document.getElementById("search-country");
const containerResult = document.getElementById("container-result");
const errorMessage = document.getElementById("error-message");

async function getCountryData(name) {
    errorMessage.innerHTML = '';
    containerResult.innerHTML = '';

    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        console.log(result.data);

        showCountry(result.data[0]);

    } catch (e) {
        console.error(e);
        errorMessage.innerHTML = `${name} doesn't exist. Try again.`;
    }
}

//Schrijf functie voor ophalen currencies
function getCurrencies(currencies) {
    if (currencies.length === 2) {
        return `and you can pay with ${currencies[0].name} and ${currencies[1].name}'s`;
    } else {
        return `and you can pay with ${currencies[0].name}`;
    }
}

//Laat zoekresultaat op de website zien.
function showCountry(country) {

    containerResult.innerHTML = `
    <img src="${country.flag}" id="flag" alt="flag"/><h3 id="name">${country.name}</h3>
    <p id="info">${country.name} is situated in ${country.subregion}.
    It has a population of ${country.population} people.<br>
    The capital is ${country.capital} ${getCurrencies(country.currencies)}.</p>`

}

/* Zoekfunctie
    1. Link zoekbalk aan de api.
    2. Bezoeker begint te typen: laat een lijst met mogelijke resultaten zien.
    3. Bezoeker klikt op Enter/Zoek:
            -> Er is geen match: laat een foutmelding zien.
            -> Er is 1 match: laat info over het land zien.
            -> Er zijn meerdere matches: laat info over het bovenste land zien.
    4. Bezoeker begint een nieuwe zoekopdracht: herhaal stap 2 en 3.
            -> Insert bij stap 3: verwijder oude foutmelding/informatie.
 */

const searchForm = document.getElementById("search-form")
searchForm.addEventListener("submit", searchingCountries);

function searchingCountries(e) {
    e.preventDefault();

    getCountryData(inputField.value);
}