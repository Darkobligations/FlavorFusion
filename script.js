//Navigation Toggle Menu
let menuOpen = document.querySelector('.navigation__wrapper');
let navigation__toggle = document.querySelector('.navigation__toggle');
let navigationBar = document.getElementById('navigation-bar');
let menuToggle = document.getElementById('menuToggle');
//Navigation menu Open
menuToggle.addEventListener('click', function(){
    navigation__toggle.classList.toggle('active');
    menuOpen.classList.toggle('open');
    if(menuToggle.click){
        navigationBar.classList.toggle('active');
    }
    
    
})


//Order Toggle Menu
let shoppingToggle = document.getElementById('shoppingToggle');
let order_menu = document.querySelector('.navigation__order');
let closeToggle = document.getElementById('closeToggle');

shoppingToggle.addEventListener('click', function(){
    order_menu.classList.toggle('open');
})

closeToggle.addEventListener('click', function(){
    order_menu.classList.toggle('open');
})