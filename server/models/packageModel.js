import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5, default: 5 },
  text: { type: String, required: true }
},{timestamps: true});

const itinerarySchema = new mongoose.Schema({
  day : { type :  Number, unique : true, required : true},
  title : {type : String, required : true},
  description : {type : String, required : true}
})

const imageSchema = new mongoose.Schema({
  public_id : { type : String, required : true},
  imageUrl : { type : String, required : true}
})

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true, },
  rating: { type: Number, required: true, min: 0, max: 5, default: 5 },
  images: [imageSchema],
  description: { type: String, required: true },
  highlights: [{ type: String, required: true }],
  includes: [{ type: String, required: true }],
  excludes: [{ type: String, required: true }],
  meetingPoint: { type: String, required: true },
  importantInfo: [{ type: String, required: true }],
  packageItinerary : [itinerarySchema],
  reviews: [reviewSchema]
}, { timestamps: true });

export default mongoose.model("packages", packageSchema);
