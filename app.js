//server metaData
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

app.use('/classes', express.static(__dirname + "/public/classes"));

app.use('/login', express.static(__dirname + "/public/login"));

app.use('/add', express.static(__dirname + "/add"));

app.use('/', express.static(__dirname + "/public"));

//parser for data login-password
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post("/login", urlencodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    console.log("req.body login = " ,req.body);
    fs.appendFile("log.txt", '\n'+`${req.body.userLogin} - ${req.body.userPassword}`, function(error){
        if(error) throw error;
        //console.log("Запись в файл завершена");
        let data = fs.readFileSync("log.txt", "utf8");
        //console.log(data);
    });
    res.send(`${req.body.userLogin} - ${req.body.userPassword}`);
});

app.post('/', urlencodedParser, function(req, res){
    //if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    
    JSON.parse(req.body);
    
    //console.log(jsonParse.nameClass);

    //console.log(jsonParse.result);
    //res.send("console.log(res.send)");
    
});

app.listen(3000, function(){
    console.log("Started server node.js port: 3000");
});