const fs = require("fs");

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

  // creamos y guardamos en un archivo JSON los datos de los usuarios y lo mandmos a la carpeta data
  guardandoUsuarios(ruta) {
    try {
      const jsonData = JSON.stringify(UserManager.Users, null, 2);
      fs.writeFileSync(ruta, jsonData, "utf-8");
      console.log("los usuarios se guardaron correctamente");
    } catch (error) {
      console.log("ocurrio un error al guardar los usuarios", error);
    }
  }
  // tramos los archivos del JSON para mostrarlos
  read(ruta) {
    try {
      const UsuariosGuardados = JSON.parse(fs.readFileSync(ruta, "utf-8"));
      console.log(UsuariosGuardados);
    } catch (error) {
      console.error("ocurrio un error al cargar los usuarios", error);
    }
  }
  // traemos los usuarios del archivo JSON mediante el numero del ID
  readOnId(id) {
    const usuariosId = UserManager.Users.find((usr) => usr.id === id);
    return usuariosId || null;
  }
}

const ruta = "./desafio2/UsersManager/data/Usuarios.fs.json";

const UsuariosNuevos = new UserManager();

UsuariosNuevos.create({
  name: "franco Maidana",
  photo: "foto random uno",
  email: "FrancoMaidana@gmail.com",
});

UsuariosNuevos.create({
  name: "Sofia Gomez",
  photo: "foto random dos",
  email: "SofiaGomez@gmail.com",
});

UsuariosNuevos.create({
  name: "Noelia Lopez",
  photo: "foto random tres",
  email: "NoeliaLopez@gmail.com",
});

UsuariosNuevos.guardandoUsuarios(ruta);
UsuariosNuevos.read(ruta);
console.log(UsuariosNuevos.readOnId(1));
console.log(UsuariosNuevos.readOnId(2));
console.log(UsuariosNuevos.readOnId(3));
