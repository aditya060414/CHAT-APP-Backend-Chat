import type { NextFunction, Request, Response } from "express";

const TryCatch = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                success: false
            })
        }
    };
};

export default TryCatch;