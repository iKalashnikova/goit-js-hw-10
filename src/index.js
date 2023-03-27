import './css/styles.css';
import { debounce } from 'lodash';
import fetchCountries from './fetchCountries';
export { renderCountryCard, renderCountryList, inputEl, countryEl };

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input');
const countryEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function countryCardMarkup({ name, capital, population, flags, languages }) {
  const countryCard = `
  <li class = "country_item"><div class = "country" >
  <img src="${flags.svg}" alt="${name.official}" width = "30">
  <h2 class = "country_name">${name.official}</h2></div>
  <div class = country_item_wrap>
  <p class = "country_p" > <span class = "span_element">Capital:</span> ${capital}</p>
  <p class = "country_p"> <span class = "span_element">Population:</span> ${population}</p>
  <p class = "country_p"> <span class = "span_element">Languages:</span> ${Object.values(
    languages
  ).join(', ')}</p>
  </div></li>`;

  countryEl.insertAdjacentHTML('beforeend', countryCard);
}

function counriesListMarkup({ name, flags }) {
  const countryList = `<li class = "country_item"><div class = "country"><img src="${flags.svg}" alt="${name.official}" width = "30"><h2 class = "country_list_name">${name.official}</h2></li></div>`;

  countryEl.insertAdjacentHTML('beforeend', countryList);
}

const renderCountryCard = array =>
  array.forEach(card => countryCardMarkup(card));

const renderCountryList = array =>
  array.forEach(list => counriesListMarkup(list));

// не вдається запушити оновлення  