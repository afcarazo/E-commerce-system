class Product {
  constructor(id, price, name, img) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.img = img;
  }
}

/*Generates the card for a product*/
function createProductCard(item) {
  let card = document.createElement("div");
  card.className = `col-lg-4 col-md-12 mb-4`;
  card.innerHTML = ` 
    <div class="card" >
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
      <img class="img-card" src="${item.img}" class="img-fluid" />
         <a href="#!">
         <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
         </a>
    </div>
    <div class="card-body">
         <h6 id="prize">$${item.price}</h6>
         <p class="card-text">${item.name}</p>
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
    Toastify({
      text: "Producto agregado!",

      avatar: `https://drivecodrivingschool.co.za/assets/images/add-to-cart.jpg`,

      duration: 1000,
      style: {
        background: "linear-gradient(to right, #0000c2, #0089bebd)",
      },
      className: "custom-toast",
    }).showToast();
  });
}
