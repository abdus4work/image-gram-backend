
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String
    },
    avatar: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: v=>{
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      minLength: [6, 'Email must be at least 6 characters']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minLength: [3, 'Username must be at least 3 characters']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters']
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const userModel = mongoose.model('User', userSchema);

export default userModel;