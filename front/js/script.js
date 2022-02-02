/**
 * Display products on the index.html page.
 */
 async function displayProducts() {
    let products = await getProducts();
    let items_selector = document.querySelector('.items');
    if (products) {
        products.forEach(function (product) {

            //Creation de l'élément / balise lien du produit.
            var productLink = document.createElement("a");
            productLink.setAttribute("href", "product.html?id=" + product._id);

            //Creation de l'élément / balise article du produit.
            var productArticle = document.createElement("article");

            //Creation de l'élément / balise image du produit.
            var productImage = document.createElement("img");
            productImage.setAttribute("src", product.imageUrl);
            productImage.setAttribute("alt", product.altTxt);

            //Creation de l'élément / balise nom du produit.
            var productName = document.createElement("h3");
            productName.textContent = product.name;

            //Creation de l'élément / balise description du produit.
            var productDescription = document.createElement("p");
            productDescription.textContent = product.description;

            productArticle.appendChild(productImage);
            productArticle.appendChild(productName);
            productArticle.appendChild(productDescription);

            productLink.appendChild(productArticle);

            items_selector.appendChild(productLink);

        });
    } else if (false == products) {
        //Creation de l'élément / balise  erreur.
        var errorMessage = document.createElement("h4");
        errorMessage.textContent = "Aucun produit n'est disponble pour le moment.";
        items_selector.appendChild(errorMessage);

        alert("Aucun produit n'est disponble pour le moment.");
    }

}

displayProducts();