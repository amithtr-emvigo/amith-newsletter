const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const fileupload = require("express-fileupload");


const port = 3000;


const user    = require('./routes/user.js');



app.use(bodyParser.urlencoded({limit: '10mb', extended: false, parameterLimit: 10000 }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(fileupload());



app.get('/', (req, res) => {
  res.send('API Server is Running')
})

app.use('/user/', user);


app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})