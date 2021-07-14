const { pool } = require('../models/model');
const nodemailer = require('nodemailer');
const config = require("../config.json");
const rabbitService = require("./rabbitService");

module.exports.addUser = async (req) => {
    try {
        console.log("Inside addUser service :");
        
        let first_name   = req.body.first_name ? req.body.first_name.trim() : "";
        let last_name    = req.body.last_name ? req.body.last_name.trim() : "";
        let age          = req.body.age ? req.body.age : "";
        let email        = req.body.email ? req.body.email.trim() : "";
        
        var sql = `INSERT INTO user(first_name,last_name,email,age)  VALUES (?,?,?,?)`;
       
         await pool.query(sql, [first_name, last_name, email, age]);

       
        return true

    } catch (err) {
        console.log("Unexpected errors:", err);
        throw err;
    }


}


module.exports.sendMail =async(data) => {
    console.log("Inside sendMail",data)

    const json= data ? data : {};


     // Selecting user name for appending in Email

     let  sql5 = `SELECT CONCAT(first_name, ' ', last_name) as userName FROM user WHERE email=?`;
     let  user = await pool.query(sql5, [json.email]);
     let  user_name = user[0] ? user[0].userName:"";

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

                 // push to  parking-lot-queue
                 await  rabbitService.addNewsletterToRabbitQueue(data, 'parking-lot-queue');
       

            return true;
          } else {
             console.log("Email Sent")

             let sql3 = `INSERT INTO success_email_logs(email,newsletter_name) VALUES (?,?)`;
           
              await pool.query(sql3, [json.email,json.newsletter_name ]);


            return true
          }
        });

    

     return true;

}