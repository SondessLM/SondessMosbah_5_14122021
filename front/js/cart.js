
let productCart = JSON.parse(localStorage.getItem("product"));
console.table(productCart);
const EmptyCart = document.querySelector("#cart__items");

// 
function getCart() {
    if (productCart === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
     `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img ${product._id}">
        <img src="${product.imageUrl}" alt="${product.altTxt}</div>
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.colors}</p>
        <p>${product.price}€</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
         </div>
           </div>
     </article>`
    }
}