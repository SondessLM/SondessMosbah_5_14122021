/**
 * Display product in local storage on my cart.
 */
async function displayProductCart() {
  let localStorageCart = getLocalStorageCart();
  if (localStorageCart && null != localStorageCart && "undefined" != localStorageCart) {
    localStorageCart = JSON.parse(localStorageCart);
    let cartItemsSelector = document.querySelector("#cart__items");
    localStorageCart.forEach(async function (cartItem) {

      let product = await getProduct(cartItem.productId);

      //Creation de l'élément / balise article du produit dans le panier.
      var productArticleSelector = document.createElement("article");
      productArticleSelector.setAttribute("data-id", "product.html?id=" + cartItem.productId);
      productArticleSelector.setAttribute("data-color", "product.html?id=" + cartItem.productColor);
      productArticleSelector.classList.add("cart__item");

      //Creation de l'élément / balise div coneteur de l'image du produit dans le panier.
      var productImageContainerSelector = document.createElement("div");
      productImageContainerSelector.classList.add("cart__item__img");

      //Creation de l'élément / balise image du produit dans le panier.
      var productImageSelector = document.createElement("img");
      productImageSelector.setAttribute("src", product.imageUrl);
      productImageSelector.setAttribute("alt", product.altTxt);

      //Creation de l'élément / balise conteneur du produit dans le panier.
      var productCartItemContentSelector = document.createElement("div");
      productCartItemContentSelector.classList.add("cart__item__content");

      //Creation de l'élément / balise conteneur decriptif du produit dans le panier.
      var productCartItemContentDescriptionSelector = document.createElement("div");
      productCartItemContentDescriptionSelector.classList.add("cart__item__content__description");

      //Creation de l'élément / balise nom du produit dans le panier.
      var productNameSelector = document.createElement("h2");
      productNameSelector.textContent = product.name;

      //Creation de l'élément / balise couleur choisie pour le produit dans le panier.
      var productChoseColorSelector = document.createElement("p");
      productChoseColorSelector.textContent = cartItem.productColor;

      //Creation de l'élément / balise prix du produit dans le panier.
      var productPriceSelector = document.createElement("p");
      productPriceSelector.textContent = product.price;

      productImageContainerSelector.appendChild(productImageSelector);

      productCartItemContentDescriptionSelector.appendChild(productNameSelector);
      productCartItemContentDescriptionSelector.appendChild(productChoseColorSelector);
      productCartItemContentDescriptionSelector.appendChild(productPriceSelector);

      productCartItemContentSelector.appendChild(productCartItemContentDescriptionSelector)

      productArticleSelector.appendChild(productImageContainerSelector);
      productArticleSelector.appendChild(productCartItemContentDescriptionSelector);

      cartItemsSelector.appendChild(productArticleSelector);

      for (i = 0; i < localStorageCart.length; i++) {
        let product = [];
        product.push(localStorageCart[i].id);
      }

    });
  } else {
    console.log("Le panier est vide");
  }
}

displayProductCart();

  
 
  
    
  
  