//server metaData
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
//const router = express.Router();
// создаем парсер для данных в формате json
const jsonParser = express.json();
const router = express.Router();

const multer = require('multer');
//app.use('/classes', express.static(__dirname + "/public/classes"));

//app.get('/login', express.static(__dirname + "/public/login"));

//app.use('/add', express.static(__dirname + "/add"));

//

//parser for data login-password
//const urlencodedParser = bodyParser.urlencoded({extended: false});
//app.use(bodyParser.urlencoded({ extended: false }));

//
app.post("/login", function(req, res, next){
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
app.post('/classes/:id', jsonParser, function(req, res, next){
    console.log("запись метаданных в каталог /classes");
    
    var metaName = 'public/classes/' + req.params.id;
    var body = req.body;
    console.log('metaName = ', metaName,"\nreq.body classes = " ,req.body);
    if (!fs.existsSync(metaName)){
        fs.mkdirSync(metaName);
    }
    
    for (var key in body){
        let fileName = metaName + '/' + key;
        console.log('fileName', fileName)  ;
        writeFileClasses(fileName, body[key]);
    }
});

const storage = multer.diskStorage({
    //fileFilter - not working!!!!!!!!
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg') {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    },
    destination: function (req, file, cb) {
        var metaName = 'public/classes/' + req.params.id + '/' + req.params.ico;
        cb(null, __dirname + '/' + metaName) //Здесь указывается путь для сохранения файлов
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

//сохранение изменений иконки
app.post('/classes/:id/:ico', upload.any(), function(req, res){
    console.log("сохранение изменений иконки req = ", req.files);
    //var id = app.params.id;
    //var ico = app.params.ico;
    
    res.send(req.rawHeaders);
});

function writeFileClasses(fileName, fileBody){      
    return new Promise(function(resolve, reject){
        if (!fileName){
            reject(new Error('Not fileName'));
        }else if (!fileBody){
            reject(new Error('Not fileBody'));
        }else{            
        fs.writeFileSync(fileName, fileBody);        
        resolve('fileName create');
        }
    });
};
//запись метаданных в каталог 
//не используется!!!!!!!!!!!!!!
app.post('/', jsonParser , function(req, res, next){
    console.log("req.body = " ,req.body);
    console.log("запись метаданных в каталог старое");
    
    if(!req.body || !Object.keys(req.body).length) 
        return next(new Error('Empty body'));    
    
    var jsonCard = req.body;
    var keyCard = [];
    //for (var key in jsonCard){
    //    keyCard.push(key);
        ////keyCard.shift(); //удаляем первый элемент т.к. он каталог
        
    //};
    console.log("jsonCard", jsonCard);
    console.log("keyCard", keyCard);
    
    var fileListCard = ['/description.txt', '/meta.json', '/index.html', '/main.css', '/icon.ico'];
    var home = '/public/classes/';
    
    var dir = __dirname + home + req.body.nameClass;
    
    console.log("dir = ", home+jsonCard.nameClass);
    
    if (keyCard.length - 1 === fileListCard.length){
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        };
//        if (!fs.existsSync(dir)){
//            fs.mkdirSync(dir);
//        };
        for (var i = 0; i < fileListCard.length; i++){
            var objName = jsonCard[keyCard[i+1]];
            console.log(fileListCard[i], objName);
            fs.writeFileSync(dir + fileListCard[i], objName);
        };
    };    
});

//получение списка файлов или каталогов
function getObjectType(name, dir, classes, file){
    //var dir = './public/classes/';    
        return new Promise((res, rej) =>{

            var path = dir + name;
            fs.stat(path, function(err, stats){                    
                //console.log(i, files[i]);
                if (err){
                    console.log("fs.stat error = ", err);
                    rej(err);;
                };
                
                if (stats.isFile()) {
                    file.push(name);
                    res('file');
                }
                if (stats.isDirectory()) {
                    //console.log(path, '- directory;', 'name - ', name);
                    classes.push(name);                    
                    res('directory');
                }
                res(stats.isFile ? 'file' : 'directory');
            });            
        });
};

//получение списка мета объектов
app.get("/classes", function(request, responce){
    console.log("получение списка мета объектов");    
    var classes = [];
    var file = [];
    var dir = './public/classes/'; 
    fs.readdir(dir, function(err, files){
        if (err){
            
            console.log("fs.readdir error = ", err);
            return(1);
        };
        if (files){
            
            Promise.all(files.map(name => getObjectType(name, dir, classes, file)))
                    .then(res => {
                        //console.log("file = ", file);
                        
                        classes = JSON.stringify(classes);
                        responce.send(classes);
                    })                    
                    .catch(rej => {
                        console.log('rej = ',rej);
                    });  
        }
    });
});


//маршрутизация в каталоге classes
app.get('/classes/:id', function (req, response, next) {

    console.log('маршрутизация в каталоге classes id = ', req.params.id);
    var classes = [];
    var file = [];
    var dir = './public/classes/' + req.params.id + '/';
    fs.readdir(dir, function(err, files){
        if (err)    
            return next(err); 
        
        if (files){
            Promise.all(files.map(name => getObjectType(name, dir, classes, file)))
                .then(res => {
                    //file = JSON.stringify(file);
                    console.log(file);
                    response.send(file);
                })
                .catch(next);
            return;        
        }
        
        if (isD)
            response.send([]);        
        return next(new Error('Unknown type'));
    });
});



//подклюсение /public как каталога по умолчанию
app.use('/', express.static(__dirname + "/public"));

app.use(function (err, req, res, next) {
    console.error(req.url, ' ', err);
    res.status(500).send('Ошибка!' + err.message);
    
});


app.listen(3000, function(){
    console.log("Started server node.js port: 3000");
});

//fs.console.dir();