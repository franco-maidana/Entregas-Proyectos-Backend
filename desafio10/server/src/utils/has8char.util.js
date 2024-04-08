// has8char.util.js
export default function has8char(req, res, next) {
  const { password } = req.body;
  if (password && password.length >= 8) {
    next();
  } else {
    res
      .status(400)
      .send({ message: "La contraseña debe tener al menos 8 caracteres." });
  }
}
