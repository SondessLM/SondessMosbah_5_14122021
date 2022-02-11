var productId = new URL(window.location.href).searchParams.get("id");

displayProduct(productId);

/**
 * Display  product on the product.html page.
 * 
 * @param int productId The prouct id.
 */
async function displayProduct(productId) {

    let product = await getProduct(productId);

    if (product) {
        // get picture
        let productPicture = document.createElement("img");
        document.querySelector(".item__img").appendChild(productPicture);
        productPicture.src = product.imageUrl;
        productPicture.alt = product.altTxt;

        // get title
        let productName = document.getElementById('title');
        productName.innerHTML = product.name;

        // get price
        let productPrice = document.getElementById('price');
        productPrice.innerHTML = product.price;

        // get description
        let productDescription = document.getElementById('description');
        productDescription.innerHTML = product.description;

        // get colors
        for (let colors of product.colors) {
            //console.table(colors);
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        }
        addToCart(productId);
    } else {
        //Creation de l'élément / balise  erreur.
        var errorMessage = document.createElement("h4");
        errorMessage.textContent = "Ce produit n'est pas disponble pour le moment.";
        var item_selector = document.querySelector(".item");
        item_selector.textContent = "";
        item_selector.appendChild(errorMessage);
        alert("Ce produit n'est pas disponble pour le moment.");
    }

}

/**
 * Add product to cart.
 * 
 * @param int productId The prouct id.
 */
function addToCart(productId) {
    var button = document.getElementById("addToCart");
    button.innerHTML = "Ajouter au panier";
    button.addEventListener("click", function () {
        const quantitySelector = document.getElementById('quantity');
        const colorSelector = document.getElementById('colors');
        const priceSelector = document.getElementById('price');
        const quantity = quantitySelector.value;
        const color = colorSelector.value;
        const price = priceSelector.innerHTML;
        console.log(price);
        if ("" == color || "undefined" == color) {
            alert("Veuillez sélectionner une couleur valide.");
        } else if (quantity <= 0 || quantity > 100 || "undefined" == quantity) {
            alert("Veuillez sélectionner une quantité valide. La quantité doit etre comprise entre 1 et 100.");
        } else {
            var localStorageCart = createlocalStorageCart();
            localStorageCart = JSON.parse(localStorageCart);
            var productExistInLocalStorageCart = checkProductExistInLocalStorageCart(productId, color);

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
                    productPrice: parseInt(price),
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
    });
}