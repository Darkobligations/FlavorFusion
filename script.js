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
        desc:"A celestial delight featuring a harmonious blend of fresh lettuce, succulent tomatoes, and savory cheese."
    },
    {
        id:2,
        image:"/image/menuImages/Flash Burger.jpg",
        category:"burgers",
        heading:"Flash Burger",
        price:"$5.20 USD",
        desc:"Flavor-packed delight with zesty tomatoes, creamy cheese, tangy pickles, and crisp lettuce. Get ready for a taste explosion!"
    },
    {
        id:3,
        image:"/image/menuImages/Blaze Burger.jpg",
        category:"burgers",
        heading:"Blaze Burger",
        price:"$9.60 USD",
        desc:"Fiery combination of fresh lettuce, juicy tomatoes, melted cheese, seasoned buns, and a pop of flavor from purple onions."
    },
    {
        id:4,
        image:"/image/menuImages/sizzl-Burger.jpg",
        category:"burgers",
        heading:"Sizzl-Burger",
        price:"$4.00 USD",
        desc:"Sizzling sensation of flavor featuring crispy onion rings, savory bacon, melted cheese, and a tangy hint of ketchup."
    },
    {
        id:5,
        image:"/image/menuImages/Garden Symphony.jpg",
        category:"sides",
        heading:"Garden Symphony",
        price:"$8.50 USD",
        desc:"This refreshing salad showcases crisp lettuce, briny olives, nutritious spinach, hearty bread croutons, roasted red peppers, and creamy avocado. "
    },
    {
        id:6,
        image:"/image/menuImages/Golden Crunch.jpg",
        category:"sides",
        heading:"Golden Crunch",
        price:"$5.50 USD",
        desc:"A bowl of fries topped with parsley, served with tangy BBQ sauce. Indulge in the ultimate crispy delight!"
    },
    {
        id:7,
        image:"/image/menuImages/Crispy Fried Calamari.jpg",
        category:"sides",
        heading:"Crispy Fried Calamari",
        price:"$6.50 USD",
        desc:" Tender calamari rings, lightly battered and fried to a golden crisp. Served with zesty honey mustard sauce for the perfect seafood indulgence."
    },
    {
        id:8,
        image:"/image/menuImages/Potato Wedges.jpg",
        category:"sides",
        heading:"Potato Wedges",
        price:"$4.75 USD",
        desc:"Golden-brown, crispy delights that offer a fluffy interior. These seasoned wedges are a timeless favorite, perfect as a satisfying side or snack. "
    },
    {
        id:9,
        image:"/image/menuImages/Coca-Cola.jpg",
        category:"drinks",
        heading:"Coca-Cola",
        price:"$3.00 USD",
        desc:"Coca-Cola - the iconic, refreshing soft drink with a perfect balance of sweetness and effervescence. Sip and enjoy!"
    },
    {
        id:10,
        image:"/image/menuImages/Melon Splash.jpg",
        category:"drinks",
        heading:"Melon Splash",
        price:"$4.50 USD",
        desc:"A refreshing and invigorating beverage that captures the essence of juicy melons. "
    },
    {
        id:11,
        image:"/image/menuImages/Water.jpg",
        category:"drinks",
        heading:"Water",
        price:"$5.20 USD",
        desc:"This transparent, odorless, and tasteless beverage is nature's gift, hydrating and revitalizing our bodies."
    },
    {
        id:12,
        image:"/image/menuImages/Strawberry Swirl.jpg",
        category:"drinks",
        heading:"Strawberry Swirl",
        price:"$5.20 USD",
        desc:"A delightful treat that combines the luscious sweetness of strawberries with a swirl of indulgence."
    },
]

const initialDisplay = [
    {
        id:1,
        image:"/image/menuImages/Rocket Burger.jpg",
        category:"burgers",
        heading:"Rocket Burger",
        price:"$7.20 USD",
        desc:"A celestial delight featuring a harmonious blend of fresh lettuce, succulent tomatoes, and savory cheese."
    },
    {
        id:2,
        image:"/image/menuImages/Flash Burger.jpg",
        category:"burgers",
        heading:"Flash Burger",
        price:"$5.20 USD",
        desc:"Flavor-packed delight with zesty tomatoes, creamy cheese, tangy pickles, and crisp lettuce. Get ready for a taste explosion!"
    },
    {
        id:3,
        image:"/image/menuImages/Blaze Burger.jpg",
        category:"burgers",
        heading:"Blaze Burger",
        price:"$9.60 USD",
        desc:"Fiery combination of fresh lettuce, juicy tomatoes, melted cheese, seasoned buns, and a pop of flavor from purple onions."
    },
    {
        id:4,
        image:"/image/menuImages/sizzl-Burger.jpg",
        category:"burgers",
        heading:"Sizzl-Burger",
        price:"$4.00 USD",
        desc:"Sizzling sensation of flavor featuring crispy onion rings, savory bacon, melted cheese, and a tangy hint of ketchup."
    }
]

let parentMenu = document.querySelector('.menu__food-wrapper');
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
        return `
        <div class = "menu__food-wrapper">
            <div class = "menu__food-card">
                <picture class = "menu__food-img">
                <img src = "${item.image}" width = "150" height = "250" decoding = "async" loading = "lazy">
                </picture>
                <h3 class = "menu__food-name">${item.heading}</h3>
                <span class = "menu__food-price">${item.price}</span>
                <p class = "menu__food-desc">${item.desc}</p>
                <form class = "menu__add-to-cart">
                    <input value = "1" class = "menu__capacity" type = "number"  min = "1" max = "10" inputmode="numeric" id = "menu-capacity" name = "menu-capacity">
                    <button type = "submit" class = "menu__cart-button add-to-cart" for = "submit">Add to cart</button>
                </form>
            </div>
        </div> `
    })
    displayMenu = displayMenu.join("");
    parentMenu.innerHTML = displayMenu;
}

//Start of shopping cart

