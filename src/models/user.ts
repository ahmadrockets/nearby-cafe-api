import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    photo: string;
}

const UserSchema = new Schema<IUser>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
},{
    collection: 'users',
});

export default mongoose.model<IUser>('User', UserSchema);