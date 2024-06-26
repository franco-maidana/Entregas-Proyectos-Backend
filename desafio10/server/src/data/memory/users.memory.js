import crypto from "crypto";

class UserManager {
  static Users = [];

  create(data) {
    const NuevoUsuario = {
      id: crypto.randomBytes(12).toString("hex"),
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

  destroy(id) {
    const index = UserManager.Users.findIndex((user) => user.id === id);

    if (index !== -1) {
      const deletedUser = UserManager.Users[index];
      UserManager.Users.splice(index, 1);
      return deletedUser;
    }

    return null;
  }

  update(id, data) {
    const index = UserManager.Users.findIndex((user) => user.id == id);

    if (index !== -1) {
      UserManager.Users[index] = {
        ...UserManager.Users[index],
        ...data,
        id: Number(id),
      };
      return UserManager.Users[index];
    }
    return null;
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
console.log(Usuarios.destroy(2));

// metodo  UPDATE()
const usuarioAModificar = Usuarios.readOne(1);
console.log(usuarioAModificar);
const usuarioActualizado = Usuarios.update(usuarioAModificar.id, {
  email: "franco@gmail.com",
});
console.log(usuarioActualizado);
