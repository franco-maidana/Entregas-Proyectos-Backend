import dao from "../data/index.factory.js";
const { productos } = dao;

class ProductsService {
  constructor() {
    this.model = productos;
  }
  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, orderAndPaginate }) => {
    try {
      const response = await this.model.read({ filter, orderAndPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      const response = await this.model.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  upDate = async (id, data) => {
    try {
      const response = await this.model.upDate(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const response = await this.model.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsService();
export default service;
// se exoprta a los controllers
