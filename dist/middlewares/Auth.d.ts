import type { Request, Response, NextFunction } from "express";
interface IUser extends Document {
    _id: string;
    name: string;
    mail: string;
}
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const Auth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=Auth.d.ts.map