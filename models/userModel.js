const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hãy cho chúng tôi biết tên của bạn!']
  },
  email: {
    type: String,
    required: [true, 'Hãy cho chúng tôi biết email của bạn!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Vui lòng cung cấp một email hợp lệ']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Vui lòng cung cấp một mật khẩu hợp lệ'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Vui lòng xác nhận mật khẩu của bạn']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
