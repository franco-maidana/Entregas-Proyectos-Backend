console.log("socket");

const socket = io();

socket.on("productos", (data) => {
  const Data = data
    .map(
      (each) => `
    <div class="card" style="width: 18rem;">
    <img src="${each.photo}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${each.title}</h5>
    </div>
    </div>
    `
    )
    .join("");
  console.log(Data);
  document.querySelector("#productos").innerHTML = Data;
});
// recibimos lo que mandamos el backend con la primera propiedad que ponemos
socket.on("welcome", (message) => alert(message));

socket.on("new success", (message) => alert(message));

// enviamos algo del frond al backend
document.querySelector("#newProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#Title").value;
  const photo = document.querySelector("#Photo").value;
  const price = document.querySelector("#Price").value;
  const stock = document.querySelector("#Stock").value;
  const data = {};
  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);
  console.log(data);
  // capturamos todos los datos  y lo pasamos al backend para que lo pase al json de productos
  socket.emit("newProducts", data);
});
