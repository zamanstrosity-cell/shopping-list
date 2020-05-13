//Query Selectors
const shop = document.querySelector(".items-container");


//Classes and Objects

let inventory = [];


const newItem = (name, price, imageSource) => {
    return{name, price, imageSource};
}

function addNewItem(name, price, imageSource){
    inventory.push(newItem(name, price, imageSource))
}

addNewItem('headphones', 30, './images/headphones.jpg');
addNewItem('Speakers', 32, './images/speakers.png');
addNewItem('Microphone', 56.99, './images/speakers.png');
addNewItem('Lapto', 32, './images/speakers.png');





function addItem(inventory){
    let name = item.name;
    let price = item.price;
    const newDiv = document.createElement('div');
    newDiv.classList.add("item");
    let itemHtml = `
    <div class="image-container">
    <img src=${item.imageSource} />
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
    addItem(item);
});


