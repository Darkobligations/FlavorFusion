let menuOpen = document.querySelector('.navigation__wrapper');
let navigation__toggle = document.querySelector('.navigation__toggle');

document.getElementById('menuToggle').addEventListener('click', function(){
    navigation__toggle.classList.toggle('active');
    menuOpen.classList.toggle('open');
})