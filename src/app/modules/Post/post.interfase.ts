import { Types } from "mongoose";

export type TVote = {
    user: Types.ObjectId;
}

export type TComment = {
    _id?: any;
    user: Types.ObjectId;
    comment: string;
}

export type TPost = {
    _id?: string;  
    title: string;  
    content: string;  
    user: Types.ObjectId; 
    images?: string;  
    category: string;  
    tags?: string[];  
    isPremium?: boolean;  
    description: string;  
    upvotesCount?: number; 
    upvotedUsers?: Types.ObjectId; 
    comments?: TComment[];  
}