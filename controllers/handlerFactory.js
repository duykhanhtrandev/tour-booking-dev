const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('Không tìm thấy document nào có ID này', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

module.exports = { deleteOne };
