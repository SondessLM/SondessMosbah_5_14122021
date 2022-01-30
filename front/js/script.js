/**
 * Display products on the index.html page.
 */
async function displayProducts() {
    let products = await getProducts();
    let items_selector = document.querySelector('.items');
    if (products) {
        products.forEach(function (product) {

            //Creation de l'élément / balise lien du produit.
            var product_link = document.createElement("a");
            product_link.setAttribute("href", "product.html?id=" + product._id);

            //Creation de l'élément / balise article du produit.
            var product_article = document.createElement("article");

            //Creation de l'élément / balise image du produit.
            var product_image = document.createElement("img");
            product_image.setAttribute("src", product.imageUrl);
            product_image.setAttribute("alt", product.altTxt);

            //Creation de l'élément / balise nom du produit.
            var product_name = document.createElement("h3");
            product_name.textContent = product.name;

            //Creation de l'élément / balise description du produit.
            var product_description = document.createElement("p");
            product_description.textContent = product.description;

            product_article.appendChild(product_image);
            product_article.appendChild(product_name);
            product_article.appendChild(product_description);

            product_link.appendChild(product_article);

            items_selector.appendChild(product_link);

        });
    } else if (false == products) {
        //Creation de l'élément / balise  erreur.
        var error_message = document.createElement("h4");
        error_message.textContent = "Aucun produit n'est disponble pour le moment.";
        items_selector.appendChild(error_message);

        alert("Aucun produit n'est disponble pour le moment.");
    }

}

displayProducts();