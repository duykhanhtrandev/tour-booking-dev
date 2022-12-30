const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Chuyến tham quan cần một cái tên'],
      unique: true,
      trim: true,
      maxlength: [
        100,
        'Tên chuyến tham quan phải ngắn hơn hoặc bằng 100 ký tự'
      ],
      minlength: [10, 'Tên chuyến tham quan phải dài hơn hoặc bằng 10 ký tự']
      // validate: [validator.isAlpha, 'Tên chuyến tham quan chỉ được chứa ký tự']
    },
    slug: String,
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
      required: [true, 'Mức độ khó của chuyến tham quan'],
      enum: {
        values: ['thông thường', 'trải nghiệm', 'khám phá'],
        message: 'Kiểu tham quan phải là: thông thường, trải nghiệm, khám phá'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Xếp hạng phải trên 1.0'],
      max: [5, 'Xếp hạng phải dưới 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Chuyến tham quam cần giá tiền']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Giá giảm ({VALUE}) phải thấp hơn giá gốc'
      }
    },
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
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
