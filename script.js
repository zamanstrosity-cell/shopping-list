//Query Selectors
const shop = document.querySelector(".items-container");

//Classes and Objects

let inventory = [];


// factory function to build each item in the inventory
const newItem = (name, price, imageSource) => {
    var _itemName = name;
    var _quantity = 1;
    var _price = price;
    var _itemImageSource = imageSource;
    const updateQuantity = () => _quantity = 1;
    const increaseQuantity = () => _quantity++;
    const decreaseQuantity = () => _quantity--;
    const getQuantity = () => _quantity
    const getName = () => _itemName
    const getPrice = () => parseFloat((Math.round((_price * _quantity +  + Number.EPSILON) * 100) / 100));
    const getImageSource = () => _itemImageSource

    return { getName, getPrice, getImageSource, getQuantity, increaseQuantity, decreaseQuantity, updateQuantity };
}


// adds new item to the inventory
function addNewItem(name, price, imageSource) {
    inventory.push(newItem(name, price, imageSource))
}

addNewItem('headphones', 30.99, './images/headphones.jpg');
addNewItem('Speakers', 59.99, './images/speakers.png');
addNewItem('Microphone', 56.99, './images/microphone.jpg');
addNewItem('Laptop', 599.99, './images/laptop.jpg');
addNewItem('ChromeCast', 32.99, './images/chromeCast.jpg');
addNewItem('Camera', 399.99, './images/camera.jpg');
addNewItem('Turn-Table', 299.99, './images/turn-table.jpg');
addNewItem('Television', 899.99, './images/television.jpg');
addNewItem('FireStick', 32.99, './images/fireStick.jpg');
addNewItem('Alexa', 98.99, './images/alexa.jpg');


// code for modal

const cartModal = (() => {

    // cart header html

    const cartHeader = `<tr class="row">
<th class="cell">Image</th>
<th class="cell">Name</th>
<th class="cell">Quantity</th>
<th class="cell">Price</th>
<th class="cell">Remove</th>
</tr>`;
    // current cart items
    const inCart = [];


    // item count for cart
    const itemCount = document.querySelector(".item-count");
    itemCount.innerHTML = `${inCart.length} items`

    const updateItemCount = () => {
        itemCount.innerHTML = `${inCart.length} items`
    }
    //query selectors for modal
    var modalSel = document.querySelector(".cart-modal")
    var cartBtn = document.querySelector(".cart")
    var closeModalBtn = document.querySelector(".close");
    var totalSel = document.querySelector('#total-amount');






    // add a new item to the cart
    const addToCart = (event) => {
        var name = event.target.id;
        if (inCart.filter(item => item.getName() === name).length !== 0) {
            inCart.filter(item => item.getName() === name)[0].increaseQuantity();
            renderCart();
            updateTotal();
            return;
        }
        var item = inventory.filter(item => item.getName() === name)[0]
        inCart.push(item);
        renderCart();
        updateTotal();
    }

    // remove an item from the car at specific index and update item count in cart
    const removeFromCartIndex = (name) => {
        for (var i = 0; i < inCart.length; i++) {
            if (inCart[i].getName() === name) {
                inCart.splice(i, 1);
                updateItemCount();
            }
        }
    }


    


    // update the total of all items in cart 
    const updateTotal = () => {
        if (inCart.length === 1) {
            return totalSel.innerHTML = inCart[0].getPrice();
        } else if (inCart.length === 0) {
            return totalSel.innerHTML = '0.00';
        } else {
            var total = 0;
            inCart.forEach(item => {
                total += item.getPrice();
            });

            totalSel.innerHTML = (Math.round((total+ Number.EPSILON) * 100) / 100).toFixed(2);
        }
    }


    // render the new items in cart when they are added
    const renderCart = () => {
        document.querySelector(".cart-table").innerHTML = cartHeader;
        inCart.forEach(item => {
            let name = item.getName();
            let price = item.getPrice();
            let img = item.getImageSource();
            let quantity = item.getQuantity();
            const newRow = document.createElement('tr')
            newRow.classList.add('row');
            let innerHtml = `
        <td class="cell"><img class='product-img' src=".${img}" alt=""></td>
        <td class="cell">${name}</td>
        <td class="cell quantity-cell">
        <div class="quantity-container"> 
        ${quantity}
        <div id="icons">
        <i class="arrow up increase"></i>
        <i class="arrow down decrease"></i>
        </div>
        </div>
        </td>
        <td class="cell">${price}</td>
        <td id="${name}" class="cell remove-btn">&times</td>
        `
            newRow.innerHTML = innerHtml;
            newRow.querySelector(`#${name}`).addEventListener('click', function (e) {
                item.updateQuantity(1);
                removeFromCartIndex(name);
                updateTotal();
                e.target.parentNode.remove();
            })
            document.querySelector('.cart-table').appendChild(newRow)
            newRow.querySelector(".increase").addEventListener('click', () => {
                item.increaseQuantity();
                updateTotal();
                renderCart();
                
            });
            newRow.querySelector(".decrease").addEventListener('click', () => {
                if(item.getQuantity() < 2) return;
                item.decreaseQuantity();
                updateTotal();
                renderCart();
            })
            updateItemCount();
        });

    }


    // event listeners to control display of cart modal

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

    return { updateItemCount, addToCart }
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









