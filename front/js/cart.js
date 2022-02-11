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
 }


// Modification d'une quantité de produit
function quantityModification(item, itemIndex, productsQuantitySelector) {
  productQuantity= document.querySelector('.itemQuantity')
  productsQuantitySelector.addEventListener("change" , (event) => {
    event.preventDefault();
    var cart = getLocalStorageCart();
    if (cart && null != cart && "undefined" != cart && cart.length > 0) {
      item.productQuantity = productQuantity.value;
      cartItems = JSON.parse(cart);
      cartItems[itemIndex] = item;
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    updateSubTotal()
  });
}

const deleteButtons = document.getElementsByClassName("deleteItem");
  for (let button of deleteButtons) {
    button.addEventListener("click", function (event) {
      let buttonClicked = event.target;
      let itemToDelete = buttonClicked.closest("section > article");
      itemToDelete.remove();

      const cart = getCart();

      let itemToDeleteId = itemToDelete.getAttribute("data-id");
      let itemToDeleteColor = itemToDelete.getAttribute("data-color");

      const productIndexToDelete = cart.findIndex(
        (product) =>
          product.id === itemToDeleteId && product.color === itemToDeleteColor
      );

      cart.splice(productIndexToDelete, 1);

     
    });
  }

  //------------------------

// function deleteProduct(item,index){
// const deleteButtons = document.getElementsByClassName("deleteItem");
// for (let button of deleteButtons) {
//   button.addEventListener("click", function (event) {
//     let buttonClicked = event.target;
//     let itemToDelete = buttonClicked.closest("section > article");
//     var cart = getLocalStorageCart();
//     //if (cart && null != cart && "undefined" != cart && cart.length > 0) { 

//       cartItems = JSON.parse(cart);
//       cartItems.forEach(function (cartItem){
//       cartItems[index] = item;
//     let itemToDeleteId = itemToDelete.getAttribute("data-id");
//     let itemToDeleteColor = itemToDelete.getAttribute("data-color");
//     cartItem.productId=== itemToDeleteId && cartItem.productColor === itemToDeleteColor;
//     itemToDelete.remove();
//     alert("votre produit a été bien supprimé.")
   
    
//    let productQuantity= document.querySelector('.itemQuantity')
    
//     //cartItem.splice(cartItems, 1);
//     productQuantity.value=null;
//     //cartItem.totalPrice[index].remove(); 
    

//      localStorage.setItem('cart', JSON.stringify(cart));
       
      
// });
// updateSubTotal();
// //alert("Ce produit a bien été supprimé du panier");
//   });}}
  



      

  //  function deletedProduct(productQuantityDelete) {
  //     productDelete = document.querySelector('.deleteItem')
  //     //let productQuantity= document.querySelector('.itemQuantity');
  //      productDelete.addEventListener("click" , (event) => {
  //      event.preventDefault();
  //     var cart = getLocalStorageCart();
  //     if (cart && null != cart && "undefined" != cart && cart.length > 0) {
  //       localStorage. removeItem('itemQuantity');
  //       productDelete ==0;
        
        
  //     }});
  //     alert ("votre produit a été suprimé");
  //   }

// let deleteButton = [...document.getElementsByClassName("deleteItem")];
// deleteButton.forEach((cartItems, index) => {
//     cartItems.addEventListener('click', () => {

//         // supprimer dans le DOM
//         let deletedProduct = deleteButton[index].closest('.cart__item');
//         deletedProduct.remove();

//         // supprimer dans le local storage
//         storage.splice(index, 1);
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//         location.reload();
//     })
// })
// function deleteProduct(cartItem, index, productQuantityDelete){
// let deleteButton = document.getElementsByClassName("deleteItem");
// productQuantityDelete.forEach(function(cart) {
//   cartItem.addEventListener('click', () => {

//         // supprimer dans le DOM
//         let deletedProduct = deleteButton[index].closest('.cart__item');
//         deletedProduct.remove();

//         // supprimer dans le local storage
//         storage.splice(index, 1);
//         localStorage.setItem('CART', JSON.stringify(storage));
//         location.reload();
//     })
// })
// }
// //Suppression d'un produit
// function deleteProduct(item,itemIndex,productsQuantityDelete) {
//     let buttonDelete = document.querySelectorAll(".deleteItem");
//     productsQuantityDelete.addEventListener("click" , (event) => {
//       event.preventDefault();
//       var cart = getLocalStorageCart();
//       if (cart && null != cart && "undefined" != cart && cart.length > 0 && item.productQuantity === productQuantity.value) {
//         buttonDelete.textContent = "Supprimer";
//         productQuantity.value =0;
//         items.productQuantity = 0;       
//         cartItems = JSON.parse(cart);
//         cartItems[itemIndex] = item;
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//       }
//       updateSubTotal()
        
//   });
    
//     }


// //push form
// function postForm() {
//   let orderId = document.querySelector('#order');
//   orderId.addEventListener('click', (event) => {
//    event.preventDefault();

// //create form in object
//  let contact = {
//  firstName: document.querySelector('#firstName').value,
//  lastName: document.querySelector('#lastName').value,
//  address: document.querySelector('#address').value,
//  city: document.querySelector('#city').value,
//  email: document.querySelector('#email').value,
//     }
// //RegEx
// let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
// let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
// let adressRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');
// //valid informations input
//     //FirstName
//     function firstNameControl() {
//       let firstNameValid = contact.firstName;
//       if (nameRegex.test(firstNameValid)) {
//         let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
//         firstNameErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         firstNameErrorMsg.textcontent = "Veuillez renseigner votre prénom.";
//       }
//     }

//      //LastName
//     function lastNameControl() {
//       const lastNameValid = contact.lastName;
//       if (nameRegex.test(lastNameValid)) {
//         let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
//         lastNameErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         lastNameErrorMsg.textContent = "Veuillez renseigner votre nom.";
//       }
//     }

//  //Adress
//     function addressControl() {
//       const validAdress = contact.address;
//       if (adressRegex.test(validAdress)) {
//         let addressErrorMsg = document.getElementById('addressErrorMsg');
//         addressErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         addressErrorMsg.textContent = "Veuillez renseigner votre adresse de livraison.";
//       }
//     }

//     // City
//     function cityControl() {
//       const cityValid = contact.city;
//       if (nameRegex.test(cityValid)) {
//         let cityErrorMsg = document.getElementById('cityErrorMsg');
//         cityErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         cityErrorMsg.textContent = "Veuillez renseigner votre ville.";
//       }
//     }
//     //Email
//     function emailControl() {
//       const emailValid = contact.email;
//       if (emailRegex.test(emailValid)) {
//         let emailErrorMsg = document.getElementById('emailErrorMsg');
//         emailErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         emailErrorMsg.textContent = "Erreur ! Email non valide";
//       }
//     }

//     // localStorage
//     function validControl() {
//       if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
//         return true;
//       } else {
//         alert('veuillez vérifier les données du formulaire')
//       }
//     }
// //Construction d'un array depuis le local storage
// let cartItems = [];
// //var cart = getLocalStorageCart();
// for (let i = 0; i<cartItems.length;i++) {
//   localStorage.setItem('cart', JSON.stringify(cartItems));    
// } 
// console.log(cartItems);
// //console.log(productId);
// //console.log(productId);
//     //ajouter dans un objet
//     const order = {
//       contact,
//       cartItems,
//     }

//     const options = {
//       method: 'POST',
//       body: JSON.stringify(order),
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json',
//       },
//     };
    

//     fetch("http://localhost:3000/api/products/order",options) 
//       .then(response => response.json())
//       .then(productId => {
//         console.log(productId);
//         //localStorage.clear();
//         localStorage.setItem("orderId", productId.orderId);

//         if (validControl()) {
//           document.location.href = 'confirmation.html';
//         }
//       })
//   })
// }
// postForm();
      
