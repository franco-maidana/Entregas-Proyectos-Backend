import { connect } from "mongoose"; // conectarme a la base de datos de Mongo

const dbconnection = async () => {
  try {
    // process.env.BD_MONGO => de esta forma accedo a la variable de entorno
    await connect(process.env.BD_MONGO);
    //mensaje que esta conectado a la base de datos
    console.log("Usted a entrado a la base de datos de Mongo");
  } catch (error) {
    console.log(error);
  }
};

export default dbconnection;
