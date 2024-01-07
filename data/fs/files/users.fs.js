const fs = require("fs");
const crypto = require("crypto");
const { Console } = require("console");

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

      await this.writeFile(); // Write data to the file after adding a new user.
      console.log(newUsers.id);
      return newUsers;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (UserManager.#Users.length === 0) {
        throw new Error("Usuario no encontrado");
      } else {
        Console.log(UserManager.#Users);
        return UserManager.#Users;
      }
    } catch (error) {
      console.log(UserManager.#Users);
      return UserManager.#Users;
    }
  }

  readOne(id) {
    try {
      const newUsers = UserManager.#Users.find((each) => each.id === id);
      if (newUsers) {
        console.log(newUsers);
        return newUsers;
      } else {
        throw new Error("usuario no encontrado");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  destroy(id) {
    try {
      const newUsers = UserManager.#Users.find((each) => each.id !== id);
      if (newUsers) {
        fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#Users, null, 2)
        );
        console.log("el ususario a sido eliminado");
      } else {
        throw new Error("usuario no encontrado");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const usuarios = new UserManager("./data/fs/files/usuarios.json");

// Example usage:
usuarios.create({
  name: "Franco",
  photo: "Franco.jpg",
  email: "FrancoMaidana@gmail.com",
});

async function usrManager() {
  await usuarios.read();
  await usuarios.readOne();
  await usuarios.readOne("0102ae2873909d5408a43154");
  await usuarios.destroy("0102ae2873909d5408a43154");
}

usrManager();
