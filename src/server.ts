import express, { Application, Response } from "express";
import dotenv from "dotenv"
import { logger } from "./middleware/logger";
import { userRouter } from "./users/user.route";
import { stateRouter } from "./state/state.route";
import { cityRouter } from "./city/city.route";
import { authRouter } from "./auth/auth.route";
import { rateLimiterMiddleware } from "./middleware/rateLimiter";
 
dotenv.config()
 
const app:Application = express()
 
const PORT = process.env.PORT || 5000
 
 
//Basic MIddleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger);
app.use(rateLimiterMiddleware);
 
//default route
app.get('/',(req,res:Response)=>{
    res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL")
})

//import routes
app.use('/', userRouter);
app.use('/', stateRouter);
app.use('/', cityRouter);
app.use('/', authRouter);
 
//Start server
 
app.listen(PORT,()=>{
    console.log(` Server running on http://localhost:${PORT}`);
})
 