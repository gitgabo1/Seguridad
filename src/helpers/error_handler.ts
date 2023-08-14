import { Request,Response, NextFunction } from "express";
export const error_handler=(err:Error,req: Request,res:Response,next:NextFunction)=>{
    if(err.name==="UnauthorizedError"){
        return res.status(401).json({message:"The user is not authorized"});

    }
    if (err.name==="ValidationError"){
        return res.status(401).json({message: err});
    }
    next()
    return res.status(500).json(err);
}
