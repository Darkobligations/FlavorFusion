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



//Menu Section

const allfoodItems = [
    {
        id:1,
        image:"/image/menuImages/Rocket Burger.jpg",
        category:"burgers",
        heading:"Rocket Burger",
        price:"$7.20 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:2,
        image:"/image/menuImages/Flash Burger.jpg",
        category:"burgers",
        heading:"Flash Burger",
        price:"$5.20 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:3,
        image:"/image/menuImages/Blaze Burger.jpg",
        category:"burgers",
        heading:"Blaze Burger",
        price:"$9.60 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:4,
        image:"/image/menuImages/sizzl-Burger.jpg",
        category:"burgers",
        heading:"Sizzl-Burger",
        price:"$4.00 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:5,
        image:"/image/menuImages/Garden Symphony.jpg",
        category:"sides",
        heading:"Garden Symphony",
        price:"$8.50 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:6,
        image:"/image/menuImages/Golden Crunch.jpg",
        category:"sides",
        heading:"Golden Crunch",
        price:"$5.50 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:7,
        image:"/image/menuImages/Savory Medley.jpg",
        category:"sides",
        heading:"Savory Medley",
        price:"$6.50 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:8,
        image:"/image/menuImages/Bean Bliss.jpg",
        category:"sides",
        heading:"Bean Bliss",
        price:"$4.75 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:9,
        image:"/image/menuImages/Coca-Cola.jpg",
        category:"drinks",
        heading:"Coca-Cola",
        price:"$3.00 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:10,
        image:"/image/menuImages/Melon Splash.jpg",
        category:"drinks",
        heading:"Melon Splash",
        price:"$4.50 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:11,
        image:"/image/menuImages/Sunset Serenade.jpg",
        category:"drinks",
        heading:"Sunset Serenade",
        price:"$5.20 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:12,
        image:"/image/menuImages/Tropical Bliss.jpg",
        category:"drinks",
        heading:"Tropical Bliss",
        price:"$5.20 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
]

const initialDisplay = [
    {
        id:1,
        image:"/image/menuImages/Rocket Burger.jpg",
        category:"burgers",
        heading:"Rocket Burger",
        price:"$7.20 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:2,
        image:"/image/menuImages/Flash Burger.jpg",
        category:"burgers",
        heading:"Flash Burger",
        price:"$5.20 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:3,
        image:"/image/menuImages/Blaze Burger.jpg",
        category:"burgers",
        heading:"Blaze Burger",
        price:"$9.60 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    },
    {
        id:4,
        image:"/image/menuImages/sizzl-Burger.jpg",
        category:"burgers",
        heading:"Sizzl-Burger",
        price:"$4.00 USD",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quasi!"
    }
]

let parentMenu = document.querySelector('.container-parent');
const filterButtons = document.querySelectorAll('.menu__button');


//initially load items

window.addEventListener('DOMContentLoaded', function(){
    displayMenuItems(initialDisplay)
})

//buttons filter

filterButtons.forEach(function(filterButton){
    filterButton.addEventListener('click', function (e){
        //Current Target = menu__button-active
        document.querySelector('.menu__button-active')?.classList.remove('menu__button-active');
        filterButton.classList.add('menu__button-active')
        //Current Target = data-id
        const category = e.currentTarget.dataset.id;
        const menuButton = allfoodItems.filter(function(food_item){
            if(food_item.category === category)
            return food_item;
        })
        if(category === 'burgers'){
            displayMenuItems(initialDisplay)
            
        }else{
            displayMenuItems(menuButton)
        }
    })
})

function displayMenuItems(menuitems){
    let displayMenu = menuitems.map(function(item){
        return ` <div class = "menu__food-wrapper">
        <img src = "${item.image}" class = "menu__food-img" width = "150" height = "250" decoding = "async" loading = "lazy">
        <h3 class = "menu__food-name">${item.heading}</h3>
        <span class = "menu__food-price">${item.price}</span>
        <p class = "menu__food-desc">${item.desc}</p>
        <form class = "menu__add-to-cart">
            <input value = "1" class = "menu__capacity" type = "number"  min = "1" max = "10" inputmode="numeric" id = "menu-capacity" name = "menu-capacity">
            <button type = "submit" class = "menu__cart-button" for = "submit">Add to cart</button>
        </form>
    </div>`
    })
    displayMenu = displayMenu.join("");
    parentMenu.innerHTML = displayMenu;
}