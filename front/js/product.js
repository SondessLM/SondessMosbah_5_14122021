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
 * 
 * @param int productId The prouct id.
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
       <p>Prix : <span id="price">${product.price}</span>€</p>
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

    addToCart(product);

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
      //let productInLocalStorageCart = JSON.parse(localStorage.getItem('product'));
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

/**
 * Check if the local storage cart exist.
 * 
 * @returns bool localStorageCartExist The local storage cart exist.
 */
function checkLocalStorageCartExist() {
  var localStorageCartExist = false;
  if ("undefined" !== typeof (Storage)) {
    var cart = localStorage.getItem('cart');
    if (null == cart || "undefined" == cart) {
      localStorageCartExist = false;
    } else {
      localStorageCartExist = true;
    }
  }
  return localStorageCartExist;
}

/**
 * Create create local storage cart if not exist.
 * 
 * @returns Object localStorageCart The local storage cart.
 */
function createlocalStorageCart() {
  var islocalStorageCart = checkLocalStorageCartExist();
  if (!islocalStorageCart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  return getLocalStorageCart();
}

/**
 * Get local storage cart.
 * 
 * @returns Object localStorageCart The local storage cart.
 */
function getLocalStorageCart() {
  var localStorageCart = [];
  var islocalStorageCart = checkLocalStorageCartExist();
  if (islocalStorageCart) {
    localStorageCart = localStorage.getItem('cart');
  }
  return localStorageCart;
}

/**
 * Check if produc exist in the local storage cart.
 * 
 * @param int productId The product id.
 * @returns bool productExistInLocalStorageCart The product exist in the local storage cart.
 */
function checkProductExistInLocalStorageCart(productId) {
  var cart = getLocalStorageCart();
  var productExistInLocalStorageCart = false;
  if (cart && null != cart && "undefined" != cart) {
    cart = JSON.parse(cart);
    cart.forEach(function (cartItem) {
      if (cartItem.productId == productId) {
        productExistInLocalStorageCart = true;
      };
    });
  }
  return productExistInLocalStorageCart;

}
