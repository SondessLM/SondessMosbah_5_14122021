getProducts();

/**
 * Get products.
 * 
 */
async function getProducts() {
    await fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => {
            displayProducts(data);
        })
        .catch((erreur) => {
            console.log('erreur :' + erreur);
        });
}

/**
 * Display products on the index.html page.
 */
async function displayProducts(products) {
    let items_selector = document.querySelector('.items');
    if (!isEmpty(products)) {
        products.forEach(function (product) {
            items_selector.innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>
        </a>`;

        });
    } else {
        items_selector.innerHTML += `<p>Aucun produit n'est disponble pour le moment.</p>`;
    }

}


function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
