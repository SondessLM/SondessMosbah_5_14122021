/**
 * Get the product.
 * 
 * @param int productId The prouct id.
 * @returns array | Bool product The product.
 */
var productId = new URL(window.location.href).searchParams.get("id");
console.log(productId);
let product = "";

const colorChoice = document. querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

getProduct();

// Récupération des produits de l'API
function getProduct() {
    fetch('http://localhost:3000/api/products/' + productId)
    .then((response) => {
        return response.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (displayProduct) {
        product = await displayProduct;
        console.table(product);
        if (product){
            getProductId(product);
        }
    })

   .catch((error) => {

    let item_selector = document.querySelector('.item');
    var errorMessage = document.createElement("h2");
        errorMessage.textContent = "Le produit que vous chercher est indisponble pour le moment.";
        item_selector.appendChild(errorMessage);

        //alert("Aucun produit n'est disponble pour le moment.");
    alert("Le produit que vous chercher est indisponble pour le moment.");
    item_selector.innerHTML = `<h2>Le produit que vous chercher est indisponble pour le moment.</h2>`;
      console.log("Erreur");

   })
}
    
function getProductId(product){
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
    for (let colors of product.colors){
        //console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(product);
    


/**
 * Add product to cart.
 * 
 * @param int productId The prouct id.
 */
function addToCart(product) {
    const button = document.querySelector("#addToCart");

    //button addToCart if !color=== nulle and quantity [1 to 100]
    button.addEventListener("click", (event)=>{
        if ("" == colorChoice.value || "undefined" == colorChoice.value) {
            alert("Veuillez sélectionner une couleur valide.");
          } else if (quantityChoice.value <= 0 || quantityChoice.value > 100 || "undefined" == quantityChoice.value) {
            alert("Veuillez sélectionner une quantité valide. La quantité doit etre comprise entre 1 et 100.");
          } 
        else {

    //get color choice
    let productColorChoice = colorChoice.value;
                
    //get quantity
    let productQuantityChoice = quantityChoice.value;

    //put productChoice to cart
    let productChoice = {
        productId: productId,
        productIdPicture: product.imageUrl,
        productIdPictureAlt: product.altTxt,
        colorProduct: productColorChoice ,
        quantityProduct: Number(productQuantityChoice),
        nameOfProduct: product.name,
        priceOfProduct: product.price,
        
        
         };

    /**
    * Create create local storage cart .
     * 
     * @returns Object localStorageProduct The local storage cart.
     */
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));
    //localStorageProduct.push(productChoice);

    //fenêtre pop-up
    const addToCard =() =>{
        if(window.confirm(`Votre commande de ${productQuantityChoice} ${product.name} ${productColorChoice } est ajoutée au panier
           Souhaiter vous accéder à votre panier? Cliquez sur OK`)){
            window.location.href ="cart.html";
            
        }
        
    }
    
    /**
 * Get local storage cart.
 * 
 * @returns Object localStorageCart The local storage cart.
 */
    //1 product in the Cart
    if (localStorageProduct) {
    const localStorageCart = localStorageProduct.find(
        (el) => el.productId === productId && el.colorProduct === productColorChoice);
        //  product existe in the cart
        if (localStorageCart) {
            let newQuantity =
            parseInt(productChoice.quantityProduct) + parseInt(localStorageCart.quantityProduct);
            localStorageCart.quantityProduct = newQuantity;
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
            localStorageProduct.push(productChoice);
            console.table(localStorageProduct);
            alert("La quantité de votre produit dans le panier a bien été mise a jour.");
            addToCard();
            
        }   
    //Cart empty 
    } else {
        localStorageProduct =[];
        localStorageProduct.push(productChoice);
        localStorage.setItem("product", JSON.stringify(localStorageProduct));
        console.table(localStorageProduct);
        addToCard();
    }}
    });
    
}}