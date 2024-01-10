// su funcion es informar al cliente que ocurrio un error en el servidor remplaza todo el codigo que esta en el cath lo hace menos tedioso

function errorHandler(error, req, res, next) {
  console.log(error);
  return res.json({
    statusCode: error.statusCode || 500,
    message: `${req.method} ${req.url} ${error.message}`,
  });
}

export default errorHandler;
