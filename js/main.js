/*Variables declarations*/

let currentProduct = "";

let itemsCart = [];
let products = [];
const tarjetas = [...Array(12)].map((_, index) => ({
  id: index + 1,
  img: `src/img/tarjetas/tar${index + 1}.png`,
}));

const container = document.getElementById("card-t");
const containerModal = document.getElementById("modal-row");
const cart = document.getElementById("cart-i");
const numberCart = document.getElementById("cart-items");

const computers = document.getElementById("computers");
const consoles = document.getElementById("consoles");
const televisions = document.getElementById("televisions");
const allItems = document.getElementById("all-items");

handleAddEventListenersSections();

/*Functions*/

/*Filter by type of product*/
function filterAndDisplayProducts(productType) {
  container.innerHTML = "";
  const filteredProducts = products.filter(
    (product) => product.type === productType
  );
  filteredProducts.forEach(createProductCard);
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
  } else {
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

function handleAddEventListenersSections() {
  window.addEventListener("load", () => {
    bringProducts()
      .then((data) => {
        products = data;
        /*Generates the cards for products and bank cards*/
        products.forEach(createProductCard);
        tarjetas.forEach(generateBankCard);
        console.log("en main", products);
      })
      .catch((error) => {
        console.log(error);
      });

    let savedCartItems = getItemsCart();
    if (savedCartItems) {
      itemsCart = savedCartItems;
      console.log("este", itemsCart);
      numberCart.innerText = itemsCart.length;
    }
  });
  computers.addEventListener("click", () => {
    filterAndDisplayProducts("computer");
  });

  consoles.addEventListener("click", () => {
    filterAndDisplayProducts("console");
  });

  televisions.addEventListener("click", () => {
    filterAndDisplayProducts("television");
  });

  allItems.addEventListener("click", () => {
    container.innerHTML = "";
    products.forEach(createProductCard);
  });

  /*If the modal window closes by clicking outside*/
  document.addEventListener("click", (event) => {
    const modal = document.getElementById("modalCards");
    if (!modal.contains(event.target)) {
      restore();
    }
  });
}
