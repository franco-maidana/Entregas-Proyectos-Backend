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
<<<<<<< HEAD

socket.on("new success", (message) => alert(message));

// enviamos algo del frond al backend
=======
// enviamos algo del frond al backend
// socket.emit("newProducts", {
//   title: "buzos Gap",
//   photo:
//     "https://acdn.mitiendanube.com/stores/985/414/products/137742ee-a1e2-4c8b-b764-c8d50e605ccd-88167d6f94e69810e517039479586363-320-0.webp",
//   price: 25500,
//   stock: 10,
// });

socket.on("new success", (message) => alert(message));

>>>>>>> 34e14413fe6bb275abfed6ea28d55270d119d948
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
