import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 0 },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

const UsuarioMongo = model(collection, schema);
export default UsuarioMongo;
