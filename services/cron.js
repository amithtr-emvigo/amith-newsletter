var CronJob = require('cron').CronJob;
const userService = require("./userService");
const { pool } = require('../models/model');


new CronJob('* * * * *',async function () {
    // every minute
   
    let data= await userService.readDataFromQueue();

    console.log("cron reading data", data)
    await userService.sendMail(data);




}, null, true, "Asia/Kolkata");