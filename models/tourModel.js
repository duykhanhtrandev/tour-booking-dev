const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Chuyến tham quan cần một cái tên'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'Chuyến tham quan cần thời lượng']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Chuyến tham quan cần biết số lượng người']
  },
  difficulty: {
    type: String,
    required: [true, 'Mức độ khó của chuyến tham quan']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Chuyến tham quam cần giá tiền']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Chuyến tham quan cần đoạn mô tả']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'Chuyến tham quan cần ảnh bìa']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
