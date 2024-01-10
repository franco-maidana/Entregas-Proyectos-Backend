class ProductManager {
  static GuardandoProductos = [];

  create(data) {
    const Evento = {
      id:
        ProductManager.GuardandoProductos.length === 0
          ? 1
          : ProductManager.GuardandoProductos[
              ProductManager.GuardandoProductos.length - 1
            ].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock || null,
    };
    ProductManager.GuardandoProductos.push(Evento);
  }

  read() {
    return ProductManager.GuardandoProductos;
  }

  readOne(id) {
    return ProductManager.GuardandoProductos.find(
      (each) => each.id === Number(id)
    );
  }
}

const Eventos = new ProductManager();

Eventos.create({
  title: "Buzzo",
  photo:
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHRpZW5kYSUyMGRlJTIwcm9wYXxlbnwwfHwwfHx8MA%3D%3D",
  price: "$32000",
  stock: "15",
});

Eventos.create({
  title: "Jeans",
  photo:
    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGplYW5zfGVufDB8fDB8fHww",
  price: "$20000",
  stock: "12",
});

console.log(ProductManager.GuardandoProductos);

console.log(Eventos.read());
console.log(Eventos.readOne(1));
console.log(Eventos.readOne(2));

class UserManager {
  static Users = [];

  create(data) {
    const NuevoUsuario = {
      id:
        UserManager.Users.length === 0
          ? 1
          : UserManager.Users[UserManager.Users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    UserManager.Users.push(NuevoUsuario);
    return NuevoUsuario;
  }

  read() {
    return UserManager.Users;
  }

  readOne(id) {
    return UserManager.Users.find((each) => each.id === Number(id));
  }
}

const Usuarios = new UserManager();

Usuarios.create({
  name: "franco Maidana",
  photo: "foto random uno",
  email: "FrancoMaidana@gmail.com",
});

Usuarios.create({
  name: "Sofia Gomez",
  photo: "foto random dos",
  email: "SofiaGomez@gmail.com",
});

Usuarios.create({
  name: "Noelia Lopez",
  photo: "foto random tres",
  email: "NoeliaLopez@gmail.com",
});

console.log(UserManager.Users);

//filtrado de ususarios con el metodo read()
console.log(Usuarios.read());

// filtrados de usuarios mediante el ReadOne()
console.log(Usuarios.readOne(1));
console.log(Usuarios.readOne(2));
console.log(Usuarios.readOne(3));
