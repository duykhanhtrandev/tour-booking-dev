const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'Các chuyến tham quan',
    tours
  });
});

const getUserManagement = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).render('usermanagement', {
    title: 'Quản lý người dùng',
    users
  });
});

const getReviewManagement = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).render('reviewmanagement', {
    title: 'Quản lý đánh giá của người dùng',
    reviews
  });
});

const getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('Không có chuyến du lịch nào với tên đó', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour
  });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Đăng nhập tài khoản của bạn'
  });
};

const getSignUpForm = (req, res) => {
  res.status(200).render('signup', {
    title: `Đăng ký tài khoản của bạn`
  });
};

const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Tài khoản của bạn'
  });
};

const getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour.id);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'Chuyến tham quan của tôi',
    tours
  });
});

const updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Tài khoản của bạn',
    user: updatedUser
  });
});

module.exports = {
  getOverview,
  getTour,
  getLoginForm,
  getSignUpForm,
  getAccount,
  getMyTours,
  updateUserData,
  getUserManagement,
  getReviewManagement
};
