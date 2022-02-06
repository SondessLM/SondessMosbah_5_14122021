var cart = getLocalStorageCart();

displayProductInCart();

function displayProductInCart(){
  
  if (cart && null != cart && "undefined" != cart && cart.length > 0) {
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
    });
    var productQuantity= document.querySelectorAll('.itemQuantity');
    totalQuantity = 0; 
    console.log(productQuantity);
     for (var i = 0; i < productQuantity.length ; i++) {
          //productQuantity.value = cart[i].productQuantity;
          console.log(productQuantity[i].value);
          totalQuantity += productQuantity[i].val();
         // console.log(totalQuantity);
     }      
    let productTotalQuantity = document.querySelector('#totalQuantity');
    productTotalQuantity.textContent = totalQuantity; 
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
  
}

function getTotals(){ 
  totalQuantity = 0; 
  if (cart && null != cart && "undefined" != cart && cart.length > 0) {
    cart = JSON.parse(cart);
    cart.forEach(function (cartItem){
      totalQuantity += cartItem.productQuantity;
    });
  } 
  console.log(totalQuantity);
  //  // Récupération du total des quantités 
  //  // let productQuantity = document.getElementsByName('itemQuantity');
  //   var productQuantity= document.getElementsByClassName('itemQuantity');
     
  //    console.log(productQuantity.length);
  //     for (var i = 0; i < productQuantity.length ; i++) {
  //          //productQuantity.value = cart[i].productQuantity;
  //          console.log(productQuantity[i].value);
  //          totalQuantity += productQuantity[i].val();
  //         // console.log(totalQuantity);
  //     }      
  //    let productTotalQuantity = document.querySelector('#totalQuantity');
  //    productTotalQuantity.textContent = totalQuantity;
  //   // console.log(totalQuantity);
      
  //   // Récupération du prix total
  //    totalPrice = 0;
  //      for (var i = 0; i <productQuantity.length; ++i) {
  //       totalPrice += (totalQuantity * cart.price);
  //      }
  //   let productTotalPrice = document.getElementById('totalPrice');
  //   productTotalPrice.textContent = totalPrice;
  //   console.log(totalPrice);
 }
  getTotals();

// // Modification d'une quantité de produit
// function quantityModification() {
//     let ModifyQuantity = document.querySelectorAll(".itemQuantity");

//     for (let j = 0; j < ModifyQuantity.length; j++){
//         ModifyQuantity[j].addEventListener("change" , (event) => {
//             event.preventDefault();

//             //Selection de l'element à modifier en fonction de son id ET sa couleur
//             let quantityModif = cart[j].productQuantity;
//             let ModifyQuantityValue = ModifyQuantity[j].valueAsNumber;
            
//             const localStorageCart = cart.find((el) => el.ModifyQuantityValue !== quantityModif);

//             localStorageCart.productQuantity = ModifyQuantityValue;
//             cart[j].productQuantity = localStorageCart.productQuantity;

//             localStorage.setItem("cart", JSON.stringify(cart));
        
//             // refresh rapide
//             location.reload();
//         })
//     }
// }
// quantityModification();

// //Suppression d'un produit
// function deleteProduct() {
//     let deleteButton = document.querySelectorAll(".deleteItem");
//      for (let k = 0; k < deleteButton.value; k++){
//       deleteButton[k].addEventListener("click" , (event) => {
//             event.preventDefault();

//             //Selection de l'element à supprimer en fonction de son id ET sa couleur
//             let deleteId = cart[k].productId;
//             let deleteColor = cart[k].productColor;

//             cart = cart.filter( el => el.productId !== deleteId || el.productColor !== deleteColor );
            
//             localStorage.setItem("cart", JSON.stringify(cart));

//             //Alerte produit supprimé et refresh
//             alert("Ce produit a bien été supprimé du panier");
//             location.reload();
//         })
//     }
// }
// deleteProduct();

// //push form
// function postForm() {
//   let orderId = document.querySelector('#order');
//   orderId.addEventListener('click', (event) => {
//    event.preventDefault();

//   //create form in object
//  let contact = {
//  firstName: document.querySelector('#firstName').value,
//  lastName: document.querySelector('#lastName').value,
//  address: document.querySelector('#address').value,
//  city: document.querySelector('#city').value,
//  email: document.querySelector('#email').value,
//     }

// //valid informations input
//     //FirstName
//     function firstNameControl() {
//       let firstNameValid = contact.firstName;
//       if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(firstNameValid)) {
//         let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
//         firstNameErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         firstNameErrorMsg.textcontent = "Veuillez renseigner votre prénom.";
//       }
//     }

//     //LastName
//     function lastNameControl() {
//       const lastNameValid = contact.lastName;
//       if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(lastNameValid)) {
//         let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
//         lastNameErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         lastNameErrorMsg.textContent = "Veuillez renseigner votre nom.";
//       }
//     }

//     //Adress
//     function addressControl() {
//       const validAdress = contact.address;
//       if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(validAdress)) {
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
//       if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(cityValid)) {
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
//       if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValid)) {
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
// let productId = [];
// for (let i = 0; i<cart.length;i++) {
//     productId.push(cart[i].productId);
// }
// console.log(productId);
//     //ajouter dans un objet
//     const sendForm = {
//       contact,
//       product: productId,
//     }

//     const options = {
//       method: 'POST',
//       body: JSON.stringify(sendForm),
//       headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json',
//       },
//     };
    

//     fetch("http://localhost:3000/api/products/order", options) 
//       .then(response => response.json())
//       .then(product => {
//           const orderId = product.orderId;
//         if (validControl()) {
//           document.location.href = 'confirmation.html' + '?orderId=' + orderId;
//         }
//       })
//   })
// }
// postForm();
      
