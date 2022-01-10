var productId = new URL(window.location.href).searchParams.get("id");
/**
 * Get the product.
 * 
 * @param int productId The prouct id.
 * @returns array | Bool product The product.
 */
async function getProduct(productId) {
  let product = {};
    await fetch('http://localhost:3000/api/products/' + productId)
    .then(function (response) {
      if (response.ok) {
        product = response.json();
      } else {
        product = false;
      }
    })
    .catch((erreur) => {
      console.log('erreur :' + erreur);
      product = false;
    });
  return product;
}

/**
 * Display  product on the product.html page.
 */
async function displayProduct(productId) {
  let product = await getProduct(productId);
  let item_selector = document.querySelector('.item');
  if (product) {
    item_selector.innerHTML = `<article> 
       <div class= "item__img" ${product._id}">
       <img src="${product.imageUrl}" alt="${product.altTxt}</div>
       <div class="item__content">
       <div class="item__content__titlePrice">
       <h1 class="productName">${product.name}</h1>
       <p>${product.price} <span id="price"></span>€</p>
       </div>
       <div class="item__content__description">
       <p class="item__content__description__title">Description :</p>
       <p id="description">${product.description}</p>
       </div>
       <div class="item__content__settings">
       <div class="item__content__settings__color">
       <label for="color-select">Choisir une couleur :</label>
       <select name="color-select" id="colors"></select>
       </div>
       <div class="item__content__settings__quantity">
       <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
       <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
       </div>
       </div>
       <div class="item__content__addButton">
       <button id="addToCart">Ajouter au panier</button>
       </div>
        </div>   
       </article>`;

    let productColor = document.querySelector('#colors');
    let colors = product.colors;
    colors.forEach(function (color) {
      productColor.innerHTML += `<option value="${color}">${color}</option>`;
    });

    // activat Btn to push product// 
    var button = document.getElementById("addToCart");
    button.innerHTML = "ajouter au panier";
    button.addEventListener("click", function () {
      const quantity = document.getElementById('quantity');
      quantityProduct = quantity.value;
      if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0)
       { window.confirm(`Votre produit a eté ajouté au panier`);
       }else 
      { window.confirm(`Veuillez selectionner la quantité, cliquez sur OK`);}
       
      
    });

  } else if (false == product) {
    alert("Le produit que vous chercher est indisponble pour le moment.");
    item_selector.innerHTML = `<h2>Le produit que vous chercher est indisponble pour le moment.</h2>`;
  }
}

 
  displayProduct(productId);
  

  productId = new URL(window.location.href).searchParams.get("id");
productChoose = {
  product: productId,
  productQuantity:quantity.value,
  productColors:colors.value,
  productName:productId,
  ProductPrice:productId,  
 };

//local Storage//
  productLocalStorage =  JSON.parse(localStorage.getItem('productId'));
  const addProductLocalStorage = productLocalStorage.push(productChoose);
  JSON.stringify(productLocalStorage);
  

  const confirm = false;
  
  if (productLocalStorage) {
     productLocalStorage.forEach (function (productId, number) {
    if (productId == productId && productColors == colors.value) {
      productLocalStorage[number].quantity = parseInt(productId.quantity) + parseInt(quantity.value);
      JSON.stringify(productLocalStorage);
      confirm = true;
      
    }
  });

  //
    if (comfirm =true) {
    addProductLocalStorage();
    
    }
  }

  else {
    productLocalStorage = [];
    addProductLocalStorage();
    
  }
