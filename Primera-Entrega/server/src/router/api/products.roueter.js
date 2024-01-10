import { Router } from "express";
import events from "../../data/fs/product.fs.js";
import propsEvents from "../../middlewares/propsEvents.mid.js";

const eventsRouter = Router();

// definir los empoind (POST GET PUT DELETE )
eventsRouter.post("/", propsEvents, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await events.createEvent(data);
    return res.json({
      statusCode: 201,
      message: "created",
      response,
      // response: response, pero con el de arriba se simplifica
    });
  } catch (error) {
    return next(error);
  }
});

eventsRouter.get("/", async (req, res, next) => {
  try {
    const all = await events.readEvents();
    // para chequear si una variable es un array devolviendo un booleano
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});

eventsRouter.get("/:eip", async (req, res, next) => {
  try {
    const { eip } = req.params;
    const one = await events.readEventById(eip);
    if (!one) {
      return res.status(404).json({
        statusCode: 404,
        message: "Event not found",
      });
    }
    return res.json(one);
  } catch (error) {
    return next(error);
  }
});

eventsRouter.put("/api/events/:eid/:quantity", async (req, res, next) => {
  try {
    const { id, quantity } = req.params;
    const response = await events.soldticket(quantity, eid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    } else if (response === "there isn't any events") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

eventsRouter.delete("/:eip", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await events.removeEventById(eid);
    if (response === "There isn't any events") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default eventsRouter;
