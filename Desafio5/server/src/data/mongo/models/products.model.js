import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    date: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const productosMongo = model(collection, schema);
export default productosMongo;
