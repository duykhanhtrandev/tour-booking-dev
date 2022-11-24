const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Chuyến tham quan cần một cái tên'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'Chuyến tham quam cần giá']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
