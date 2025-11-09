import mongoose, { Schema, Model } from "mongoose";

export interface IEntry {
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const EntrySchema = new Schema<IEntry>(
  {
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: [true, "Type is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Entry: Model<IEntry> =
  mongoose.models.Entry || mongoose.model<IEntry>("Entry", EntrySchema);

export default Entry;
