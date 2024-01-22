import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

const signup = async(req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "All field are required"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.json("Signup susccessful")
        
    } catch (error) {
        next(error)
    }

}

export default signup;