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

app.get('/login', express.static(__dirname + "/public/login"));

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

    var dir = __dirname + "/public/classes/" + req.body.nameClass;
    console.log("dir = ", dir);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    };

    var meta = req.body.cardMeta;
    fs.writeFileSync(dir + '/meta.json', meta);
    //fs.writeFile(dir + '/meta.json', jsonCard[2]);
});

//получение списка мета объектов
//app.get("/classes", function(req, res){

    var promise = new Promise((res, rej) =>{
        res(0);
        rej(1);
    });
    var dir = './public/classes/';
    fs.readdir(dir, function(err, files){
        if (err){
            console.log("fs.readdir error = ", err);
            return(1);
        };
        if (files){
            console.log("fs.readdir files = ", files);
            
            
            for (var i = 0; i < files.length; i++){
                
                var path = files[i];
                console.log('path = ', path);                
                
                fs.stat(dir + files[i], function(err, stats){                    
                    console.log(i, files[i]);
                    if (err){
                        console.log("fs.stat error = ", err);
                        return(1);
                    };
                    if (stats.isFile()) {
                        console.log('    file');
                    }
                    if (stats.isDirectory()) {
                        console.log(dir + path, '    directory');
                        
                    }
                    /*
                    if (stats){
                        
                        console.log("fs.stat = ", stats);
                    } 
                    */
                });                
            }
        }
    });
//})


app.listen(3000, function(){
    console.log("Started server node.js port: 3000");
});
//fs.console.dir();