function getItemsCart() {
  let items = [];
  let savedCartItems = localStorage.getItem("cartItems");

  if (savedCartItems && savedCartItems !== "undefined") {
    try {
      items = JSON.parse(savedCartItems);
    } catch (error) {
      console.error("Error al analizar JSON:", error);
    }
  }

  return items;
}

function setItemsCart(itemsCart) {
  localStorage.setItem("cartItems", JSON.stringify(itemsCart));
}

async function bringProducts() {
  const response = await fetch("../src/products.json");
  const data = await response.json();
  return data;
}
