// cuple como funcion validadora
function propsProductos(req, res, next) {
  const { title, photo, price, stock } = req.body;
  if (!title || !photo || !price || !stock) {
    return res.json({
      stateCode: 400,
      message: `${req.method} ${req.url} title, photo, price, and stock are required`,
    });
  } else {
    return next();
  }
}

export default propsProductos;
// se enruta en la creacion de los productos
