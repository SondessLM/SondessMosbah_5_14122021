var cart = getLocalStorageCart();
console.log(cart.length)
if (cart && null != cart && "undefined" != cart && cart.length > 0) {
  console.log(cart.length);
  cart = JSON.parse(cart);
 // var cartItemsSelector = document.querySelector("#cart__items");
  cart.forEach(async function (cartItem){
  //for ( let product in cart){
    let product = await getProduct(cartItem.productId);

    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.classList.add("cart__item");
    productArticle.setAttribute("data-id", "product.html?id=" + cartItem.productId);
    productArticle.setAttribute("ddata-color", "product.html?id=" + cartItem.productColor);
    

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
    productItemContent.classList.add( "cart__item__content");

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.classList.add ("cart__item__content__titlePrice");
    
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
    productPrice.innerHTML = product.price + " €" ;
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
    productQte.innerHTML = "Qté : ";

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
    buttonDelete.classList.add ("deleteItem");
    buttonDelete.innerHTML = "Supprimer";           
  });
  // Tu devras travailler ici
  // Le but est de parcourir la variable cart qui est un tableau contenant les produits
  // ajouter au panier.
  // A chaque tour de parcours tu devra afficher le produits sur la page panier 
  // en respect le design proposer
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
  alert=("Votre panier est vide.");
 }
 
function getTotals(){

    // Récupération du total des quantités
   
    var productQuantity = document.getElementsByClassName('itemQuantity');
     totalQuantity = 0;
     console.log (productQuantity);

    for (var i = 0; i < productQuantity.length ; ++i) {
        totalQuantity += productQuantity.valueAsNumber;
        }
       
   

     let productTotalQuantity = document.querySelector('#totalQuantity');
     productTotalQuantity.innerHTML = totalQuantity;
     console.log(totalQuantity);
  
    // Récupération du prix total
     totalPrice = 0;

    for (var i = 0; i < productQuantity.length; ++i) {
        totalPrice += (productQuantity[i].valueAsNumber * cart[i].price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function quantityModification() {
    let ModifyQuantity = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < ModifyQuantity.length; k++){
        ModifyQuantity[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = cartItem[k].productQuantity;
            let ModifyQuantityValue = ModifyQuantity[k].valueAsNumber;
            
            const localStorageCart = cart.find((el) => el.ModifyQuantityValue !== quantityModif);

            localStorageCart.productQuantity = ModifyQuantityValue;
            cartItem[k].productQuantity = localStorageCart.productQuantity;

            localStorage.setItem("product", JSON.stringify(cart));
        
            // refresh rapide
            location.reload();
        })
    }
}
quantityModification();

// Suppression d'un produit
function deleteProduct() {
    let buttonDelete = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < buttonDelete.value; j++){
        buttonDelete[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = cart[j].productId;
            let colorDelete = cart[j].productColor;

            cart = cart.filter( el => el.productId !== idDelete || el.productColor !== colorDelete );
            
            localStorage.setItem("cart", JSON.stringify(cart));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

//push form
function postForm() {
  let orderId = document.querySelector('#order');
  orderId.addEventListener('click', (event) => {
   event.preventDefault();

  //create form in object
 let contact = {
 firstName: document.querySelector('#firstName').value,
 lastName: document.querySelector('#lastName').value,
 address: document.querySelector('#address').value,
 city: document.querySelector('#city').value,
 email: document.querySelector('#email').value,
    }

//valid informations input
    //FirstName
    function firstNameControl() {
      let firstNameValid = contact.firstName;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(firstNameValid)) {
        let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
        firstNameErrorMsg.style.display = 'none';
        return true;
      } else {
        firstNameErrorMsg.innerHTML = "Veuillez renseigner votre prénom.";
      }
    }

    //LastName
    function lastNameControl() {
      const lastNameValid = contact.lastName;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(lastNameValid)) {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        lastNameErrorMsg.style.display = 'none';
        return true;
      } else {
        lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom.";
      }
    }

    //Adress
    function addressControl() {
      const validAdress = contact.address;
      if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(validAdress)) {
        let addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.style.display = 'none';
        return true;
      } else {
        addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse de livraison.";
      }
    }

    // City
    function cityControl() {
      const cityValid = contact.city;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(cityValid)) {
        let cityErrorMsg = document.getElementById('cityErrorMsg');
        cityErrorMsg.style.display = 'none';
        return true;
      } else {
        cityErrorMsg.innerHTML = "Veuillez renseigner votre ville.";
      }
    }
    //Email
    function emailControl() {
      const emailValid = contact.email;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValid)) {
        let emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.style.display = 'none';
        return true;
      } else {
        emailErrorMsg.innerHTML = "Erreur ! Email non valide";
      }
    }

    // localStorage
    function validControl() {
      if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
        return true;
      } else {
        alert('veuillez vérifier les données du formulaire')
      }
    }

    //ajouter dans un objet
    let sendForm = {
      contact,
      
    }

    let options = {
      method: 'POST',
      body: JSON.stringify(sendForm),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    };
    

    fetch("http://localhost:3000/api/products/order", options) 
      .then(response => response.json())
      .then(product => {
          const orderId = product.orderId;
        if (validControl()) {
          document.location.href = 'confirmation.html' + '?orderId=' + orderId;
        }
      })
  })
}
postForm();
