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
    button.addEventListener("click", function() {
        alert("votre produit est ajouter!");
                                
});
/*window.location.href ="cart.html"*/

  } else if (false == product) {
    alert("Le produit que vous chercher est indisponble pour le moment.");
    item_selector.innerHTML = `<h2>Le produit que vous chercher est indisponble pour le moment.</h2>`;
  }
}





async function main() {
  var productId = new URL(window.location.href).searchParams.get("id");
  displayProduct(productId);
  /*addToCard(productId);*/
}

main();

/*async function addToCard() {
  let product = await addToCard;
  let btn = document.querySelector("#addToCart").addEventListener("click",  function () {
  let productQuantity = document.querySelector('#quantity');
  window.location.href ="cart.html"
  quantity = Number;
  productQuantity = quantity;
  productQuantity.innerHTML += `< input="${Number}">${Number}>`; 
  let productColor = document.querySelector('#colors');
  }
  )};*/

let product = ""
let productChoose = {
  productId: product._id,
  productColor: product.colors,
  productQuantity: Number(quantity),
  produitName: product.name,
};

//localStorage//

{
  let productCart = JSON.parse(localStorage.getItem("product"));
  /*console.table (productCart);*/
}


//quantity selected form 0 to 100
if (
  productChoose.productQuantity > 0 && productChoose.productQuantity <= 100
)
  // product in the cart
  if (productCart != null) {
    let productAdd = {};
    const searchs = productCart.find(() => {
      productAdd
      return (
        productAdd.productId === productChoose.productId &&
        productAdd.productColor === productChoose.productColor
      );
    });

    //add this product again
    if (searchs) {
      let TotalQuantity =
        productChoose.productQuantity + searchs.productQuantity;
      searchs.productQuantity = TotalQuantity;
      console.table(productCart);
      localStorage.setItem("product", JSON.stringify(productCart));
      alert("Votre produit a été ajouté au panier");
    }

    //add new product
    else {
      productCart.push(productChoose);
      localStorage.setItem("product", JSON.stringify(productCart));
      console.table(productCart);
      alert("Votre produit a été ajouté au panier");

    }
  }
  else {
    alert("Veuillez préciser la quantité du produit entre 1 et 100");

  };