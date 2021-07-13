const { pool } = require('../models/model');
const nodemailer = require('nodemailer');
const config = require("../config.json");


module.exports.addUser = async (req) => {
    try {
        console.log("Inside addUser service :");
        
        first_name   = req.body.first_name ? req.body.first_name.trim() : "";
        last_name    = req.body.last_name ? req.body.last_name.trim() : "";
        age          = req.body.age ? req.body.age : "";
        email        = req.body.email ? req.body.email.trim() : "";
        
        var sql = `INSERT INTO user(first_name,last_name,email,age)  VALUES (?,?,?,?)`;
       
        let response = await pool.query(sql, [first_name, last_name, email, age]);

       
        return true

    } catch (err) {
        console.log("Unexpected errors:", err);
        throw err;
    }


}


module.exports.sendMail =async(data) => {
    console.log("Inside sendMail",data)

    json= data ? data : {};
    console.log("json", typeof(json) )

     // Selecting user name for appending in Email

     let sql5 = `SELECT CONCAT(first_name, ' ', last_name) as userName FROM user WHERE email=?`;
     let  user = await pool.query(sql5, [json.email]);
     let user_name = user[0] ? user[0].userName:"";

    let mailOptions = {
      from: config.email_user,
      to: json.email ? json.email : "",
      subject: json.newsletter_name ? json.newsletter_name :"",
      text: json.newsletter_content ? `Hi ${user_name},  ${json.newsletter_content} `:""
    };

    let mailConfig = {
      service: 'gmail',
      auth: {
        user: config.email_user,
        pass: config.email_password
      },
      tls: {
          rejectUnauthorized: false
      }
    };
          nodemailer.createTransport(mailConfig).sendMail(mailOptions,async (err, info) => {
          if (err) {

            console.log("Email Sent failed: ",err )

                 let sql4 = `INSERT INTO failed_email_logs(email,newsletter_name) VALUES (?,?)`;
                 await pool.query(sql4, [json.email,json.newsletter_name ]);
       

            return;
          } else {
             console.log("Email Sent")

             let sql3 = `INSERT INTO success_email_logs(email,newsletter_name) VALUES (?,?)`;
           
              await pool.query(sql3, [json.email,json.newsletter_name ]);


            return true
          }
        });

    

     return;

}