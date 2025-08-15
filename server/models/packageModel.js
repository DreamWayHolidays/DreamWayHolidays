import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  text: { type: String, required: true }
},{timestamps: true});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true, enum: ["Spiritual", "Adventure", "Cultural", "Wildlife"] },
  rating: { type: Number, required: true, min: 0, max: 5 },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  highlights: [{ type: String, required: true }],
  includes: [{ type: String, required: true }],
  excludes: [{ type: String, required: true }],
  meetingPoint: { type: String, required: true },
  importantInfo: [{ type: String, required: true }],
  reviews: [reviewSchema]
}, { timestamps: true });

export default mongoose.model("packages", packageSchema);
