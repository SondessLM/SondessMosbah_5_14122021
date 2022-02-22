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
function createLocalStorageCart() {
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
 * @param string color The product color.
 * @returns bool productExistInLocalStorageCart The product exist in the local storage cart.
 */
function checkProductExistInLocalStorageCart(productId, color) {
    var cart = getLocalStorageCart();
    var productExistInLocalStorageCart = false;
    if (cart && null != cart && "undefined" != cart) {
        cart = JSON.parse(cart);
        cart.forEach(function (cartItem) {
            if (cartItem.productId == productId && color == cartItem.productColor) {
                productExistInLocalStorageCart = true;
            };
        });
    }
    return productExistInLocalStorageCart;

}