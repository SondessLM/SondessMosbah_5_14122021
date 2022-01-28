var productId = new URL(window.location.href).searchParams.get("id");

/**
 * Display  product on the product.html page.
 * 
 * @param int productId The prouct id.
 */
async function displayProduct(productId) {
  let product = await getProduct(productId);
  let item_selector = document.querySelector('.item');
  if (product) {
     //Creation de l'élément / balise article du produit choisit.
     var productIdArticleSelector = document.createElement("article");
     productIdArticleSelector.classList.add("item__content");

     //Creation de l'élément / balise div coneteur de l'image du produit choisi.
     var productIdImageContainerSelector = document.createElement("div");
     productIdImageContainerSelector.classList.add("item__img");

     //Creation de l'élément / balise image du produit choisi.
     var productIdImageSelector = document.createElement("img");
     productIdImageSelector.setAttribute("src", product.imageUrl);
     productIdImageSelector.setAttribute("alt", product.altTxt);

     //Creation de l'élément / balise conteneur du produit choisi.
     var productIdCartItemContentSelector = document.createElement("div");
     productIdCartItemContentSelector.classList.add("item__content__titlePrice");

     //Creation de l'élément / balise nom du produit .
     var productIdNameSelector = document.createElement("h1");
     productIdNameSelector.classList.add("title");
     productIdNameSelector.textContent = product.name;

     //Creation de l'élément / balise conteneur decriptif du produit.
     var productIdCartItemContentDescriptionSelectorTitle = document.createElement("p");
     productIdCartItemContentDescriptionSelectorTitle.classList.add("item__content__description__title")
     productIdCartItemContentDescriptionSelectorTitle.innerHTML = "Description:";
     ////Creation de l'élément / balise conteneur decriptif du produit.
     var productIdCartItemContentDescriptionSelector = document.createElement("div");
     productIdCartItemContentDescriptionSelector.classList.add("item__content__description")
     productIdCartItemContentDescriptionSelector.textContent = product.description;

     

     //Creation de l'élément / balise nom du produit choisi.
     var productIdDescriptionSelectors = document.createElement("p")
     productIdDescriptionSelectors.classList.add("description");
     productIdDescriptionSelectors.textContent = product.name;

     //Creation de l'élément / balise prix du produit dans le panier.
     var productIdPriceSelector = document.createElement("p");
     productIdPriceSelector.classList.add("prix");
     productIdPriceSelector.innerHTML = "Prix : " + " " + product.price + "€";       
     //productIdPriceSelector.textContent = product.price;

     //Creation de l'élément / balise couleur choisie pour le produit dans le panier.
     
     productIdChoseColorSelector.appendChild(selectColor);
     var productIdChoseColor = document.createElement("option");
     productIdChoseColor.classList.add("value");
     //productIdChoseColor.textContent = product.colors;
     productIdChoseColorSelector = document.createElement("select");  
     productIdChoseColorSelector.appendChild(productIdChoseColor);
     // {
      for (let colors of product.colors){
      var productColor = document.createElement("color");    
      productColor.value = colors;
      productColor.textContent = colors;
      productIdChoseColor.appendChild(productColor);}

      
    //creation de la balise quantité

    productIdImageContainerSelector.appendChild(productIdImageSelector);

     productIdCartItemContentDescriptionSelector.appendChild(productIdNameSelector);
     productIdCartItemContentDescriptionSelector.appendChild(productIdPriceSelector);
     productIdCartItemContentDescriptionSelector.appendChild(productIdCartItemContentSelector);
     
     productIdCartItemContentDescriptionSelector.appendChild(productIdCartItemContentDescriptionSelectorTitle);
     productIdCartItemContentDescriptionSelector.appendChild(productIdChoseColorSelector);
       
     productIdArticleSelector.appendChild(productIdImageContainerSelector);
     productIdArticleSelector.appendChild(productIdNameSelector);
     productIdArticleSelector.appendChild(productIdPriceSelector);
     productIdArticleSelector.appendChild(productIdCartItemContentDescriptionSelectorTitle);
     productIdArticleSelector.appendChild(productIdCartItemContentDescriptionSelector);

     item_selector.appendChild(productIdArticleSelector);

  

    addToCart(productId);

  } else if (false == product) {
    alert("Le produit que vous chercher est indisponble pour le moment.");
    item_selector.innerHTML = `<h2>Le produit que vous chercher est indisponble pour le moment.</h2>`;
  }
}

/**
 * Add product to cart.
 * 
 * @param int productId The prouct id.
 */
function addToCart(productId) {
  var button = document.getElementById("addToCart");
  button.innerHTML = "ajouter au panier";
  button.addEventListener("click", function () {
    const quantitySelector = document.getElementById('quantity');
    const colorSelector = document.getElementById('colors');
    const priceSelector = document.getElementById('price');
    const quantity = quantitySelector.value;
    const color = colorSelector.value;
    const price = priceSelector.innerHTML;

    if ("" == color || "undefined" == color) {
      alert("Veuillez sélectionner une couleur valide.");
    } else if (quantity <= 0 || quantity > 100 || "undefined" == quantity) {
      alert("Veuillez sélectionner une quantité valide. La quantité doit etre comprise entre 1 et 100.");
    } else {
      var localStorageCart = createlocalStorageCart();
      localStorageCart = JSON.parse(localStorageCart);
      var productExistInLocalStorageCart = checkProductExistInLocalStorageCart(productId);
      console.log(productExistInLocalStorageCart);
      if (productExistInLocalStorageCart) {
        // //Ici le produit existe deja dans le local storage, donc il faudras mettre a jour la quantite
        // //En faisant la quantite dans le localstorage + la nouvelle quantite.
        localStorageCart.forEach(function (cartItem, index) {
          if (cartItem.productId == productId) {
            cartItem.productQuantity = parseInt(cartItem.productQuantity) + parseInt(quantity);
            localStorageCart[index] = cartItem;
            localStorage.setItem('cart', JSON.stringify(localStorageCart));
            alert("La quantité de votre produit dans le panier a bien été mise a jour.");
          };
        });
      } else {
        //Ici le produit n'existe deja dans le local storage, il vas falloir l'ajouter
        var product = {
          productId: productId,
          productColor: color,
          productQuantity: parseInt(quantity),
        }
        localStorageCart.push(product);
        console.log(product);
        localStorage.setItem('cart', JSON.stringify(localStorageCart));
        alert("Votre produit a été ajouté au panier.");
      }
      var redirectToCart = confirm("Souhaitez vous accédez a votre panier ?")
      if (redirectToCart) {
        window.location.href = "../html/cart.html";
      }
    }
  }
  )
};


displayProduct(productId);