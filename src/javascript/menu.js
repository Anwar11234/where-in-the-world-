function toggleMenu(){ 
    if(isMenuOpen()){ 
        closeMenu();
    }
    else{ 
        openMenu();
    }
};

const filterBtn = document.querySelector('.filter-btn');
const menu = document.querySelector('.regions-list');
const menuItems = [...document.querySelectorAll('[data-filter]')];


const keyboardCodes = { 
    downArrow:'ArrowDown',
    upArrow:'ArrowUp',
    tab:'Tab',
    esc: 'Escape',
}

const openMenu = () => { 
    filterBtn.setAttribute('aria-expanded' , 'true');
    menuItems[0].focus();
}

const closeMenu = () => { 
    filterBtn.setAttribute('aria-expanded' , 'false');
}

const isMenuOpen = () => { 
    return filterBtn.getAttribute('aria-expanded') === 'true';
}

filterBtn.addEventListener('click' , toggleMenu );
menuItems.forEach(menuItem => menuItem.addEventListener('click' , closeMenu));

filterBtn.addEventListener('keydown' , event => { 
    if(event.code === keyboardCodes.downArrow) {
        event.preventDefault();
        openMenu()
    };
    if(event.code === keyboardCodes.upArrow && isMenuOpen()) {
        event.preventDefault();
        closeMenu()
    };
});

menu.addEventListener('keydown' , event => { 
    if(event.code === keyboardCodes.downArrow || event.code === keyboardCodes.upArrow){
        event.preventDefault();
    }

    const selected = document.activeElement;
    const next = selected.parentElement.nextElementSibling;
    const prev = selected.parentElement.previousElementSibling;

    if(event.code === keyboardCodes.downArrow && !next) menuItems[0].focus();

    if(event.code === keyboardCodes.upArrow && !prev) menuItems[menuItems.length -1].focus();

    if(event.code === keyboardCodes.downArrow && next) next.querySelector('[data-filter]').focus(); 

    if(event.code === keyboardCodes.upArrow && prev) prev.querySelector('[data-filter]').focus();

})

document.addEventListener('keydown' , event => { 
    if(event.code === keyboardCodes.esc) closeMenu();
});