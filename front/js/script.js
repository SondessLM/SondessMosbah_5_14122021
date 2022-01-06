/**
 * Get products.
 * 
 * @returns array | Bool The products.
 */
async function getProducts() {
    let products = {};
    await fetch('http://localhost:3000/api/products')
        .then(function (response) {
            if (response.ok) {
                products = response.json();
            } else {
                products = false;
            }
        })
        .catch((erreur) => {
            console.log('erreur :' + erreur);
            products = false;
        });
    return products;
}

/**
 * Display products on the index.html page.
 */
async function displayProducts() {
    let products = await getProducts();
    let items_selector = document.querySelector('.items');
    if (products) {
        products.forEach(function (product) {
            items_selector.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
            </a>`;
        });
    } else if (false == products) {
        alert("Aucun produit n'est disponble pour le moment.");
        items_selector.innerHTML += `<h4>Aucun produit n'est disponble pour le moment.</h4>`;
    }

}

displayProducts();