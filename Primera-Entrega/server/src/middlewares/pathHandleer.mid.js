// cualquier ruta que se escriba mal va a saltar este error, es para las rutas

function pathHandler(req, res, next) {
  return res.json({
    statusCode: 404,
    message: `${req.method} ${req.url} not found endpoint`,
  });
}

export default pathHandler;
