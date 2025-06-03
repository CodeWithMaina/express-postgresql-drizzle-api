import { email } from "zod/v4";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService, getUserByEmailService } from "./auth.service";
import {
  UserLoginValidator,
  UserValidator,
} from "../validation/user.validator";
import { sendNotificationEmail } from "../middleware/googleMailer";
import { getUserBiIdService } from "../users/user.service";

//Register Logic
export const createUser = async (req: Request, res: Response) => {
  try {
    //Implement Zod validation
    const validatedUser = UserValidator.safeParse(req.body);
    if (!validatedUser.success) {
      res.status(400).json({ error: validatedUser.error.issues });
      return;
    }

    const user = validatedUser.data; //assigning our user the validated data

    //Check if the user is available in the database
    const userEmail = user.email; //getting user email

    const existingUser = await getUserByEmailService(userEmail);
    if (existingUser) {
      res.status(400).json({ message: "User already existing in the system" });
    }

    // //generate hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    user.password = hashedPassword;

    const newUser = await createUserService(user);

    res.status(201).json({ message: newUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch user" });
  }
};

//Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    //using zod to validate our user body
    const validatedUser = UserLoginValidator.safeParse(req.body);
    if (!validatedUser.success) {
      res.status(400).json({ error: validatedUser.error.issues });
      return;
    }
    //setting our user to the validated data
    const user = validatedUser.data;


    const existingUser = await getUserByEmailService(user.email);
    if (!existingUser) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    //Comparing Password
    const isMatch = bcrypt.compareSync(user.password, existingUser.password);
    if (!isMatch) {
      res.status(404).json({ message: "Invalid Password" });
      return;
    }

    //Generating Web Token
    let payload = {
      userId: existingUser.userId,
      email: existingUser.email,
      // userType: user.userType,

      // expire
      exp: Math.floor(Date.now() / 1000) + 60 * 60, //token expires in an hour
    };

    let secret = process.env.JWT_SECRET as string;

    const token = jwt.sign(payload, secret);

    res.status(200).json({
      token,
      userId: existingUser.userId,
      email: existingUser.email,
      fullName: existingUser.fullName,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


