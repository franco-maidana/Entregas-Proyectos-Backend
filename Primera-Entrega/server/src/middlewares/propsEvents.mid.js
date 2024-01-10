// cammpos obligatorios para los productos
/* si las propiedades obligatorias fueron enviadas CORRERCTAMENTE dejo pasar si no mando el error correctamente  */

function propsEvents(req, res, next) {
  const { name, place } = req.body;
  if (!name || !place) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} name & place are required`,
    });
  } else {
    return next();
  }
}

export default propsEvents;
// se va en el post de los productos entre la ruta el CB
