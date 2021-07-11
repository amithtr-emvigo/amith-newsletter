const mysql     = require('mysql');
const util      = require('util');

const config = require("../config.json");


var pool = mysql.createPool({
     host: config.mysql_host
    ,port: config.mysql_port
    ,user: config.mysql_user
    ,password: config.mysql_password
    ,database: config.mysql_database
})

pool.query = util.promisify(pool.query);
pool.getConnection = util.promisify(pool.getConnection);

(async() =>{
    try{
      await pool.query('SELECT NOW() AS "Time"');
      console.log("Mysql Connected");
    }catch(err){
      console.log("Mysql Connection failed ! Check your mysql configurations on config.json", err);
    }
  })();

module.exports.pool = pool;




