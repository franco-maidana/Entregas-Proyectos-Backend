import { Usuarios } from "../data/mongo/manager.model.js";

class UserService {
  constructor() {
    this.model = Usuarios;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, ordenAndPaginate }) =>
    await this.model.read({ filter, ordenAndPaginate });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const service = new UserService();
export default service;
