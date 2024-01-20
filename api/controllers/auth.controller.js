import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

const signup = async(req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === "" || email === "" || password === "") {
        return res.status(401).json({message: "All field are required"});
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
        res.status.json({message: error.message})
    }

}

export default signup;