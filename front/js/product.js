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
    var error_message = document.createElement("h2");
        error_message.textContent = "Le produit que vous chercher est indisponble pour le moment.";
        item_selector.appendChild(error_message);

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

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = product.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = product.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = product.description;

    // Insertion des options de couleurs
    for (let colors of product.colors){
        //console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(product);
    


//Gestion du panier
function addToCart(product) {
    const button = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    button.addEventListener("click", (event)=>{
        if ("" == colorChoice.value || "undefined" == colorChoice.value) {
            alert("Veuillez sélectionner une couleur valide.");
          } else if (quantityChoice.value <= 0 || quantityChoice.value > 100 || "undefined" == quantityChoice.value) {
            alert("Veuillez sélectionner une quantité valide. La quantité doit etre comprise entre 1 et 100.");
          } 
        else {

    //Recupération du choix de la couleur
    let productColorChoice = colorChoice.value;
                
    //Recupération du choix de la quantité
    let productQuantityChoice = quantityChoice.value;

    //Récupération des options du produit à ajouter au panier
    let productChoice = {
        productId: productId,
        productIdPicture: product.imageUrl,
        productIdPictureAlt: product.altTxt,
        colorProduct: productColorChoice ,
        quantityProduct: Number(productQuantityChoice),
        nameOfProduct: product.name,
        priceOfProduct: product.price,
        
        
         };

    //Initialisation du local storage
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));
    localStorageProduct.push(productChoice);

    //fenêtre pop-up
    const addToCard =() =>{
        if(window.confirm(`Votre commande de ${productQuantityChoice} ${product.name} ${productColorChoice } est ajoutée au panier
Souhaiter vous accéder à votre panier? Cliquez sur OK`)){
            window.location.href ="cart.html";
            
        }
        
    }
    
    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 produit
    if (localStorageProduct) {
    const localStorageCart = localStorageProduct.find(
        (el) => el.productId === productId && el.colorProduct === productColorChoice);
        //Si le produit commandé est déjà dans le panier
        if (localStorageCart) {
            let newQuantity =
            parseInt(productChoice.quantityProduct) + parseInt(localStorageCart.quantityProduct);
            localStorageCart.quantityProduct = newQuantity;
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
            console.table(localStorageProduct);
            alert("La quantité de votre produit dans le panier a bien été mise a jour.");
            addToCard();
            
        }   
    //Si le panier est vide
    } else {
        localStorageProduct =[];
        //localStorageProduct.push(productChoice);
        localStorage.setItem("product", JSON.stringify(localStorageProduct));
        console.table(localStorageProduct);
        addToCard();
    }}
    });
    
}}