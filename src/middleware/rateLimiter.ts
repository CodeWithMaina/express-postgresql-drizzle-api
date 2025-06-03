import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";
import { duration } from "drizzle-orm/gel-core";

//Defining options
const rateLimiter = new RateLimiterMemory({
    points: 10,//number of hits per endpoints
    duration: 60//Per second
});

export const rateLimiterMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    try {
        await rateLimiter.consume(req.ip || "unknown");
        console.log(`Rate Limit Check Passed For IP: ${req.ip}`);
    } catch (error) {
        res.status(429).json({error: "Too Many Request Please Try Again Later"});
    }
};