import { Router, response } from "express";
// import productos from "../../data/fs/product.fs.js";
import { productos } from "../../data/mongo/manager.model.js";
// import propsProductos from "../../middlewares/propsProducts.mid.js"; =>  no me crea el producto

const productsRouter = Router();

productsRouter.post("/api/products", async (req, res, next) => {
  try {
    const productData = req.body;
    const createdProduct = await productos.create(productData);
    if (createdProduct === "Title & price are requered") {
    } else {
      return res.json({
        statusCode: 201,
        response: createdProduct, // Utiliza createdProduct en lugar de response
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/api/products", async (req, res, next) => {
  try {
    let filter = {};
    let order = {};

    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }

    if (req.query.order) {
      const [field, sortOrder] = req.query.order.split(":");
      if (field && sortOrder) {
        order[field] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
      }
    }

    const all = await productos.read({ filter, order });

    if (all.length === 0) {
      return res.json({
        statusCode: 404,
        message: "Not found Users",
      });
    }

    console.log(all);

    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/api/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const elProducto = await productos.readOne(pid);

    if (!elProducto) {
      return res.status(404).json({
        statusCode: 404,
        message: "Product not found",
      });
    } else {
      console.log(elProducto); // Mueve la impresión antes de enviar la respuesta
      return res.status(200).json({
        statusCode: 200,
        response: elProducto,
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

productsRouter.delete("/api/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;

    // Llama al método destroy de ProductManager con el ID proporcionado
    const deletedProduct = await productos.destroy(pid);

    // Si se elimina con éxito, devuelve un mensaje apropiado
    return res.status(200).json({
      statusCode: 200,
      message: `Producto con ID ${pid} eliminado correctamente`,
    });
  } catch (error) {
    // Si hay algún error, devuelve un mensaje de error
    return next(error);
  }
});

productsRouter.put("/api/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productData = req.body;

    // Llama al método update de ProductManager con el ID y los datos proporcionados
    const updatedProduct = await productos.update(pid, productData);

    // Si se actualiza con éxito, devuelve el producto actualizado
    return res.status(200).json({
      statusCode: 200,
      message: `Producto con ID ${pid} actualizado correctamente`,
      response: updatedProduct,
    });
  } catch (error) {
    // Si hay algún error, devuelve un mensaje de error
    return next(error);
  }
});

export default productsRouter;
