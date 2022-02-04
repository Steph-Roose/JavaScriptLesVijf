import axios from "axios";

console.log('Hallo daar!');

//PSEUDO CODE
//  1. Importeer axios.
//  2. Gebruik axios om api van restcountries binnen te krijgen.
//      ! Gebruik een try/catch om eventuele errors op te vangen.
//      ! Controleer of de api werkt met een console.log.
//  3. Sorteer alle landen van minste naar meeste inwoners (sort).
//  4. Creëer een functie waarmee ik een lijst van alle landen weer kan geven op de pagina.
//      a. Maak een element aan in index.html dat ik als anker kan gebruiken.
//      b. Maak een HTML-element aan voor de vlag van het land (img).
//      c. Maak een HTML-element aan voor de naam van het land (h3).
//      d. Maak een HTML-element aan voor het aantal inwoners van het land (p).
//  5. Creëer een functie waarmee ik landen van iedere regio anders kleur.
//  6. Zorg ervoor dat de pagina er aantrekkelijk uitziet.

// Haal lijst met landen binnen.
async function getCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        console.log(result.data);
        console.log(result.data[0]);

        result.data.sort((a, b) => {
            return a.population - b.population;
        })

        generateCountryList(result.data);

    } catch (e) {
        console.error(e);
    }
}

getCountries();

// Creëer functie voor weergave op pagina.
const countryList = document.getElementById('countries-list');
const countriesList = document.createElement('li');

function generateCountryList(arr) {
    return arr.map((country) => {
        countriesList.innerHTML = `
            <img src="${country.flag}" class="flag" alt="flag"/>
            <h3 class="${country.region}">${country.name}</h3>
            <p class="population">Has a population of ${country.population} people.</p>
        `
        countryList.appendChild(countriesList);
    });
}

// Kleur landen per regio.
function colorCountries(arr) {
    const Africa = arr.filter((country) => {

    })
}
