import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  booking: string;
  amount: number;
  paymentDate?: Date;
  paymentMethod: "Credit Card" | "Debit Card" | "Net Banking" | "UPI";
  status: "Pending" | "Completed" | "Failed";
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    booking: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "Net Banking", "UPI"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
