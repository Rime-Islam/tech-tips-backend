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
      isVerified: { type: Boolean, default: false },
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"  }],
      following: [{  type: mongoose.Schema.Types.ObjectId, ref: "User"}],
      premium: {  type: Boolean, default: false },
      phone: { type: String, required: true },
      address: {  type: String  },
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