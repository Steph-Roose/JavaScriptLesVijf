import axios from "axios";

console.log('Hallo daar!');

/*PSEUDO CODE
   1. Importeer axios.
   2. Maak een try/catch functie aan om met axios en het endpoint de lijst met landen binnen te halen.
   3. Controleer of ik de lijst goed binnenkrijgt met een console.log.
   4. Gebruik de map-methode om een array van alle vlaggen te genereren.
   5. Gebruik de map-methode om een array van alle namen te genereren.
   6. Gebruik de map-methode om een array van alle inwonersaantallen te genereren.
   7. Gebruik de map-methode om een array van alle regios te genereren en aan iedere regio een andere class toe te wijzen.
   8. Schrijf een functie waarmee ik 4-6 kan combineren en weergeven op de pagina.
       a. wrap 4 in een <img> element.
       b. wrap 5 in een <h3> element. Gebruik de methode uit 7 om class toe te wijzen.
       c. wrap 6 in een <p> element.
   9. Pas styling aan in styles.css
*/

// Haal lijst met landen binnen.
async function getCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        console.log(result.data);
        console.log(result.data[0]);

        result.data.sort((a, b) => {
            return a.population - b.population;
        })

        generateCountriesList(result.data);

    } catch (e) {
        console.error(e);
    }
}

getCountries();

// Maak een lijst met vlaggen.
function getFlags(flag) {
    return `${flag}`;
}

// Maak een lijst met land-namen.
function getNames(name) {
    return `${name}`;
}

// Maak en lijst met inwonersaantallen.
function getPopulation(population) {
    return `Has a population of ${population} people`;
}

// Maak een lijst met regio's.
function getRegion (region) {
    if (region === "Africa" ) {
        return "africa";
    } else if (region === "Americas" ) {
        return "americas";
    } else if (region === "Asia" ) {
        return "asia";
    } else if (region === "Europe" ) {
        return "europe";
    } else {
        return "oceania";
    }
}

// Combineer de gemaakte lijsten.
function generateCountriesList (arr) {
    arr.map((country) => {
        const countriesList = document.getElementById("countries-list");
        const countryListing = document.createElement("li");

        const countryFlag = document.createElement("img");
        countryFlag.setAttribute("class", "flag");
        countryFlag.src = getFlags(country.flag);
        countryListing.appendChild(countryFlag);

        const countryName = document.createElement("h4");
        countryName.setAttribute("class", "name");
        countryName.textContent = getNames(country.name);
        countryListing.appendChild(countryName);

        const countryPopulation = document.createElement("p");
        countryPopulation.setAttribute("class", "population");
        countryPopulation.textContent = getPopulation(country.population);
        countryListing.appendChild(countryPopulation);

        let att = document.createAttribute("class");
        att.value = getRegion(country.region);
        countryName.setAttributeNode(att);

        return countriesList.appendChild(countryListing);
    })
}

