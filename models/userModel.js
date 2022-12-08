const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Vui lòng xác nhận mật khẩu của bạn'],
    validate: {
      // This only worlks CREATE on SAVE
      validator: function(el) {
        return el === this.password;
      },
      message: 'Mật khẩu không khớp!'
    }
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
