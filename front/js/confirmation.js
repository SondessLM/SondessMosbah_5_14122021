
// recuperation du lien et de l'orderId
let orderId = new URLSearchParams(window.location.search).get('orderId');


//insertion de l'orderId dans l'HTML
let orderNumber = document.getElementById('orderId');
console.log(orderNumber);

