import mongoose, { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interfase";
import { user_role } from "./user.constant";
import bcryptjs from "bcryptjs";
import config from "../../config";


const UserSchema = new Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: {  type: String, required: true },
      profilePicture: { type: String },
      bio: { type: String },
      role: { type: String, enum: Object.keys(user_role), default: "user" },
      status: { type: String },
      isDelete: { type: Boolean, default: false },
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"  }],
      following: [{  type: mongoose.Schema.Types.ObjectId, ref: "User"}],
      premium: {  type: Boolean, default: false },
      phone: { type: String,},
      address: {  type: String  },
      transactionId: {  type: String },
    },
    {
      timestamps: true, 
    }
  );

  UserSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcryptjs.hash(
      user.password,
      Number(config.bcrypt_salt_round)
    );
    next();
  });

  UserSchema.post("save", async function (doc, next) {
    doc.password = "";
    next();
  });

  UserSchema.statics.updatePassword = async function (id: string, password: string) {
    const hashedPassword = await bcryptjs.hash(password, Number(config.bcrypt_salt_round));
  
    return await this.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    ).select("+password");
  };
  
  UserSchema.statics.isUserExistByCustomerId = async function (email: string) {
    return await User.findOne({ email }).select("+password");
  };

  UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashTextPassword
  ) {
    return await bcryptjs.compare(plainTextPassword, hashTextPassword);
  };

  export const User = model<IUser, UserModel>("User", UserSchema);