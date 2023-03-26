import './css/styles.css';
import { debounce } from 'lodash';
import fetchCountries from './fetchCountries';
export { renderCountryCard, renderCountryList, inputEl, countryEl }


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
const countryEl = document.querySelector('.country-list');

let inputName = null;

inputEl.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function countryCardMarkup({name, capital, population, flags, languages  }) {
  
  const countryCard = `
  <li>
  <img src="${flags.svg}" alt="${name.official}" width = "50">
  <h2>${name.official}</h2>
  <p> Capital: ${capital}</p>
  <p> population: ${population}</p>
  <p> languages: ${Object.values(languages).join(', ')}</p>
  </li>`;

  countryEl.insertAdjacentHTML('beforeend', countryCard) ;
}

function counriesListMarkup({name, flags}) {

  const countryList = `<li><img src="${flags.svg}" alt="${name.official}" width = "50"><h2>${name.official}</h2></li>`;

  countryEl.insertAdjacentHTML('beforeend', countryList) ;
}

 const renderCountryCard = (array =>
  array.forEach(card => countryCardMarkup(card)));


const renderCountryList = (array =>
  array.forEach(list => counriesListMarkup(list)));