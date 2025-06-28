import { NextFunction, Request, Response } from "express";
import { Limiter } from "../utils/upstash";

const normalLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    if (!ip) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { success } = await Limiter.limit(ip);
    if (!success) {
        return res.status(429).json({ message: "Too many requests" });
    }
    return next();
}

export { normalLimiterMiddleware };
