

function getItemsCart() { 
    let items = null;
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
        items = JSON.parse(savedCartItems)
    }
   
    return items;
}
function setItemsCart(itemsCart) { 
    localStorage.setItem("cartItems", JSON.stringify(itemsCart))
}


const bringProducts = async () => {
    const response = await fetch("../src/products.json");
    const data = await response.json();
    products.push(...data);
    products.forEach(createProductCard);
    console.log(products);
  };