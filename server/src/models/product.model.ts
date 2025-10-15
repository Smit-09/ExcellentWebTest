import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  stock: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
