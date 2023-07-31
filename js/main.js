
/*Declaración de variables */
class producto {
  constructor(precio, nombre, img) {
    this.precio = precio;
    this.nombre = nombre;
    this.img = img;
  }
}

const productos = [
  {
    id: 1,
    precio: 508200,
    nombre: "Notebook Lenovo 14¨ Fhd Flex Ipsci7-1255u 16gb 512ssd W 11",
    img: "./img/lenovo.jpg",
  },
  {
    id: 2,
    precio: 375850,
    nombre: "Smart Tv Televisor LG 55'' Led 55nano80 Uhd 4k Nano Cell",
    img: "./img/televisor.png",
  },
  {
    id: 3,
    precio: 580000,
    nombre: "Sony PlayStation 5 825GB Standard color blanco y negro",
    img: "./img/play.jpg",
  },
];

var contenido = "";


/*Se cargan las cards*/

for (let index = 0; index < 3; index++) {
  this.contenido += `
<div class="col-lg-4 col-md-12 mb-4">
    <div class="card" >
       <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
         <img  src="${productos[index].img}" class="img-fluid" />
            <a href="#!">
            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
       </div>
       <div class="card-body">
            <h6 id="prize">$${productos[index].precio}</h6>
            <p class="card-text">${productos[index].nombre}</p>
            <!-- Button trigger modal -->
            <button onclick="handleCompraClick(${index})" id="btn-buy" type="button" class="btn btn-info" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
            Comprar
            </button>
        </div>
    </div>
    </div>
</div>`;
}
document.getElementById("card-t").innerHTML = this.contenido;
console.log(this.contenido);


/** asigna el producto seleccionado */
function handleCompraClick(index) {
  this.producto = productos[index];
}


function openTarjeta() {
  document.getElementById('cards-t').style.display= 'none';
  document.getElementById('modal-footer').style.display= 'none';
  const cuotas = calcularCuotas(this.producto);
  let contenido =
    "<h6 onclick='restaurar()' style= 'text-align: left; cursor: pointer;'><i class='fas fa-arrow-left'></i>  Elegí otra opción</h6><br><table class='table'><tbody>"

  for (const plazo in cuotas) {
    contenido += `<ul class='list-group list-group-light list-group-small'>
    <li class="list-group-item">${plazo} cuota(s) de ${cuotas[plazo].toFixed(2)}</li>
  </ul>`;

  }
  document.getElementById("table-tar").innerHTML = contenido;
}
// Genera una tasa de interés aleatoria entre 0.01 y 0.3 (1% y 30%)
function getRandomInterest() {
  return Math.random() * 0.29 + 0.01;
}
/**Calcula las cuotas con el interés */
function calcularCuotas(producto) {
  const cuotas = {};
  const maxPlazo = 8;

  for (let i = 1; i <= maxPlazo; i++) {
    const tasaInteresMensual = i === 1 ? 0 : 1 + getRandomInterest();
    const cuotaSinInteres = producto.precio / i;
    cuotas[i] = cuotaSinInteres;

    if (i > 1) {
      for (let j = 1; j < i; j++) {
        cuotas[i] *= tasaInteresMensual;
      }
    }
  }

  return cuotas;
}

function restaurar(){
  document.getElementById("table-tar").innerHTML = "";
  if (document.getElementById('cards-t').style.display==='none') { 
    document.getElementById('cards-t').style.display = '';
    document.getElementById('modal-footer').style.display= '';
  }
 }
