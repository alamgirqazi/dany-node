const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const UserProducts = new Schema({
  user_id: {
    type: String,
    unique: true,
  },
  gold: {
    type: Array,
  },
  silver: {
    type: Array,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

UserProducts.plugin(mongoosePaginate);

module.exports = mongoose.model("UserProducts", UserProducts);
