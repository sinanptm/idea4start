import { Model, model, models, Schema } from 'mongoose';
import { IUser } from '@/types/interface';

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  image: String
}, {
  timestamps: false,
  versionKey: false
});

const User = (models.User as Model<IUser>) || model('User', UserSchema);

export default User;