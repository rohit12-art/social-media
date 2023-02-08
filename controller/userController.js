const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')


const userRegister = async (req,res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(422).send("Please fill the form properly.");
    }
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(422).send("User already exist");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).send("User registration succesfully ");
    } catch (error) {
      return res.status(200).send("Unexpected Error .Please try again later");
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please fill the form correctly.");
    }
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        return res.status(400).json("No user found.");
      }
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        res.status(400).json("Invalid credentials");
      }
      let token = await jwt.sign(
        { email: existingUser.email, id: existingUser.id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).send({ message: "User Login sucessful", token });
    } catch (error) {
      res.status(400).json("Bad Request. Try again later");
    }
  };

  const forgetPassword = async(req,res) => {
    try {
       const email = req.body.email;
       const userData = await User.findOne({ email: email });
       if(userData) {
           const randomString = randomstring.generate();
           const data = await User.updateOne({email:email}, {$set:{token:randomString}});
           res.status(200).send({success:true, msg:"please check your inbox of mail and reset your password."})
       }else {
           res.status(200).send({success:true, msg:"This email does not exists."})
       }
    } catch (error) {
       
    }
 }



module.exports = {
    userRegister,
    userLogin,
    forgetPassword
}