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


module.exports.addNewsletterToQueue = async (json_data) => {
    try {
        console.log("Inside addNewsletterToQueue");
        for(i=0; i<json_data.length ;i++){

            console.log(json_data[i])

             data= JSON.stringify(json_data[i]);
             sql = `INSERT INTO email_queue(data) VALUES (?)`;
       
            response = await pool.query(sql, [data]);

        }
      
        return true

    } catch (err) {
        console.log("Unexpected errors:", err);
        throw err;
    }

}


module.exports.addNewsletterToQueue = async (json_data) => {
    try {
        console.log("Inside addNewsletterToQueue ");
        for(i=0; i<json_data.length ;i++){

            console.log(json_data[i])
            //Todo: code to add this data to queue
             data= JSON.stringify(json_data[i]);
             sql = `INSERT INTO email_queue(data) VALUES (?)`;
       
            response = await pool.query(sql, [data]);

        }
      
        return true

    } catch (err) {
        console.log("Unexpected errors:", err);
        throw err;
    }

}

module.exports.readDataFromQueue = async () => {
    try {
        console.log("Inside readDataFromQueue");
       
            sql = `SELECT * from email_queue`;
       
            response = await pool.query(sql, []);

        return response

    } catch (err) {
        console.log("Unexpected errors:", err);
        throw err;
    }

}



module.exports.sendMail =async(data) => {
    console.log("Inside sendMail",data)

    let json= data[0] ? JSON.parse(data[0].data) : {};
    let queue_id= data[0] ? data[0].queue_id : 0;

     // Selecting user name for appending in Email

     let sql5 = `SELECT CONCAT(first_name, ' ', last_name) as userName FROM user WHERE email=?`;
     let  user = await pool.query(sql5, [json.email]);
     let user_name = user[0] ? user[0].userName:"";

    let mailOptions = {
      from: config.email_user,
      to: json.email ? json.email :"",
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
    if(queue_id){
      nodemailer.createTransport(mailConfig).sendMail(mailOptions,async (err, info) => {
      if (err) {

        console.log("Email Sent failed: ",err )
        // if email sent failed update retry count 
        let sql0 = `UPDATE email_queue SET remaining_try_count = remaining_try_count-1 WHERE queue_id=?`;
        await pool.query(sql0, [queue_id]);

         sql1 = `SELECT remaining_try_count FROM email_queue WHERE queue_id=?`;
         let  rem= await pool.query(sql1, [queue_id]);
         
         let remaining_try_count = rem[0] ? rem[0].remaining_try_count : 0;
         
         // If 3 tries are failed delete from queue and inserted to failed log
         if(rem[0] &&  remaining_try_count == 0 ){
             let sql2 = `DELETE FROM email_queue WHERE queue_id=?`;
             await pool.query(sql2, [queue_id]);

             let sql4 = `INSERT INTO failed_email_logs(email,newsletter_name) VALUES (?,?)`;
             await pool.query(sql4, [json.email,json.newsletter_name ]);
         }

        return;
      } else {
         console.log("Email Sent")

         // if email success delete from queue and inserted to success log
         let sql = `DELETE FROM email_queue WHERE queue_id=?`;
         await pool.query(sql, [queue_id]);

         let sql3 = `INSERT INTO success_email_logs(email,newsletter_name) VALUES (?,?)`;
       
          await pool.query(sql3, [json.email,json.newsletter_name ]);


        return true
      }
    });
    }

     

     return;

}