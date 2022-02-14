displayProductInCart();


/**
 * Display product in cart.
 */
function displayProductInCart(){
  var cart = getLocalStorageCart();
  if (cart && null != cart && "undefined" != cart && cart.length > 0) {
    cartItems = JSON.parse(cart);
    cartItems.forEach(async function (cartItem, index){
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
      productPrice.textContent = product.price + " €" ;
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
      buttonDelete.classList.add ("deleteItem");
      buttonDelete.textContent = "Supprimer";    
      quantityModification(cartItem, index, productQuantity); 
      deleteProduct(cartItem,index);
           
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
    alert=("Votre panier est vide.");
   }
   updateSubTotal();
}

/**
 * Update sub total (Total quantity and total price)
 */
function updateSubTotal(){ 
  var cart = getLocalStorageCart();

  let productTotalQuantity = document.querySelector('#totalQuantity');
  let productTotalPrice = document.querySelector('#totalPrice');
  
  totalQuantity = 0; 
  totalPrice = 0; 
  
  if (cart && null != cart && "undefined" != cart && cart.length > 0) {
    cartItems = JSON.parse(cart);
    cartItems.forEach( function (cartItem){
      totalQuantity += parseInt(cartItem.productQuantity);
      totalPrice +=  cartItem.productQuantity * cartItem.productPrice;
    });
  }   
  productTotalQuantity.textContent = totalQuantity;
  productTotalPrice.textContent = totalPrice;

  } if (totalQuantity == 0 && totalPrice == 0){
    
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
     
    
  


// Modification d'une quantité de produit
function quantityModification(item, itemIndex, productsQuantitySelector) {
  let productQuantity= document.querySelector('.itemQuantity')
  productsQuantitySelector.addEventListener("change" , (event) => {
    event.preventDefault();
    var cart = getLocalStorageCart();
    cartItems = JSON.parse(cart);
    //for (cartItem in cartItems){
    if (cart && null != cart && "undefined" != cart && cart.length > 0) {
      item.productQuantity = productQuantity.value;      
      cartItems[itemIndex] = item;
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }//}
    updateSubTotal()
  });
}

function deleteProduct(item,index){
  let deleteButton = document.getElementsByClassName("deleteItem");
  for (let button of deleteButton) {
    button.addEventListener("click", function (event) {
      let buttonClicked = event.target;
      let itemToDelete = buttonClicked.closest("section > article");
      
      let itemToDeleteId = itemToDelete.getAttribute("data-id");
      let itemToDeleteColor = itemToDelete.getAttribute("data-color");
      itemToDelete.remove(); 
      let productQuantity=document.querySelector('.itemQuantity');
      productQuantity == null;
      var cart = getLocalStorageCart();
        cartItems = JSON.parse(cart);
        for ( let cartItem in cartItems){
        cartItems[index] = item;           
        item == 0;
        cartItem.productId=== itemToDeleteId && cartItem.productColor === itemToDeleteColor;
         cartItem.productQuantity == null;
         
         //cartItem[index] = item;          
        cartItems.splice(item, 1); 
        localStorage.setItem('cart', JSON.stringify(cartItems));    
       } 
       updateSubTotal() ;          
        
                
        
        var ProductToDelete = confirm("Souhaitez vous suprimer le produit de votre panier ?")
        if (ProductToDelete) {
          alert("votre produit a été bien supprimé.")
       }else{
       window.location.href = "../html/cart.html";
       }
       
      });   
      }    
    }
  
//Liste les id des produits dans le panier
//function Products() {
  const cart = getLocalStorageCart();
let products = [];
  //for (i in cart) {
    // products.push(cart[i]);
     localStorage.setItem('cart', JSON.stringify(products));
    

  //}
//}  
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
//RegEx
let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let adressRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');
//valid informations input
    //FirstName
    function firstNameControl() {
      let firstNameValid = contact.firstName;
      if (nameRegex.test(firstNameValid)) {
        let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
        firstNameErrorMsg.style.display = 'none';
        return true;
      } else {
        firstNameErrorMsg.textcontent = "Veuillez renseigner votre prénom.";
      }
    }

     //LastName
    function lastNameControl() {
      const lastNameValid = contact.lastName;
      if (nameRegex.test(lastNameValid)) {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        lastNameErrorMsg.style.display = 'none';
        return true;
      } else {
        lastNameErrorMsg.textContent = "Veuillez renseigner votre nom.";
      }
    }

 //Adress
    function addressControl() {
      const validAdress = contact.address;
      if (adressRegex.test(validAdress)) {
        let addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.style.display = 'none';
        return true;
      } else {
        addressErrorMsg.textContent = "Veuillez renseigner votre adresse de livraison.";
      }
    }

    // City
    function cityControl() {
      const cityValid = contact.city;
      if (nameRegex.test(cityValid)) {
        let cityErrorMsg = document.getElementById('cityErrorMsg');
        cityErrorMsg.style.display = 'none';
        return true;
      } else {
        cityErrorMsg.textContent = "Veuillez renseigner votre ville.";
      }
    }
    //Email
    function emailControl() {
      const emailValid = contact.email;
      if (emailRegex.test(emailValid)) {
        let emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.style.display = 'none';
        return true;
      } else {
        emailErrorMsg.textContent = "Erreur ! Email non valide";
      }
    }
    // localStorage
    function validControl() {
      if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
        return true;
      } else {
        alert('veuillez vérifier les données du formulaire');
        
      }
    }
     let orderId = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact, //: {
        //   firstName: document.querySelector('#firstName').value,
        //   lastName: document.querySelector('#lastName').value,
        //   address: document.querySelector('#address').value,
        //   city: document.querySelector('#city').value,
        //   email: document.querySelector('#email').value,
        //      },
        products,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (response) {
        return response.orderId;
      });  
    window.location.href = `../html/confirmation.html?orderid=${orderId}`;
        if (validControl()) {
          document.location.href = 'confirmation.html';
        }
      })
  
}
postForm();
      
