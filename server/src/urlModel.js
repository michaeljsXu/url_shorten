import 'dotenv/config'
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI);

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  index: Number,
});

const UrlModel = mongoose.model("Url", urlSchema);

export default UrlModel;