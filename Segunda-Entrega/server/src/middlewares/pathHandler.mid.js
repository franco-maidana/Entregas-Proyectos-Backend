// va para las rutas erroneas
function pathHandler(req, res, next) {
  return res.jsonI({
    statusCode: 404,
    message: `${req.method} ${req.url} not found endpoint`,
  });
}

export default pathHandler;
