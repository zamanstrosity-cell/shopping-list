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

    return { getName, getPrice, getImageSource };
}


// adds new item to the inventory
function addNewItem(name, price, imageSource) {
    inventory.push(newItem(name, price, imageSource))
}

addNewItem('headphones', 30, './images/headphones.jpg');
addNewItem('Speakers', 32, './images/speakers.png');
addNewItem('Microphone', 56.99, './images/microphone.jpg');
addNewItem('Laptop', 32, './images/laptop.jpg');


// code for modal

const cartModal = (() => {
    //query selectors for modal
    var modalSel = document.querySelector(".cart-modal")
    var cartBtn = document.querySelector(".cart")
    var closeModalBtn = document.querySelector(".close");
    var totalSel = document.querySelector('#total-amount');

    const inCart = [];


    cartBtn.onclick = function () {
        modalSel.style.display = "flex";
    }

    closeModalBtn.onclick = function () {
        modalSel.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modalSel) {
            modalSel.style.display = "none";
        }
    }

    const addToCart = (event) => {
        var name = event.target.id;
        var item = inventory.filter(item => item.getName() === name)[0]
        inCart.push(item);
        renderItemCart(item);
        updateTotal();
    }

    const updateTotal = () => {
        if (inCart.length === 1) {
            return totalSel.innerHTML = inCart[0].getPrice();
        } else if (inCart.length === 0) {
            return totalSel.innerHTML = 0;
        } else {
            var total = 0;
            inCart.forEach(item => {
                total += item.getPrice();
            });
            totalSel.innerHTML = total;
        }
    }

    const renderItemCart = (item) => {
        let name = item.getName();
        let price = item.getPrice();
        let img = item.getImageSource();
        const newRow = document.createElement('tr')
        newRow.classList.add('row');
        let innerHtml = `
        <td class="cell"><img class='product-img' src=".${img}" alt=""></td>
        <td class="cell">${name}</td>
        <td class="cell">1</td>
        <td class="cell">${price}</td>
        <td id="${name}" class="cell remove-btn">&times</td>
        `
        newRow.innerHTML = innerHtml;
        newRow.querySelector(`#${name}`).addEventListener('click', function (e) {
            removeFromCartIndex(name);
            updateTotal();
            e.target.parentNode.remove();
        })
        document.querySelector('.cart-table').appendChild(newRow)

    }

    const removeFromCartIndex = (name) => {
        for (var i = 0; i < inCart.length; i++) {
            if (inCart[i].getName() === name) {
                return inCart.splice(i, 1);
            }
        }
    }

    return { addToCart }
})()


// render the inventory to the page

function renderItem(item) {
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
    <i id=${name} class="fas fa-cart-plus add-cart" id="cart"></i>
    </div>
    `;
    newDiv.innerHTML = itemHtml;
    shop.append(newDiv);
    document.querySelector(`#${name}`).addEventListener('click', cartModal.addToCart)
};


inventory.forEach(item => {
    renderItem(item);
});









