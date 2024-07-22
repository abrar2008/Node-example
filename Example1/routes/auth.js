const router = require("express").Router();
const User = require("../models/User");
const user = require("../models/User");
const bycrpt = require("bcrypt");



// Register
router.post("/register", async (req,res) => {

try{

    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password,salt);
   
   
    const newuser = await new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
       
      });

  const user = await newuser.save();
  res.status(200).json(user);

}
catch(err){
    res.status(500).json(err)
}
});


//login 

router.post("/login" , async (req,res) =>{
    try{
        const user =  await User.findOne({email :req.body.email});
    !user && res.status(404).json("user not found ");


const validpassword = await bycrpt.compare(req.body.password, user.password)
!validpassword && res.status(400).json("wrong password")

res.status(200).json(user)


    }catch(err){
        res.status(500).json(err)
    }
});




module.exports = router;