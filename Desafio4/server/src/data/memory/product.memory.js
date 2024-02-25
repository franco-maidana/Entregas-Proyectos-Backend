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

  destroy(id) {
    const index = ProductManager.GuardandoProductos.findIndex(
      (product) => product.id === id
    );

    if (index !== -1) {
      const deletedProduct = ProductManager.GuardandoProductos[index];
      ProductManager.GuardandoProductos.splice(index, 1);
      return deletedProduct; // Devuelve el producto eliminado
    }

    return null;
  }

  // actualiza el objeto de la lista
  update(id, data) {
    const index = ProductManager.GuardandoProductos.findIndex(
      (product) => product.id === id
    );

    if (index !== -1) {
      ProductManager.GuardandoProductos[index] = {
        ...ProductManager.GuardandoProductos[index],
        ...data,
        id: Number(id), // Garantiza que el ID no se actualice
      };
      return ProductManager.GuardandoProductos[index]; // Devuelve el producto actualizado
    }

    return null;
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
console.log(Eventos.destroy(1));

// metodo UPDATE()
const productoAmodificar = Eventos.readOne(2);
console.log(productoAmodificar);
const productoModificado = Eventos.update(productoAmodificar.id, {
  title: "buzzo",
  price: "$15000",
});
console.log(productoModificado);
