
let productCart = JSON.parse(localStorage.getItem("product"));
const emptyCart = document.querySelector("section");

// 
function getCart() {
} if (productCart === null || produitLocalStorage == 0) {
    alert("Votre panier est vide.");
    emptyCart.innerHTML = `<h3>Votre panier est vide.</h3>`;

}
else {
    `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img ${productId}">
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
        <p>${quantity.value}Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
         </div>
           </div>
     </article>
     </section>
            <div class="cart__price">
              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
            </div>
            <div class="cart__order">
              <form method="get" class="cart__order__form">
                <div class="cart__order__form__question">
                  <label for="firstName">Prénom: </label>
                  <input type="text" name="firstName" id="firstName" required>
                  <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="lastName">Nom: </label>
                  <input type="text" name="lastName" id="lastName" required>
                  <p id="lastNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="address">Adresse: </label>
                  <input type="text" name="address" id="address" required>
                  <p id="addressErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="city">Ville: </label>
                  <input type="text" name="city" id="city" required>
                  <p id="cityErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required>
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="cart__order__form__submit">
                  <input type="submit" value="Commander !" id="order">
                </div>
              </form>
            </div>
          </section>`
}
