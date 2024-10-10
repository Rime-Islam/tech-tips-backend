import mongoose, { Model } from "mongoose";
import { user_role } from "./user.constant";


export type TUser_role = keyof typeof user_role;

export interface IUser {              
    name: string;                
    email: string;               
    password: string;           
    profilePicture?: string;    
    bio?: string;                
    role?: TUser_role;     
    isVerified?: boolean;        
    followers?: mongoose.Types.ObjectId[];        
    following?: mongoose.Types.ObjectId[];                  
    premium?: boolean;
    phone: string;
    address?: string;           
  }
  
 export interface TUserDocument extends IUser, Document {
    role: any;
 }

 export interface UserModel extends Model<TUserDocument> {
    isUserExistByCustomerId(email: string): Promise<TUserDocument>;
    isPasswordMatched(
        plainTextPassword: string,
        hashTextPassword: string
    ): Promise<boolean>;
 }