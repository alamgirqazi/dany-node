const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const Product = new Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  carat: {
    type: Object,
  },
  price: {
    type: Number,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

Product.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", Product);
