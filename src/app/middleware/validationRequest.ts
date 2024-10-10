import { AnyZodObject, Schema } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";



const validationRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync({
            body: req.body,
        });
        return next();
    });
};

export default validationRequest;