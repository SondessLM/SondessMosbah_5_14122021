displayProductInCart();

/**
 * Display product in cart.
 */
function displayProductInCart() {
  var cart = getLocalStorageCart();
  if (cart && null != cart && "undefined" != cart && cart.length > 0) {
    cartItems = JSON.parse(cart);
    cartItems.forEach(async function (cartItem, index) {
      //for ( let product in cart){
      let product = await getProduct(cartItem.productId);

      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.classList.add("cart__item");
      productArticle.setAttribute("data-id", cartItem.productId);
      productArticle.setAttribute("data-color", cartItem.productColor);


      // Insertion de l'élément "div"
      let productDivPicture = document.createElement("div");
      productArticle.appendChild(productDivPicture);
      productDivPicture.classList.add("cart__item__img");

      // Insertion de l'image
      let productPicture = document.createElement("img");
      productDivPicture.appendChild(productPicture);
      productPicture.setAttribute("src", product.imageUrl);
      productPicture.setAttribute("alt", product.altTxt);

      // Insertion de l'élément "div"
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.classList.add("cart__item__content");

      // Insertion de l'élément "div"
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

      // Insertion du titre h3
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.textContent = product.name;

      // Insertion de la couleur
      let productColorSelector = document.createElement("p");
      productTitle.appendChild(productColorSelector);
      productColorSelector.textContent = cartItem.productColor;
      productColorSelector.style.fontSize = "20px";

      // Insertion du prix
      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.textContent = product.price + " €";
      //productPrice.textContent = product.price + " €";

      // Insertion de l'élément "div"
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.classList.add("cart__item__content__settings");

      // Insertion de l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsQuantity);
      productItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

      // Insertion de "Qté : "
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.textContent = "Qté : ";

      // Insertion de la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = cartItem.productQuantity;
      productQuantity.classList.add("itemQuantity");
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

      // Insertion de "p" supprimer
      let buttonDelete = document.createElement("p");
      productItemContentSettingsDelete.appendChild(buttonDelete);
      buttonDelete.classList.add("deleteItem");
      buttonDelete.textContent = "Supprimer";
      quantityModification(cartItem, index, productQuantity);
      deleteProduct(cartItem, index, buttonDelete);

    });

  } else {
    //Creation de l'élément / balise  erreur.
    var errorMessageSelector = document.createElement("p");
    errorMessageSelector.textContent = "Votre panier est vide. Veuillez continuer votre achat dans la ";

    var shopLinkSelector = document.createElement("a");
    shopLinkSelector.href = "index.html";
    shopLinkSelector.textContent = "Boutique";

    errorMessageSelector.appendChild(shopLinkSelector);

    var cartItemsSelector = document.querySelector("#cart__items");
    cartItemsSelector.appendChild(errorMessageSelector);
    cartItemsSelector.style.textAlign = "center";
    cartItemsSelector.style.fontSize = "1.5em";
    var formSelector = document.querySelector(".cart__order");
    formSelector.style.display = "none";
    alert = ("Votre panier est vide.");
  }
  updateSubTotal();
}

/**
 * Update sub total (Total quantity and total price)
 */
function updateSubTotal() {
  var cart = getLocalStorageCart();

  let productTotalQuantity = document.querySelector('#totalQuantity');
  let productTotalPrice = document.querySelector('#totalPrice');

  totalQuantity = 0;
  totalPrice = 0;

  if (cart && null != cart && "undefined" != cart && cart.length > 0) {
    cartItems = JSON.parse(cart);
    cartItems.forEach(function (cartItem) {
      totalQuantity += parseInt(cartItem.productQuantity);
      totalPrice += cartItem.productQuantity * cartItem.productPrice;
    });
  }
  productTotalQuantity.textContent = totalQuantity;
  productTotalPrice.textContent = totalPrice;

  if (totalQuantity == 0 && totalPrice == 0) {
    var errorMessageSelector = document.createElement("p");
    errorMessageSelector.textContent = "Votre panier est vide. Veuillez continuer votre achat dans la ";

    var shopLinkSelector = document.createElement("a");
    shopLinkSelector.href = "index.html";
    shopLinkSelector.textContent = "Boutique";

    errorMessageSelector.appendChild(shopLinkSelector);

    var cartItemsSelector = document.querySelector("#cart__items");
    cartItemsSelector.appendChild(errorMessageSelector);
    cartItemsSelector.style.textAlign = "center";
    cartItemsSelector.style.fontSize = "1.5em";
    var formSelector = document.querySelector(".cart__order");
    formSelector.style.display = "none";
    alert = ("Votre panier est vide.");
  }

}

/**
 * Modification d'une quantité de produit
 * @param {*} item 
 * @param {*} itemIndex 
 * @param {*} productsQuantitySelector 
 */
function quantityModification(item, itemIndex, productsQuantitySelector) {
  productsQuantitySelector.addEventListener("change", (event) => {
    event.preventDefault();
    var cart = getLocalStorageCart();
    if (cart && null != cart && "undefined" != cart && cart.length > 0) {
      item.productQuantity = productsQuantitySelector.value;
      cartItems = JSON.parse(cart);
      cartItems[itemIndex] = item;
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    updateSubTotal()
  });
}

/**
 * 
 * @param {*} item 
 * @param {*} index 
 * @param {*} buttonDelete 
 */
function deleteProduct(item, index, buttonDelete) {
  buttonDelete.addEventListener("click", function (event) {
    var ProductToDelete = confirm("Souhaitez vous suprimer le produit de votre panier ?")
    if (ProductToDelete) {
      let buttonClicked = event.target;
      let itemToDelete = buttonClicked.closest("section > article");

      let itemToDeleteId = itemToDelete.getAttribute("data-id");
      let itemToDeleteColor = itemToDelete.getAttribute("data-color");
      itemToDelete.remove();
      let productQuantity = document.querySelector('.itemQuantity');
      productQuantity == null;
      var cart = getLocalStorageCart();
      cartItems = JSON.parse(cart);
      for (let cartItem in cartItems) {
        cartItems[index] = item;
        item == 0;
        cartItem.productId === itemToDeleteId && cartItem.productColor === itemToDeleteColor;
        cartItem.productQuantity == null;
        //cartItem[index] = item;          
        cartItems.splice(item, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
      location.reload();
      updateSubTotal();
      alert("votre produit a été bien supprimé.")
    }
  });
}

/**
 * Check if first name is valid.
 * 
 * @returns {bool} isValidFirstName Is valide first name.
 */
function isValidFirstName() {
  let isValidFirstName = false;
  let firstNameSelector = document.getElementById("firstName");
  let firstNameValue = firstNameSelector.value;
  let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
  if (nameRegex.test(firstNameValue)) {
    firstNameErrorMsg.textContent = "";
    isValidFirstName = true;
  } else {
    firstNameErrorMsg.textContent = "Veuillez renseigner votre prénom.";
  }
  return isValidFirstName;
}

/**
 * Check if last name is valid.
 * 
 * @returns {bool} isValidLastName Is valide last name.
 */
function isValidLastName() {
  let isValidLastName = false;
  let lastNameSelector = document.getElementById("lastName");
  let lastNameValue = lastNameSelector.value;
  let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
  let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
  if (nameRegex.test(lastNameValue)) {
    lastNameErrorMsg.textContent = "";
    isValidLastName = true;
  } else {
    lastNameErrorMsg.textContent = "Veuillez renseigner votre nom.";
  }
  return isValidLastName;
}

/**
 * Check if adress is valid.
 * 
 * @returns {bool} isValidAdress Is valide adress.
 */
function isValidAdress() {
  let isValidAdress = false;
  let addressSelector = document.getElementById("address");
  let addressalue = addressSelector.value;
  let addressErrorMsg = document.getElementById('addressErrorMsg');
  let adressRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');
  if (adressRegex.test(addressalue)) {
    addressErrorMsg.textContent = "";
    isValidAdress = true;
  } else {
    addressErrorMsg.textContent = "Veuillez renseigner votre adresse.";
  }
  return isValidAdress;
}

/**
 * Check if city is valid.
 * 
 * @returns {bool} isValidCity Is valide city.
 */
function isValidCity() {
  let isValidCity = false;
  let citySelector = document.getElementById("city");
  let cityValue = citySelector.value;
  let cityErrorMsg = document.getElementById('cityErrorMsg');
  let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
  if (nameRegex.test(cityValue)) {
    cityErrorMsg.textContent = "";
    isValidCity = true;
  } else {
    cityErrorMsg.textContent = "Veuillez renseigner votre nom.";
  }
  return isValidCity;
}

/**
 * Check if email is valid.
 * 
 * @returns {bool} isValidEmail Is valide email.
 */
function isValidEmail() {
  let isValidEmail = false;
  let emailSelector = document.getElementById("email");
  let emailValue = emailSelector.value;
  let emailErrorMsg = document.getElementById('emailErrorMsg');
  let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  if (emailRegex.test(emailValue)) {
    emailErrorMsg.textContent = "";
    isValidEmail = true;
  } else {
    emailErrorMsg.textContent = "Veuillez renseigner votre nom.";
  }
  return isValidEmail;
}

//push form
function postForm() {
  let orderId = document.querySelector('#order');
  orderId.addEventListener('click', (event) => {
    event.preventDefault();
    //Initialisation de la variable contenant les inction de contact du client.
    let contact = {
      "firstName": "",
      "lastName": "",
      "address": "",
      "city": "",
      "email": ""
    };

    //Récupération des identifiant des produits.
    const cart = getLocalStorageCart();
    cartItems = JSON.parse(cart);
    let products = [];
    cartItems.forEach(function (cartItem) {
      console.log(cartItem);
      products.push = cartItem["productId"];
    });

    let validFirstName = isValidFirstName();
    let validLastName = isValidLastName();
    let validAdress = isValidAdress();
    let validCity = isValidCity();
    let validEmail = isValidEmail();

    //console.log(validFirstName, validLastName, validAdress, validCity, validEmail);

    if (validFirstName && validLastName && validAdress && validCity && validEmail) {
       
      
      //Ici le forumaire il est valide 
      //Donc tu peut construire l'objet order avec a l'interieur l'objet contact et l'objet produit.
      //Contacter l'API pour renregistrer la commamde.
    
      localStorage.setItem('contact', JSON.stringify(contact));  
      const order = {
      contact,
      products,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' ,
        
      }      
    };
  
    fetch('http://localhost:3000/api/products/order',options)
        .then((res) => {
          return res.json();
        })
        .then((product) => {
          const orderId = product.orderId;
          
          
          //envoie vers la page de de confirmation
          localStorage.setItem("order", JSON.stringify(orderId));
          document.location.href = `confirmation.html?id=${orderId}`;            
          
           
        })
        .catch((error) => {
          alert(error);
        });
         
    
     // fin eventListener postForm
    } else {// fin envoi du for
      alert("Veuillez vérifier les données du formulaire.");}
})}

  
postForm();