// const fs = require("fs");
import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #Users = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    console.log(exist);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#Users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo, and email are required");
      }
      const newUsers = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      UserManager.#Users.push(newUsers);

      // Escribir los usuarios en el archivo JSON de la instancia de UserManager
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(UserManager.#Users, null, 2),
        "utf8"
      );
      console.log("Datos escritos en el archivo correctamente:", newUsers);

      return newUsers;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read() {
    try {
      const usersData = fs.readFileSync(this.path, "utf-8"); // Corregir la lectura del archivo
      const users = JSON.parse(usersData);
      console.log(users);
      return users;
    } catch (error) {
      console.error("Error al leer o parsear el archivo:", error.message);
      return null;
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#Users.find((each) => each.id === id);
      if (user) {
        console.log(user);
        return user;
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  destroy(id) {
    try {
      const index = UserManager.#Users.findIndex((user) => user.id === id);
      if (index !== -1) {
        UserManager.#Users.splice(index, 1);
        fs.writeFileSync(
          this.path,
          JSON.stringify(UserManager.#Users, null, 2)
        );
        console.log(`El usuario ha sido eliminado`);
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  update(id, data) {
    try {
      const index = UserManager.#Users.findIndex((user) => user.id === id);
      if (index !== -1) {
        UserManager.#Users[index] = {
          ...UserManager.#Users[index],
          ...data,
        };
        fs.writeFileSync(
          this.path,
          JSON.stringify(UserManager.#Users, null, 2)
        );
        console.log("Usuario actualizado:", UserManager.#Users[index]);
        return UserManager.#Users[index];
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

const Usuarios = new UserManager("./src/data/fs/files/usuarios.json");

// Usuarios.create({
//   name: "Franco",
//   photo: "Franco.jpg",
//   email: "FrancoMaidana@gmail.com",
// });

// Usuarios.create({
//   name: "Pedro",
//   photo: "Pedro.jpg",
//   email: "Pedro@gmail.com",
// });

// Usuarios.read();
// Usuarios.readOne("83b2c8cc6e4af3c84464f17e");
// Usuarios.readOne();
// Usuarios.destroy();
// Usuarios.update("9b9b63093741a7114f1075f7", {
//   name: "Roberto Gomez",
//   photo: "Roberto.png",
//   email: "Robert_Tito@gmail.com",
// });

export default Usuarios;
