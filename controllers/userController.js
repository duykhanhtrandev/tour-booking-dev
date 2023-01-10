const multer = require('multer');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Đây không phải là một hình ảnh! Vui lòng chỉ tải lên hình ảnh.',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadUserPhoto = upload.single('photo');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'Lộ trình này không dành cho cập nhật mật khẩu. Vui lòng sử dụng /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:
      'Tuyến đường này không được xác định! Vui lòng sử dụng /signup để thay thế'
  });
};

const getUser = factory.getOne(User);
const getAllUsers = factory.getAll(User);

// Do NOT update password with this!
const updateUser = factory.updateOne(User);
const deleteUser = factory.deleteOne(User);

module.exports = {
  uploadUserPhoto,
  getMe,
  updateMe,
  deleteMe,
  updateUser,
  deleteUser,
  createUser,
  getUser,
  getAllUsers
};
