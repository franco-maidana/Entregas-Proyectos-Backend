import { genSaltSync, hashSync, compareSync } from "bcrypt";
// hashea la contraseña con el metodo hashSync()
const createHash = (password) => hashSync(password, genSaltSync(10));
// este metodo verifica las contraseñas si son iguales
const verifyHash = (req, db) => compareSync(req, db);

export { createHash, verifyHash };
