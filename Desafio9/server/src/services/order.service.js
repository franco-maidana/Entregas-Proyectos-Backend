import { ordenManager } from "../data/mongo/manager.model.js";

class OrdenService {
  constructor() {
    this.model = ordenManager;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, ordenAndPaginate }) =>
    await this.model.read({ filter, ordenAndPaginate });
  report = async (id) => await this.model.reportBill(id);
  update = async (id, data) => {
    try {
      const opciones = { new: true }; // Esta opción devuelve el documento modificado en lugar del original
      const unoActualizado = await this.model.update(id, data, opciones);
      return unoActualizado; // Asegúrate de devolver el documento actualizado
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => await this.model.destroy(id);
}

const service = new OrdenService();
export default service;
