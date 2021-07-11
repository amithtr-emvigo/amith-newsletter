var userService = require("../services/userService");

//Add user
module.exports.addNewUser = async (req, res) => {
  console.log("Inside addNewUser:", req.body)
  try {

      if(req.body.first_name.trim() && req.body.email.trim()){
        await userService.addUser(req);
        msg = "User Added Successfully";
        return res.status(201).json({ success: true, message: msg, data: {} });
        
      }else{
        msg = "First Name and Email are required";
        return res.status(400).json({ success: true, message: msg, data: {} });
      }    
   
  } catch (err) {
    msg = "Sorry ! User Adding Failed!";
    return res.status(500).json({ success: false, message: msg, data: err });
  }
};