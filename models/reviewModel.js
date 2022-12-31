// review / rating /createdAt / ref to tour / ref to user
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review không được để trống!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review phải thuộc về một chuyến tham quan.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review phải thuộc về một người dùng.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo'
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
