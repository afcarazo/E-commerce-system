const tarjetas = [...Array(12)].map((_, index) => ({
  id: index + 1,
  img: `../src/img/tarjetas/tar${index + 1}.png`,
}));

let totalPriceCart = 0;

const interest = document.getElementById("interest");
const total = document.getElementById("total");
const cuotasSelect = document.getElementById("cuotas");
const containerCard = document.getElementById("container-b");
const form = document.getElementById("form-payment");

cuotasSelect.disabled = true;

tarjetas.forEach(generateBankCard);
totalPriceI();
addEventListenersP();

/* Calculate the total price of the cart*/
function totalPriceI() {
  let itemsCart = getItemsCart();
  console.log(itemsCart);
  if (itemsCart.length > 0) {
    itemsCart.forEach((item) => {
      totalPriceCart += item.price;
    });
    total.innerText = `$${totalPriceCart}`;
  } else {
    totalPriceCart = 0;
  }
}

function handleCuotasChange() {
  const selectedCuotas = parseInt(cuotasSelect.value);

  if (selectedCuotas > 0) {
    if (cuotasSelect.value !== "") {
      if (cuotasSelect.value == 1) {
        openCardDebit();
      } else {
        openCardCredit();
      }
    }
  }
}

function generateBankCard(item) {
  let div = document.createElement("div");
  div.className = `col-4 col-md-2 mb-3 card-container`;
  div.innerHTML = `
          <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light"> 
              <img class="center-img" id="container-tar-img${item.id}" style="cursor: pointer" "align-items":"center" src="${item.img}" class="w-20" alt="Card" />
          </div>
      `;
  containerCard.append(div);
  const img = document.getElementById(`container-tar-img${item.id}`);
  if (item.id != 4 && item.id != 10) {
    img.addEventListener("click", openCardCredit);
  } else {
    img.addEventListener("click", openCardDebit);
  }
}

function openCardCredit() {
  cuotasSelect.disabled = false;
  cuotasSelect.style = "opacity:1";
  console.log(totalPriceCart);
  if (cuotasSelect.value > 1 && totalPriceCart > 0) {
    const installments = calculateInstallmentsCredit(
      parseInt(cuotasSelect.value),
      totalPriceCart
    );
    total.innerHTML = `$${totalPriceCart.toFixed(2)}`;
    interest.innerHTML = `$${installments.toFixed(2)}`;
  } else {
    console.log("entre aca", totalPriceCart);
    inte.innerHTML = `$${totalPriceCart.toFixed(2)}`;
    interest.innerHTML = `$${totalPriceCart.toFixed(2)}`;
  }
}

function openCardDebit() {
  cuotasSelect.disabled = true;
  cuotasSelect.value = 1;
  cuotasSelect.style = "opacity:0.5";
  if (cuotasSelect.value && totalPriceCart > 0) {
    total.innerHTML = `$${totalPriceCart.toFixed(2)}`;
    interest.innerHTML = `$${totalPriceCart.toFixed(2)}`;
  }
}

function getRandomInterest() {
  const minInterestRate =
    (totalPriceCart - totalPriceCart * 0.01) / totalPriceCart; // Minimum interest that ensures that the value with interest is higher

  const randomInterest = Math.random() * 0.29 + minInterestRate;

  return randomInterest;
}

function calculateInstallmentsCredit(maxTerm, totalPriceCart) {
  if (totalPriceCart <= 0 || maxTerm <= 0) {
    return totalPriceCart;
  }

  let totalWithInterest = 0;
  const monthlyInterestRate = getRandomInterest();

  for (let i = 0; i < maxTerm; i++) {
    totalWithInterest += totalPriceCart * monthlyInterestRate;
  }

  return totalWithInterest;
}

function addEventListenersP() {
  cuotasSelect.addEventListener("change", handleCuotasChange);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (cuotasSelect.value === "") {
      Swal.fire(
        "Error",
        "Por favor, seleccione una tarjeta antes de continuar.",
        "error"
      );
    } else {
      event.preventDefault();
      Swal.fire("Compra realizada con exito!", "Compra exitosa", "success");
      setTimeout(() => {
        let array = [];
        setItemsCart(array);
        window.location.href = "../index.html";
      }, 2000);
    }
  });
}
