import Notiflix from 'notiflix';
import { renderCountryCard, renderCountryList, inputEl, countryEl } from './index.js';

export default function fetchCountries() {
  inputName = inputEl.value.trim();
  countryEl.innerHTML = '';

    fetch(`https://restcountries.com/v3.1/name/${inputName}?fields=name,capital,population,flags,languages`)
        .then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure("Oops, there is no country with that name");
      throw new Error(res.status);
    }
            return response.json();
  })
    .then(country => {
    if (country.length > 10) {
      Notiflix.Notify.info(
        "Too many matches found. Please enter a more specific name."
      );
    } else if (country.length >= 2 && country.length <= 10) {
      renderCountryList(country);
    }
    else {
      renderCountryCard(country);
     inputEl.value = '';
  }
    })
    .catch(error => console.log(error))
}
