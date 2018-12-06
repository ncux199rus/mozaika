//server metaData
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const router = express.Router();
// создаем парсер для данных в формате json
const jsonParser = express.json();

//app.use('/classes', express.static(__dirname + "/public/classes"));

//app.get('/login', express.static(__dirname + "/public/login"));

//app.use('/add', express.static(__dirname + "/add"));

//

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

//запись метаданных в каталог /classes
app.post('/', jsonParser, function(req, res, next){
    
    console.log("запись метаданных в каталог /classes");
    if(!req.body) return res.sendStatus(400);
    console.log("req.body = " ,req.body);
    var jsonCard = (req.body);

    var dir = __dirname + "/public/classes/" + req.body.nameClass;
    console.log("dir = ", dir);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    };

    
    if (next){
        console.log("error");
        return next(err);
    };
    
    var meta = req.body.cardMeta;
    fs.writeFileSync(dir + '/meta.json', meta);
    //fs.writeFile(dir + '/meta.json', jsonCard[2]);
});

//получение списка мета объектов
app.get("/classes", function(request, responce){
    console.log("получение списка мета объектов");
    var classes = [];
    function getObjectType(name){
        
        return new Promise((res, rej) =>{

            var path = dir + name;
            fs.stat(path, function(err, stats){                    
                //console.log(i, files[i]);
                if (err){
                    console.log("fs.stat error = ", err);
                    rej(err);;
                };
                
                if (stats.isFile()) {
                    //console.log(path, ' - file');
                    res('file');
                }
                if (stats.isDirectory()) {
                    //console.log(path, '- directory;', 'name - ', name);
                    classes.push(name);                    
                    res('directory');
                }                
            });            
        });
    };
    var dir = './public/classes/';
    fs.readdir(dir, function(err, files){
        if (err){
            
            console.log("fs.readdir error = ", err);
            return(1);
        };
        if (files){
            //console.log("fs.readdir files = ", files);            
            
            /*for (var i = 0; i < files.length; i++)
                promises.push(getObjectType(files[i]));
            */
            Promise.all(files.map(getObjectType))
                    .then(res => {
                        //console.log(res);                        
                        //console.log(classes);
                        classes = JSON.stringify(classes);
                        responce.send(classes);
                    })                    
                    .catch(rej => {
                        console.log('rej = ',rej);
                    });            
        }
    });
});

app.use('/', express.static(__dirname + "/public"));

app.use(function(err, req, res) {
    res.send('Ошибка!' + err.emssage);
    
});


app.listen(3000, function(){
    console.log("Started server node.js port: 3000");
});

//fs.console.dir();