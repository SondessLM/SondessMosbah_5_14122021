
let productCart = JSON.parse(localStorage.getItem("product"));
const emptyCart = document.querySelector("section");

// 
function getCart() {
} if (productCart === null || produitLocalStorage == 0) {
    alert("Votre panier est vide.");
    emptyCart.innerHTML = `<h3>Votre panier est vide.</h3>`;


} else {
  //
  for (i = 0; i < ProductExistInLocalStorageCart.length; i++) {
    products.push(ProductExistInLocalStorageCart[i].id);

    itemCards = itemCards + `
        <article class="cart__item" data-id="${ProductExistInLocalStorageCart[i].id}" data-color="${ProductExistInLocalStorageCart[i].colorsProduct}">
                <div class="cart__item__img">
                  <img src="${ProductExistInLocalStorageCart[i].productImg}" alt="${ProductExistInLocalStorageCart[i].productAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${ProductExistInLocalStorageCart[i].productName}</h2>
                    <p>${ProductExistInLocalStorageCart[i].colorsProduct}</p>
                    <p>${ProductExistInLocalStorageCart[i].productPrice} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storedProduct[i].productQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;
  } //si i=  ProductExistInLocalStorageCart
  if (i === ProductExistInLocalStorageCart.length) {
    itemCart.innerHTML += itemCards;
  }
}

//totals quantities
function getTotals() {

  //get quantity
  let productQty = document.getElementsByClassName('itemQuantity');
  let qtyLength = productQty.length,
    totalQty = 0;

    //i=0 and i<total quantity
  for (var i = 0; i < qtyLength; ++i) {
    totalQty += productQty[i].valueAsNumber;
  }

  let productTotalQty = document.querySelector('#totalQuantity');
  productTotalQty.innerHTML = totalQty;

  //récupérer le prix total
  let totalPrice = 0;

  for (var i = 0; i < qtyLength; ++i) {
    totalPrice += (productQty[i].valueAsNumber * ProductExistInLocalStorageCart[i].productPrice);
  }

  let productTotalPrice = document.querySelector('#totalPrice');
  productTotalPrice.innerHTML = totalPrice;
}
getTotals();

//modify quantity
function modifyQty() {
  let modifQty = document.querySelectorAll('.itemQuantity');
// si k est inferieur a la quantité modifier
  for (let k = 0; k < modifQty.length; k++) {
    modifQty[k].addEventListener('change', (event) => {
      event.preventDefault();

      // let modifyQuantity = ProductExistInLocalStorageCart[k].productQuantity;
      let quantityModifValue = modifQty[k].valueAsNumber;
      ProductExistInLocalStorageCart[k].productQuantity = quantityModifValue;
      localStorage.setItem('product', JSON.stringify(ProductExistInLocalStorageCart));
      getTotals();
    })
  }
}
modifyQty();

console.log(ProductExistInLocalStorageCart);
// delete product
function deleteProduct() {
  let btnSupprimer = document.querySelectorAll('.deleteItem');

  for (let l = 0; l < btnSupprimer.length; l++) {

    btnSupprimer[l].addEventListener('click', (event) => {
      //  alert('Voulez-vous supprimer ce produit ?')
      if (confirm('Voulez-vous supprimer ce produit ?')) {
        event.preventDefault();

        let idSelectionnerSuppression = ProductExistInLocalStorageCart[l].id;
        let colorSelectionnerSuppression = ProductExistInLocalStorageCart[l].colorsProduct;
        let productInfo = idSelectionnerSuppression + colorSelectionnerSuppression;

        // filter product specifiction
        ProductExistInLocalStorageCart = ProductExistInLocalStorageCart.filter(el => el.id.concat('', el.colorsProduct) !== productInfo);

        //push localStorage
        localStorage.setItem('product', JSON.stringify(ProductExistInLocalStorageCart));

        //alerte delete product
        alert('Ce produit a bien été supprimé du panier');
        window.location.href = 'cart.html';

      } else {
        alert('Vous avez annuler la suppression du produit');
      }
    })
  }



}
deleteProduct();
//---------------------------------------------------------------------
//push form
function postForm() {
  let order = document.querySelector('#order');
  order.addEventListener('click', (event) => {
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
        firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champs";
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
        lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champs";
      }
    }

    //Adress
    function addressControl() {
      const addressValid = contact.address;
      if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(adreessValid)) {
        let addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.style.display = 'none';
        return true;
      } else {
        addressErrorMsg.innerHTML = "Veuillez renseigner ce champs";
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
        cityErrorMsg.innerHTML = "Veuillez renseigner ce champs";
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
        alert('Merci de revérifier les données du formulaire')
      }
    }

    //ajouter dans un objet
    let sendFormData = {
      contact,
      products,
    }

    let options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        if (validControl()) {
          document.location.href = 'confirmation.html?id=' + data.orderId;
        }
      })
  })
}
postForm();