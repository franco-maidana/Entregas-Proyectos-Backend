class OrdersManager {
  constructor() {
    this.ordenesGuardadas = [];
  }

  create(data) {
    const { uid, state, quantity, pid } = data;
    const nuevaOrden = {
      uid: uid,
      state: state,
      quantity: quantity,
      pid: pid,
    };
    this.ordenesGuardadas.push(nuevaOrden);
    return nuevaOrden; // Opcional: Devolver la orden creada
  }

  read() {
    return this.ordenesGuardadas;
  }

  readOne(uid) {
    return this.ordenesGuardadas.filter((orden) => orden.uid === uid);
  }

  update(oid, quantity, state) {
    const ordenEncontradaIndex = this.ordenesGuardadas.findIndex(
      (orden) => orden.pid === oid
    );
    if (ordenEncontradaIndex !== -1) {
      if (quantity !== undefined) {
        this.ordenesGuardadas[ordenEncontradaIndex].quantity = quantity;
      }
      if (state !== undefined) {
        this.ordenesGuardadas[ordenEncontradaIndex].state = state;
      }
    }
  }

  destroy(oid) {
    this.ordenesGuardadas = this.ordenesGuardadas.filter(
      (orden) => orden.pid !== oid
    );
  }
}

const ordenManager = new OrdersManager(); // Corregimos el nombre de la clase

ordenManager.create({
  uid: "idUsuario123",
  state: "reservado",
  quantity: 2,
  pid: "idProducto789",
});

ordenManager.create({
  uid: "idUsuario456",
  state: "confirmado",
  quantity: 4,
  pid: "idProducto0123",
});

console.log(ordenManager.ordenesGuardadas);

const todasLasOrdenes = ordenManager.read();
console.log(todasLasOrdenes);

const ordenesUsuario = ordenManager.readOne("idUsuario123");
console.log(ordenesUsuario);

ordenManager.update("idProducto789", 3, "confirmado");
console.log(ordenManager.ordenesGuardadas);

ordenManager.destroy("idProducto789");
console.log(ordenManager.ordenesGuardadas);
