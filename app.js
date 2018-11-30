//server metaData
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const router = express.Router();
// создаем парсер для данных в формате json
const jsonParser = express.json();

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

app.post('/', jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    console.log("req.body = " ,req.body);
    var jsonCard = (req.body);
    
    var dir = __dirname + "\\" + req.body.nameClass;
    console.log(dir);
    if (!fs.existsSync(dir)){ 
        fs.mkdirSync(dir);
    };
    
    var meta = req.body.cardMeta;
    fs.writeFileSync(dir + '\meta.json', meta);
    //fs.writeFile(dir + '/meta.json', jsonCard[2]);
    
    
   
    
});

app.listen(3000, function(){
    console.log("Started server node.js port: 3000");
});
//