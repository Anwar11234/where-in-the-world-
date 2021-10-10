import icons from './icons';

const countries = document.querySelector('.countries');
const details = document.querySelector('.details');
const focusable = [];
const openDetails = (event) => { 
    const target = event.target.closest('[data-details]');
    if(!target) return;
    getDetails(target.getAttribute('data-details'));
}
countries.addEventListener('click'  , openDetails);

async function getDetails(name){ 
    const request = await fetch(`https://restcountries.com/v2/name/${name}`);
    const response = await request.json();
    showDetails(response[0]);
}

function showDetails(country){ 
    const currencies = country.currencies.map(object => object.name);
    const languages = country.languages.map(object => object.name);
    
    addHtml(country,currencies , languages);
    if(country.borders){ 
        country.borders.map(async code => { 
            const request = await fetch(`https://restcountries.com/v2/alpha/${code}`);
            const response = await request.json();
            showBorder(response.name);
        });
    }
    else{ 
        document.querySelector('[data-border-countries]').innerHTML = '';
    }

    console.log(details.querySelectorAll('button'))
    function showBorder(name){ 
        const bordersList= document.querySelector('.borders-container');
        bordersList.innerHTML += `<dd><button data-focus   aria-label="click to view more information about ${name}" data-details="${name}" class="border btn">${name}</button></dd>`;
        bordersList.addEventListener('click' ,openDetails);
    }

    details.hidden = false;
    document.querySelector('.back').focus();
}

function addHtml(country,currencies , languages){ 
    details.innerHTML =
    `
    <div class="container">
        <button  class=" btn back flex flex-between">
            ${icons.back}
        
            Back
            <span class="visually-hidden">to all countries</span>
        </button>
        <div class="overlay"></div>
        <div class="details__content">
            <div class="flag">
                <img src="${country.flag}" alt="">
            </div>

            <div class="info">
                <h2 class="country-name">${country.name}</h2>
                
                <dl>
                    <div>
                        <dt>Native Name:</dt>
                        <dd>${country.nativeName}</dd>
                    </div>
                    <div>
                        <dt>Population:</dt>
                        <dd>${country.population.toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt>Region:</dt>
                        <dd>${country.region}</dd>
                    </div>
                    <div>
                        <dt>Sub Region:</dt>
                        <dd>${country.subregion}</dd>
                    </div>
                    <div>
                        <dt>Capital:</dt>
                        <dd>${country.capital}</dd>
                    </div>
                    <div>
                        <dt>Top Level Domain:</dt>
                        <dd>${country.topLevelDomain}</dd>
                    </div>
                    <div>
                        <dt>Currencies:</dt>
                        <dd>${currencies.join(',')}</dd>
                    </div>
                    <div>
                        <dt>Languages:</dt>
                        <dd>${languages.join(',')}</dd>
                    </div>
                </dl>
                <div class="borders">
                    <dl>
                        <div data-border-countries>
                            <dt >Border Countries:</dt>
                            <div class="borders-container"></div>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    `

    const backBtn = document.querySelector('.back');
    backBtn.addEventListener('click' , hideDetails);
    function hideDetails(){ 
        details.innerHTML = `
        <button  class=" btn back flex flex-between">
            ${icons.back}
            Back
        </button>`;

        details.hidden = true;

    }
}