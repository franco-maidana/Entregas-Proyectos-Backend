import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    products_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "payed", "delivered"],
    },
  },
  { timestamps: true }
);

const OrderMongo = model(collection, schema);
export default OrderMongo;
