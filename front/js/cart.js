//Initialisation du local storage
let localStorageProduct = JSON.parse(localStorage.getItem("product"));
console.table(localStorageProduct);
//const emptyCart = document.querySelector("#cart__items");

// Si le panier est vide
async function getCart(){
if (localStorageProduct === null || localStorageProduct == 0) {
    //const emptyCart = `<p>Votre panier est vide</p>`;
    let emptyCart = document.querySelector("h1");
    var error_message = document.createElement("header");
        error_message.textContent = "Votre panier est vide";
        emptyCart.appendChild(error_message);

        //alert("Aucun produit n'est disponble pour le moment.");
    alert("votre panier est vide");
          console.log("Erreur");
    emptyCart.innerHTML = "votre panier est vide";
} else {
for (let product  in localStorageProduct){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', localStorageProduct[product].productId);

    // Insertion de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion de l'image
    let productPicture = document.createElement("img");
    productDivImg.appendChild(productPicture);
    productPicture.src = localStorageProduct[product].productIdPicture;
    productPicture.alt = localStorageProduct[product].productIdPictureAlt;
    
    // Insertion de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Insertion du titre h3
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = localStorageProduct[product].nameOfProduct;

    // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = localStorageProduct[product].colorProduct;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = localStorageProduct[product].priceOfProduct + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.classList = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.classList = "cart__item__content__settings__quantity";
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = localStorageProduct[product].quantityProduct;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
}
}}
getCart();

function getTotals(){

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * localStorageProduct[i].priceOfProduct);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = localStorageProduct[k].quantityProduct;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const localStorageCart = localStorageProduct.find((el) => el.qttModifValue !== quantityModif);

            localStorageCart.quantityProduct = qttModifValue;
            localStorageProduct[k].quantityProduct = localStorageCart.quantityProduct;

            localStorage.setItem("product", JSON.stringify(localStorageProduct));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
    let buttonDelete = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < buttonDelete.length; j++){
        buttonDelete[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = localStorageProduct[j].productId;
            let colorDelete = localStorageProduct[j].colorProduct;

            localStorageProduct = localStorageProduct.filter( el => el.productId !== idDelete || el.colorProduct !== colorDelete );
            
            localStorage.setItem("product", JSON.stringify(localStorageProduct));

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
        'Content-Type': 'application/json',
      }
    }

    fetch("http://localhost:3000/api/products/order", options) 
      .then(response => response.json())
      .then(product => {
        if (validControl()) {
          document.location.href = 'confirmation.html' + product.orderId;
        }
      })
  })
}
postForm();
