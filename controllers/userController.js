var userService = require("../services/userService");
const util          = require('util');
var xlstojson       = require("xls-to-json-lc");
xlstojson           = util.promisify(xlstojson);
var xlsxtojson      = require("xlsx-to-json-lc");
xlsxtojson          = util.promisify(xlsxtojson);


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



//upload News Letter
module.exports.uploadNewsLetter = async (req, res) => {
  console.log("Inside uploadNewsLetter")
  try {

      if(req.files.csv_file){
     
        let file= req.files.csv_file;
        let uploadPath = __dirname + '/uploads/' + req.files.csv_file.name

        
          await file.mv(uploadPath)

          if(uploadPath.split('.')[uploadPath.split('.').length-1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
        
          let json_data  = await exceltojson({input: uploadPath, output: null, lowerCaseHeaders:true})

          await userService.addNewsletterToQueue(json_data);

           msg = "news Letter Uploaded Successfully";
           return res.status(201).json({ success: true, message: msg, data: {} });
      
        
        
      }else{
        msg = "File required";
        return res.status(400).json({ success: true, message: msg, data: {} });
      }    
   
  } catch (err) {
    console.log(err)
    msg = "Sorry ! uploadNewsLetter Failed!";
    return res.status(500).json({ success: false, message: msg, data: err });
  }
};