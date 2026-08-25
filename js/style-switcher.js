const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');

styleSwitcherToggle.addEventListener('click', ()=>{
    document.querySelector('.style-switcher').classList.toggle("open")
})

window.addEventListener("scroll", ()=>{
    if(document.querySelector('.style-switcher').classList.contains('open')){
        document.querySelector('.style-switcher').classList.remove('open');
    }
})

// --- Color theme persistence ---
const alternateStyles = document.querySelectorAll('.alternate-style');
function setActiveStyle(color){
    alternateStyles.forEach((style)=>{
        if(color==style.getAttribute('title')){
            style.removeAttribute('disabled');
        }else{
            style.setAttribute('disabled', true);
        }
    })
    localStorage.setItem('color-theme', color);
}

// --- Dark mode persistence ---
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener("click",()=>{
    dayNight.querySelector('i').classList.toggle('fa-sun');
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark'));
})

window.addEventListener("load", ()=>{
    // Restore dark mode
    const savedDark = localStorage.getItem('dark-mode');
    if(savedDark === 'true'){
        document.body.classList.add('dark');
        dayNight.querySelector('i').classList.add("fa-sun");
    }else{
        dayNight.querySelector('i').classList.add("fa-moon");
    }

    // Restore color theme
    const savedColor = localStorage.getItem('color-theme');
    if(savedColor){
        setActiveStyle(savedColor);
    }
})