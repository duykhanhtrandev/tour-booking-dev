const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

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

const getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'Du Lịch Quảng Ninh'
  });
};

module.exports = {
  getOverview,
  getTour
};
