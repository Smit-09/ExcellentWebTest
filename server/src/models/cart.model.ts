import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICart extends Document {
  productId: Types.ObjectId;
  quantity: number;
}

const cartSchema = new Schema<ICart>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true, unique: true },
    quantity: { type: Number, required: true, default: 1, min: 0 }
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
