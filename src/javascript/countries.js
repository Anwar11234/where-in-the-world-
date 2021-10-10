import Card from './card';
import icons from "./icons";

const regions = document.querySelectorAll('[data-filter]');
const searchForm = document.querySelector('.search-input');

async function loadJSON(endpoint){ 
    const request = await fetch(endpoint);
    const response = await request.json();
    makeCards(response);

    const countryCards = document.querySelectorAll('[data-region]');
    regions.forEach(region => region.addEventListener('click' , (event) => filter(event , countryCards)));
    searchForm.addEventListener('input' , () => { 
        search(countryCards , searchForm.value);
    })
}

function makeCards(array){ 
    const countriesList = document.querySelector('.countries');
    const loading = document.querySelector('.loading');
    loading.hidden = true;
    return array.map(country => { 
        const details = {
            flag:country.flag,
            name:country.name , 
            population: country.population,
            region: country.region,
            capital: country.capital,
        };
    
        return new Card(countriesList , details);
    });
}

function filter(event , cards){
    const region = event.target.closest('li').textContent; 
    const feedback = document.querySelector('#filter-feedback');

    cards.forEach(card => { 
        card.style.display = '';
        if(card.getAttribute('data-region') !== region.trim()){ 
            card.style.display = 'none';
            giveFeedBack(feedback , region);
        }
    });
    const removeFilterBtn = feedback.querySelector('.close');
    removeFilterBtn.addEventListener('click' , () => { 
       removeFilters(cards , feedback);
    })
}   

function removeFilters(cards , feedback){ 
    cards.forEach(card => {
        card.style.display = '';
        feedback.innerHTML = '';
    })
}

function giveFeedBack(feedbackElement , region){ 
    feedbackElement.innerHTML = `Countries filtered by: 
    <div class="flex flex-between">
        <span>${region} region</span> 
        <button class="close" aria-label="remove filter and show all countries">
            ${icons.close}
        </button>
    </div>
    `;
}

function search(cards , searchText){ 
    const regex =  new RegExp(`^${searchText}` , 'gi');
    cards.forEach(card => { 
        const cardTitle = card.querySelector('.card__title').textContent;
        if(cardTitle.match(regex)){ 
            card.style.display = '';
        }
        else{ 
            card.style.display = 'none';
        }
    })
}

loadJSON('https://restcountries.com/v2/all');