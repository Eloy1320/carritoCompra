const addToShoppingCartButtons = document.querySelectorAll('.addToCart');


addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const buyButton = document.querySelector('.btnBuy');
buyButton.addEventListener('click', buyButtonClicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCart');

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest(".item");

    const itemTitle = item.querySelector(".item-title").textContent;
    const itemPrice = item.querySelector(".item-price").textContent;
    const itemImg = item.querySelector(".item-img").src;


    addItemToShoppingCart(itemTitle, itemPrice, itemImg);


}

function addItemToShoppingCart(itemTitle, itemPrice, itemImg) {

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartTitle')


    for (let i = 0; i < elementsTitle.length; i++) {

        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[i].parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            updateShoppingCartTotal();
            return;
        }

    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
                <div class="row shoppingCartItem">

                  <div class="col-sm-6 col-xs-6 col-md-6 col-lg-6 py-2">
                  
                    <img class="" width="60" height="70" src="${itemImg}">
                    <titulo class="shoppingCartTitle">${itemTitle}</titulo>
                  </div>
  
                  <div class="col-sm-2 col-xs-2 col-md-3 col-lg-3 py-2">
                    <p class="text-start shoppingCartPrice">${itemPrice}</p>
                  </div>
  
                  <div class="col-sm-4 col-xs-4 col-md-3 col-lg-3 py-2" >
                    <input class="shoppingCartItemQuantity" type="number" value="1" style="width : 48px; height: 30px">
                    <button class="btn btn-danger btn-sm btnDelete" type="button" >X</button>
                  </div>


                </div>`;

    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector('.btnDelete').addEventListener('click', removeShoppingCartItem);
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChange);

    updateShoppingCartTotal();
}


function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartPrice')
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''));


        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemQuantity * shoppingCartItemPrice;

    });

    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;

}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChange(event) {
    const input = event.target;

    if (input.value >= 100) {
        input.value = 99;
    }

    if (input.value <= 0) {
        input.value = 1;
    }
    updateShoppingCartTotal();
}

function buyButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';

    updateShoppingCartTotal();
    alert("Gracias por tu Compra");
}