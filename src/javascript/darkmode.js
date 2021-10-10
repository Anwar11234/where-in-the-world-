import icons from "./icons";

const themeSwitcher = document.querySelector('[data-theme-switcher]');
let mode = localStorage.getItem('mode');

const enableDarkMode = () => { 
    document.body.classList.add('dark');
    localStorage.setItem('mode' , 'dark');
    themeSwitcher.setAttribute('aria-label' , 'Dark mode enabled, click to enable light mode ');
    themeSwitcher.innerHTML = `${icons.sun} <span class="theme">Light Mode</span>`;
}

const disableDarkMode = () => { 
    document.body.classList.remove('dark');
    localStorage.setItem('mode' , 'light');
    themeSwitcher.setAttribute('aria-label' , 'Light mode enabled, click to enable Dark mode ');
    themeSwitcher.innerHTML = `${icons.moon} <span class="theme">Dark Mode</span>`;
}

const toggleDarkMode = () => { 
    mode = localStorage.getItem('mode');
    if(mode !== 'dark'){ 
        enableDarkMode();
    }
    else{ 
        disableDarkMode();
    }
}

themeSwitcher.addEventListener('click' , toggleDarkMode);
document.addEventListener('DOMContentLoaded' , () => { 
    if(mode === 'dark'){ 
        enableDarkMode();
    }
})