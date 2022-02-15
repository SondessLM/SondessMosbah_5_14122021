function getOrderId() {
    return new URL(location.href).searchParams.get("order_Id");
  }
  
  const orderId = getOrderId();
  document.getElementById("orderId").textContent = `${orderId}`;
