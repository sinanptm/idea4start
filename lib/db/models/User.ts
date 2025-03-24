import { Model, model, models, Schema } from 'mongoose';
import { IUser } from '@/types/interface';

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: String,
  image: String,
  designations: String,
  company: String,
  location: String,
  bio: String,
  website: String,
  twitter: String,
  buyMeACoffee: String,
  linkedin: String,
  github: String,
  phoneNumber: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
  languages: [String],
}, {
  timestamps: true,
  versionKey: false
});

const User = (models.User as Model<IUser>) || model('User', UserSchema);

export default User;