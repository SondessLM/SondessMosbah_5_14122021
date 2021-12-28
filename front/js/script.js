/**
 * Get products.
 * 
 * @returns array products The product list.
 */
async function getProducts() {
    let products={};
    let products_response= await fetch("http://localhost:3000/api/products");
    if (products_response.ok) 
    {
        products= await products_response.json();
        
    }
    else {
       
       alert('Les produits ne sont pas disponibles pour le moment');
      
    }
    return products;
    
}

/**
 * Display products on the index.html page.
 */
async function displayProducts(){
    let products= await getProducts();
    let items_selector = document.querySelector('.items');
    products.forEach(function (product) {
    items_selector.innerHTML +=`<a href="./product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>
        </a>`;
       
});

}


displayProducts();