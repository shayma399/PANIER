


var likeButtons = document.getElementsByClassName('fa-heart');
for(let i=0 ; i< likeButtons.length ; i++) {
    var button = likeButtons[i];
    button.addEventListener('click',likeHeart);
}

function likeHeart(event) {
    var button = event.target;
    button.classList.toggle('like');

}

    var itemsContainer = document.getElementsByClassName('remove')
    for (var i = 0; i < itemsContainer.length; i++) {
        var button = itemsContainer[i]
        button.addEventListener('click', removeCartItem)
    }
    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }

    var quantityInputs = document.getElementsByTagName('input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    var itemsContainer = document.getElementsByClassName('btn-purchase')
    console.log( itemsContainer)
    for (var i = 0; i < itemsContainer.length; i++) {
        var item =itemsContainer [i]
        console.log(item)
        item.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    console.log(document.getElementsByClassName('btn-purchase')[0])
    
    function purchaseClicked() {
        alert('Thank you for your purchase')
        var cartItems = document.getElementsById('purchase')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }

function addToCartClicked(event) {
    var item = event.target
    var shopItem = item.parentElement.parentElement
    var name = shopItem.getElementsByClassName('desc')[0].innerText
    var price = shopItem.getElementsByClassName('button')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('n3VNCb')[0].src
    console.log(shopItem ,name,price)
    addItemToCart(name, price, imageSrc,imageSrc)
    updateCartTotal()
}


function addItemToCart(name, price, imageSrc) {
    var cartitem = document.createElement('div')
    cartitem.classList.add('article')
    var cartItems = document.getElementById('purchase')
    var cartItemNames = cartItems.getElementsByClassName('desc')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('num')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsById('purchase')
    var cartRows = cartItemContainer.getElementsByClassName('desc')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('button')[0]
        var quantityElement = cartRow.getElementsByClassName('num')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}