class Card{ 
    constructor(container, data){ 
        this.container = container;
        this.data = data;
        this.render();
    }

    render(){ 
        this.container.innerHTML += 
        `
        <li data-region="${this.data.region}" class="card">

            <button data-details="${this.data.name}">
                <img loading="lazy" class="card__img" src="${this.data.flag}" alt="${this.data.name} flag">
            </button>

            <div class = "card__content">
                <h2 class="card__title"><button aria-label="${this.data.name}, click to view more information" data-details="${this.data.name}">${this.data.name}</button></h2>
                <dl class="card__data">
                    <div>
                        <dt>Population:</dt>
                        <dd>${this.data.population.toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt>Region:</dt>
                        <dd>${this.data.region}</dd>
                    </div>
                    <div>
                        <dt>Capital:</dt>
                        <dd>${this.data.capital}</dd>
                    </div>
                </dl>
            </div>
            
        </li>
        `
    }
}

export {Card  as default };