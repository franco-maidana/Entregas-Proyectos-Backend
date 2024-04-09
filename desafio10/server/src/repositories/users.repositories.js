import UserDTO from "../dto/users.dto.js";
import dao from "../data/index.factory.js";
const { usuarios } = dao;

class UsersRepositories {
  constructor() {
    this.model = usuarios;
  }

  create = async (data) => {
    data = new UserDTO(data);
    console.log("esto es data repositories", data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, orderAndPaginate }) =>
    await this.model.read({ filter, orderAndPaginate });
  readOne = async (id) => await this.model.readOne(id);
  readByEmail = async (email) => await this.model.readByEmail(email);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const UsuarioRepositorio = new UsersRepositories();
export default UsuarioRepositorio;
// lo exportamos a la capa de products.servicios.js
