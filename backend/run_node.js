var express = require('express');
var cors = require('cors')
const {coneectDatabase} = require('./database/database');
const {postReq,postRes} = require('./src/controllers/paymentController');
var dotenv = require('dotenv')
dotenv.config({path:"./config/.env"})
var app = express();
app.use(express.json());
app.use(cors({origin:'*'}));


app.use(express.static('public'));
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);


app.get('/', function (req, res){
    	res.render('payment.html');
});

app.post('/payment', postReq);


app.post('/ccavResponseHandler',postRes)
// // connect database
coneectDatabase()
app.listen(3000, ()=> console.log(`server is running`));
