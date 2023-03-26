import './css/styles.css';
import { debounce } from 'lodash';
// import fetchCountries  from './fetchCountries';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
const countryEl = document.querySelector('.country-list');


let inputName = null;

inputEl.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));


function fetchCountries() {
  inputName = inputEl.value.trim();
  console.log(inputName);

  fetch(`https://restcountries.com/v3.1/name/${inputName}?fields=name,capital,population,flags,languages`).then(response => {
    if (!response) {
    Notiflix.Notify.failure("Oops, there is no country with that name")
    }
    return response.json()
  })
    .then(country => {
    if (country.length > 10) {
      Notiflix.Notify.failure(
        "Too many matches found. Please enter a more specific name."
      );
    } else if (country.length >= 2 && country.length <= 10) { counriesListMarkup(country) }
    else { countryCardMarkup(country) }
    })
    .catch(error => console.log(error))
}

function countryCardMarkup({name, capital, population, flags, languages  }) {
  
  const countryCard = `
  <li>
  <img src="${flags.svg}" alt="${name.official}>
  <h2>${name.official}</h2>
  <p> Capital: ${capital}</p>
  <p> population: ${population}</p>
  <p> languages: ${languages}</p>
  </li>`;

  countryEl.insertAdjacentHTML('beforeend', countryCard) ;
}

function counriesListMarkup({name, flags}) {

  const countryList = `<li><img src="${flags.svg}" alt="${name.official}><h2>${name.official}</h2></li>`;

  countryEl.insertAdjacentHTML('beforeend', countryList) ;
}
