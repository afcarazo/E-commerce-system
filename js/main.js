/*Variables declarations*/
class Product {
  constructor(id, price, nombre, img) {
    this.id = id;
    this.price = price;
    this.nombre = nombre;
    this.img = img;
  }
}
let currentProduct = "";

const products = [
  {
    id: 1,
    price: 508200,
    nombre: "Notebook Lenovo 14 Fhd Flex Ipsci7-1255u 16gb 512ssd W 11",
    img: "src/img/products/lenovo.jpg",
    type: "computer",
  },
  {
    id: 2,
    price: 375850,
    nombre: "Smart Tv Televisor LG 55 Led 55nano80 Uhd 4k Nano Cell",
    img: "src/img/products/televisor.png",
    type: "television",
  },
  {
    id: 3,
    price: 580000,
    nombre: "Sony PlayStation 5 825GB Standard color blanco y negro",
    img: "src/img/products/play.jpg",
    type: "console",
  },
];

const tarjetas = [...Array(12)].map((_, index) => ({
  id: index + 1,
  img: `src/img/tarjetas/tar${index + 1}.png`,
}));

const container = document.getElementById("card-t");
const containerModal = document.getElementById("modal-row");
let itemsCart = [];
const cart = document.getElementById("cart-i");
cart.addEventListener("click", seeProducts);
const numberCart = document.getElementById("cart-items");

window.addEventListener("load", () => {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    itemsCart = JSON.parse(savedCartItems);
    updateCart();
  }
});

const computers = document.getElementById("computers");
computers.addEventListener("click", () => {
  filterAndDisplayProducts("computer");
});
const consoles = document.getElementById("consoles");
consoles.addEventListener("click", () => {
  filterAndDisplayProducts("console");
});
const televisions = document.getElementById("televisions");
televisions.addEventListener("click", () => {
  filterAndDisplayProducts("television");
});
const allItems = document.getElementById("all-items");
allItems.addEventListener("click", () => {
  container.innerHTML = "";
  products.forEach(createProductCard);
});

/*Generates the cards for products and bank cards*/
products.forEach(createProductCard);
tarjetas.forEach(generateBankCard);

/*Filter by type of product*/ 
function filterAndDisplayProducts(productType) {
  container.innerHTML = "";
  const filteredProducts = products.filter(
    (product) => product.type === productType
  );
  filteredProducts.forEach(createProductCard);
}

/*Generates the card for a product*/
function createProductCard(item) {
  let card = document.createElement("div");
  card.className = `col-lg-4 col-md-12 mb-4`;
  card.innerHTML = ` 
  <div class="card" >
  <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    <img  src="${item.img}" class="img-fluid" />
       <a href="#!">
       <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
       </a>
  </div>
  <div class="card-body">
       <h6 id="prize">$${item.price}</h6>
       <p class="card-text">${item.nombre}</p>
       <!-- Button trigger modal -->
      <div>
       <button id="btn-buy${item.id}" type="button" class="btn btn-info" data-mdb-toggle="modal" data-mdb-target="#modalCards">
       Ver medios de pago
       </button>
       <button id="btn-cart${item.id}" type="button" class="btn btn-info"  >
       <i class="fas fa-cart-plus fa-lg"></i>
       </button>
      </div>
   </div>
</div>
</div>
  `;
  container.append(card);

  const btn = document.getElementById(`btn-buy${item.id}`);
  btn.addEventListener("click", () => {
    currentProduct = item;
  });

  const btnCartCard = document.getElementById(`btn-cart${item.id}`);
  btnCartCard.addEventListener("click", () => {
    addToCart(item);
  });
}
/**Add item to card */
function addToCart(item) {
  const length = itemsCart.length + 1;
  const { price, nombre, img } = item;
  const product = new Product(length, price, nombre, img);
  itemsCart.push(product);
  numberCart.innerText = itemsCart.length;
  localStorage.setItem("cartItems", JSON.stringify(itemsCart));
}

/*Generates the card for a bank card*/
function generateBankCard(item) {
  let div = document.createElement("div");
  div.className = `col-4`;
  div.innerText = `data-mdb-ripple-color="light"`;
  div.innerHTML = `
  <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light"> 
  <img id="modal-tar-img${item.id}" style="justify-content: center; cursor:pointer" src="${item.img}" 
  class="w-50" alt="Louvre" />
  </div>
  `;

  containerModal.append(div);
  const img = document.getElementById(`modal-tar-img${item.id}`);
  if (item.id != 4 && item.id != 10) {
    img.addEventListener("click", openCardCredit);
  }
  else { 
    console.log(currentProduct);
    img.addEventListener("click", openCardDebit);
  }
 
}

/******************************** */
/*Shows the installments of the chosen card*/
function openCardCredit() {
  document.getElementById("modal-body").classList.add("d-none");
  document.getElementById("modal-footer").classList.add("d-none");
  let installments = calculateInstallmentsCredit();
  let content = ` <h6 id="btn-choose-other" style= 'text-align: left; cursor: pointer; padding-left:4%;'><i class='fas fa-arrow-left'></i>  Elegí otra opción</h6><br><table class='table'><tbody>`;
  for (const term in installments) {
    content += `<ul class='list-group list-group-light list-group-small'>
    <li class="list-group-item">${term} cuota(s) de $${installments[
      term
    ].toFixed(2)}</li>
  </ul>`;
  }
  document.getElementById("table-tar").innerHTML = content;
  const btnChooseOther = document.getElementById("btn-choose-other");
  btnChooseOther.addEventListener("click", restore);
}
function openCardDebit() {
  document.getElementById("modal-body").classList.add("d-none");
  document.getElementById("modal-footer").classList.add("d-none");
  let content = ` <h6 id="btn-choose-other" style= 'text-align: left; cursor: pointer; padding-left:4%; '><i class='fas fa-arrow-left'></i>  Elegí otra opción</h6><br><table class='table'><tbody>`;
    content += `<ul class='list-group list-group-light list-group-small'>
    <li class="list-group-item">1 cuota de $${currentProduct.price}</li>
  </ul>`;

  document.getElementById("table-tar").innerHTML = content;
  const btnChooseOther = document.getElementById("btn-choose-other");
  btnChooseOther.addEventListener("click", restore);
}

// Generates a random interest rate between 0.01 and 0.3 (1% and 30%)
function getRandomInterest() {
  return Math.random() * 0.29 + 0.01;
}
/**Calculate the installments with his interest or not if its the first one*/
function calculateInstallmentsCredit() {
  const installments = {};
  const maxTerm = 8;
  if (currentProduct) {
    for (let i = 1; i <= maxTerm; i++) {
      const monthlyInterestRate = i === 1 ? 0 : 1 + getRandomInterest();
      const interestFreeInstallments = currentProduct.price / i;
      installments[i] = interestFreeInstallments;

      if (i > 1) {
        for (let j = 1; j < i; j++) {
          installments[i] *= monthlyInterestRate;
        }
      }
    }
  }
  return installments;
}
/*restore modal window*/
function restore() {
  document.getElementById("table-tar").innerHTML = "";
  document.getElementById("modal-body").classList.remove("d-none");
  document.getElementById("modal-footer").classList.remove("d-none");
}

/*If the modal window closes by clicking outside*/
document.addEventListener("click", (event) => {
  const modal = document.getElementById("modalCards");
  if (!modal.contains(event.target)) {
    restore();
  }
});
/**Shows the products in the cart*/
function seeProducts() {
  const body = document.getElementById("body-modal-cart");
  body.innerHTML = "";
  numberCart.innerText = itemsCart.length;
  const label = document.getElementById("modalCartLabelCart");
  const labelPrice = document.getElementById("label-price-cart");
  if (itemsCart.length > 0) {
    label.innerText = "Carrito";
    let ul = document.createElement("ul");
    ul.className = "list-group list-group-light";
    let i = 0;

    const productGroups = {};

    itemsCart.forEach((item) => {
      if (!productGroups[item.nombre]) {
        productGroups[item.nombre] = {
          product: item,
          count: 1,
          totalPrice: item.price,
        };
      } else {
        productGroups[item.nombre].count++;
        productGroups[item.nombre].totalPrice += item.price;
      }
    });

    for (const productName in productGroups) {
      const productGroup = productGroups[productName];
      const item = productGroup.product;
      const count = productGroup.count;
      const totalPrice = productGroup.totalPrice;

      let listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      listItem.innerHTML = `
      <div class="d-flex align-items-center">
      <img src="${item.img}" alt="" style="width: 45px; height: 45px" class="rounded-circle" />
      <div class="ms-3">
        <p class="fw-bold mb-1">${item.nombre} (x${count})</p>
      </div>
    </div>
    <span class="badge rounded-pill badge-success">$${totalPrice}</span>
    <button id="btn-remove-cart${item.id}" type="button" class="btn-close" aria-label="Close"></button>
  </li>
  `;
      body.append(ul);
      ul.append(listItem);
      i += totalPrice;

      const btnRemoveItem = document.getElementById(
        `btn-remove-cart${item.id}`
      );
      btnRemoveItem.addEventListener("click", () => {
        let removedIndex = itemsCart.findIndex(
          (product) => product.id === item.id
        );
        if (removedIndex !== -1) {
          itemsCart.splice(removedIndex, 1);
          updateCart();
        }
      });
    }
    labelPrice.innerText = `Subtotal: $${i}`;
  } else {
    label.innerText = "Carrito vacio";
    labelPrice.innerText = `Subtotal: $0`;
  }
}
function updateCart() {
  localStorage.setItem("cartItems", JSON.stringify(itemsCart));
  seeProducts();
}
