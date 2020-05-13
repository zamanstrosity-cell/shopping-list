//Query Selectors
const shop = document.querySelector(".items-container");


//Classes and Objects

let inventory = [];

// factory function to build each item in the inventory
const newItem = (name, price, imageSource) => {
    var _itemName = name;
    var _itemPrice = price;
    var _itemImageSource = imageSource;
    const getName = () => _itemName
    const getPrice = () => _itemPrice
    const getImageSource = () => _itemImageSource

    return{getName, getPrice, getImageSource};
}


// adds new item to the inventory
function addNewItem(name, price, imageSource){
    inventory.push(newItem(name, price, imageSource))
}

addNewItem('headphones', 30, './images/headphones.jpg');
addNewItem('Speakers', 32, './images/speakers.png');
addNewItem('Microphone', 56.99, './images/microphone.jpg');
addNewItem('Laptop', 32, './images/laptop.jpg');


// render the inventory to the page

function renderItem(item){
    let name = item.getName();
    let price = item.getPrice();
    const newDiv = document.createElement('div');
    newDiv.classList.add("item");
    let itemHtml = `
    <div class="image-container">
    <img src=${item.getImageSource()} />
    </div>
    <div class="text-container">
    <h3>${name}</h3>
    <h4>$${price}</h4>
    <i class="fas fa-cart-plus add-cart" id="cart"></i>
    </div>
    `;
    newDiv.innerHTML = itemHtml;
    shop.append(newDiv);
};


inventory.forEach(item => {
    renderItem(item);
});

inventory.forEach(item => {
    renderItem(item);
});

inventory.forEach(item => {
    renderItem(item);
});

// code for modal

const cartModal = (() =>{
    //query selectors for modal
    var modalSel = document.querySelector(".cart-modal")
    var cartBtn = document.querySelector(".cart")
    var closeModalBtn = document.querySelector(".close")

    cartBtn.onclick = function(){
        modalSel.style.display = "flex";
    }

    closeModalBtn.onclick = function(){
        modalSel.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modalSel) {
          modalSel.style.display = "none";
        }
      }
})()



