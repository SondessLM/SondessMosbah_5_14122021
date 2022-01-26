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

    });
  } else {
    console.log("Le panier est vide");
  }
}

displayProductCart();


// function getCart() {
// } if (localStorageCart === null || localStorageCart == 0) {
//   alert("Votre panier est vide.");
//   emptyCart.innerHTML = `<h3>Votre panier est vide.</h3>`;


// } else {
//   //
//   for (i = 0; i < localStorageCart.length; i++) {
//     products.push(localStorageCart[i].id);

//     itemCards = itemCards + `
//         <article class="cart__item" data-id="${localStorageCart[i]._id}" data-color="${localStorageCart[i].colorsProduct}">
//                 <div class="cart__item__img">
//                   <img src="${localStorageCart[i].productImg}" alt="${localStorageCart[i].productAlt}">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>${localStorageCart[i].productName}</h2>
//                     <p>${localStorageCart[i].colorsProduct}</p>
//                     <p>${localStorageCart[i].productPrice} €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageCart[i].productQuantity}">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//         `;
//   } //si i=  ProductExistInLocalStorageCart
//   if (i === localStorageCart.length) {
//     itemCart.innerHTML += itemCards;
//   }
// }

// //totals quantities
// function getTotals() {

//   //get quantity
//   let productQuantity = document.getElementsByClassName('itemQuantity');
//   let productQuantityLength = productQuantity.length,
//     totalQuantity = 0;

//   //i=0 and i<total quantity
//   for (var i = 0; i < productQuantityLength; ++i) {
//     totalQuantity += productQuantity[i].valueAsNumber;
//   }

//   let productTotalQuantity = document.querySelector('#totalQuantity');
//   productTotalQuantity.innerHTML = totalQuantity;

//   //récupérer le prix total
//   let totalPrice = 0;

//   for (var i = 0; i < productQuantityLength; ++i) {
//     totalPrice += (productQuantity[i].valueAsNumber * localStorageCart[i].productPrice);
//   }

//   let productTotalPrice = document.querySelector('#totalPrice');
//   productTotalPrice.innerHTML = totalPrice;
// }
// getTotals();

// //modify quantity
// function modifyQuantity() {
//   let quantityModify = document.querySelectorAll('.itemQuantity');
//   // si k est inferieur a la quantité modifier
//   for (let k = 0; k < quantityModify.length; k++) {
//     quantityModify[k].addEventListener('change', (event) => {
//       event.preventDefault();

//       // let modifyQuantity = ProductExistInLocalStorageCart[k].productQuantity;
//       let quantityModifValue = quantityModify[k].valueAsNumber;
//       localStorageCart[k].productQuantity = quantityModifValue;
//       localStorage.setItem('product', JSON.stringify(localStorageCart));
//       getTotals();
//     })
//   }
// }
// modifyQuantity();

// //console.table(productInLocalStorageCart);
// // delete product
// function deleteProduct() {
//   let deleteButton = document.querySelectorAll('.deleteItem');

//   for (let l = 0; l < deleteButton.length; l++) {

//     deleteButton[l].addEventListener('click', (event) => {
//       if (confirm('Voulez-vous supprimer ce produit ?')) {
//         event.preventDefault();

//         let deleteId = localStorageCart[l].id;
//         let deleteColor = localStorageCart[l].colorsProduct;
//         let productInfo = deleteId + deleteColor;

//         // filter product specifiction
//         localStorageCart = localStorageCart.filter(el => el.id.concat('', el.colorsProduct) !== productInfo);

//         //push localStorage
//         localStorage.setItem('cart', JSON.stringify(localStorageCart));

//         //alerte delete product
//         alert('Ce produit a bien été supprimé ')
//         window.location.href = 'cart.html';

//       } else {
//         alert('Vous avez annuler la suppression du produit');
//       }
//     })
//   }



// }
// deleteProduct();

// //push form
// function postForm() {
//   let order = document.querySelector('#order');
//   order.addEventListener('click', (event) => {
//     event.preventDefault();

//     //create form in object
//     let contact = {
//       firstName: document.querySelector('#firstName').value,
//       lastName: document.querySelector('#lastName').value,
//       address: document.querySelector('#address').value,
//       city: document.querySelector('#city').value,
//       email: document.querySelector('#email').value,
//     }

//     //valid informations input
//     //FirstName
//     function firstNameControl() {
//       let firstNameValid = contact.firstName;
//       if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(firstNameValid)) {
//         let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
//         firstNameErrorMsg.style.display = 'none';
//         return true;
//       } else {
//         firstNameErrorMsg.innerHTML = "Veuillez renseigner votre prénom.";
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
//         lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom.";
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
//         addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse de livraison.";
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
//         cityErrorMsg.innerHTML = "Veuillez renseigner votre ville.";
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
//         emailErrorMsg.innerHTML = "Erreur ! Email non valide";
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

//     //ajouter dans un objet
//     let sendFormData = {
//       contact,
//       products,
//     }

//     let options = {
//       method: 'POST',
//       body: JSON.stringify(sendFormData),
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     }

//     fetch("http://localhost:3000/api/products/order", options)
//       .then(response => response.json())
//       .then(data => {
//         if (validControl()) {
//           document.location.href = 'confirmation.html' + data.orderId;
//         }
//       })
//   })
// }
// postForm();