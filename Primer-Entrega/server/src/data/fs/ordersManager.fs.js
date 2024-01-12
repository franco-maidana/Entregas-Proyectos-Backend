import fs from "fs";
import crypto from "crypto";

class OrdersManager {
  static ordenGuardada = [];

  constructor(path) {
    (this.path = path), this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    console.log(exist);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      OrdersManager.ordenGuardada = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }

  async create(data) {
    try {
      const { uid, state, quantity, pid } = data;
      if (
        typeof uid !== "string" ||
        typeof state !== "string" ||
        typeof quantity !== "number" ||
        typeof pid !== "string"
      ) {
        throw new Error(
          "Invalid data format. 'uid', 'state', 'quantity', and 'pid' must be of type string, number, string respectively."
        );
      }

      if (!uid || !state || !quantity || !pid) {
        throw new Error(
          "Fields 'uid', 'state', 'quantity', and 'pid' are required."
        );
      }

      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        uid,
        state,
        quantity,
        pid,
      };

      OrdersManager.ordenGuardada.push(newProduct);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(OrdersManager.ordenGuardada, null, 2),
        "utf-8"
      );

      console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async read() {
    try {
      const ordersData = await fs.promises.readFile(this.path, "utf-8");
      const orders = JSON.parse(ordersData);
      console.log(orders);
      return orders;
    } catch (error) {
      console.error("Error reading orders:", error.message);
      return [];
    }
  }

  async readByUser(uid) {
    try {
      const ordersData = await fs.promises.readFile(this.path, "utf-8");
      const orders = JSON.parse(ordersData);

      const userOrders = orders.filter((order) => order.uid === uid);

      console.log(userOrders);
      return userOrders;
    } catch (error) {
      console.error("Error reading orders by user:", error.message);
      throw error; // Asegurarse de lanzar el error para que se maneje adecuadamente en el bloque catch externo
    }
  }

  async update(id, quantity, state) {
    try {
      const ordersData = await fs.promises.readFile(this.path, "utf-8");
      let orders = JSON.parse(ordersData);

      const orderToUpdate = orders.find((order) => order.id === id);
      console.log(orderToUpdate);
      if (!orderToUpdate) {
        throw new Error("Order not found");
      }

      if (quantity != undefined) {
        orderToUpdate.quantity = quantity;
      }

      if (state != undefined) {
        orderToUpdate.state = state;
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(orders, null, 2),
        "utf-8"
      );

      console.log("Order updated successfully");
      return "Order updated successfully";
    } catch (error) {
      console.error("Error updating order:", error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const ordersData = await fs.promises.readFile(this.path, "utf-8");
      let orders = JSON.parse(ordersData);

      const updatedOrders = orders.filter((order) => order.id !== id);

      if (updatedOrders.length === orders.length) {
        throw new Error("Order not found");
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(updatedOrders, null, 2),
        "utf-8"
      );

      console.log("Order deleted successfully");
      return "Order deleted successfully";
    } catch (error) {
      console.error("Error deleting order:", error.message);
      return error.message;
    }
  }
}

const ordenManager = new OrdersManager(
  "./src/data/fs/files/OrdenesManager.json"
);

export default ordenManager;

// ordenManager.create({
//   uid: "idUsuario123",
//   state: "reservado",
//   quantity: 2,
//   pid: "idProducto789",
// });

// ordenManager.create({
//   uid: "idUsuario456",
//   state: "confirmado",
//   quantity: 4,
//   pid: "idProducto0123",
// });

// ordenManager.read();
// ordenManager.readByUser("idUsuario456");
// ordenManager.update("3c94a30e4bfca4a88a64f4cb", 5, "cancelado");
// ordenManager.destroy("605b978ae33a17b59d73dc72"); // funca
