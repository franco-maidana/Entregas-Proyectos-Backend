import CustomRouter from "./CustomRoouter.js";
import ApiRouter from "./api/index.router.api.js";
// import ViewsRoueter from "./views/index.router.view.js";

const api = new ApiRouter(); // instancia de la clase
const apiRouter = api.getRouter(); // enrutador

// const views = new ViewsRoueter();
// const viewsRouter = views.getRouter();

export default class indexRouter extends CustomRouter {
  //  con el metodo init puedo usar todas
  //  las funciones que hay dentro del customRouter
  init() {
    this.router.use("/api", apiRouter); // => apis
    // this.router.use("/", viewsRouter); // => vistas
  }
}
