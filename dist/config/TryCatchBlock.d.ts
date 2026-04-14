import type { NextFunction, Request, Response } from "express";
declare const TryCatch: (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default TryCatch;
//# sourceMappingURL=TryCatchBlock.d.ts.map