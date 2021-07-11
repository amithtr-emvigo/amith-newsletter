const { pool } = require('../models/model');


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