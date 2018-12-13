
function getObjectClasses(metaName){
    //test promise
//    let promise = new Promise(function(res, rej){        
//        try {
//            json = JSON.parse(text);
//            res(json)
//            //changePage('main', 'card');
//        } catch(err) {
//            rej(err);
//        }   
//    });
//    promise.then(res => {//     
//    return sendJSON();//    
//    }).catch();
//    console.log('getObjectClasses function');
//    
    changePage('main', 'card');
    //sendJSON();
    
    console.log("testSetListClasses");
    catalogName = '/classes/' + metaName;    
    var itemPropertyCard = [];
    /*var xhr = new XMLHttpRequest();
    xhr.open('GET', catalogName, true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if (xhr.readyState !==4) return;
        
        if (xhr.status !=200){
            alert( req.status + ": " + req.statusText);
        }else{
            var listPropertyCard = JSON.parse(xhr.responseText);
            listPropertyCard.forEach((item) => {
                itemPropertyCard.push(item);                
            });                     
        }        
        console.log("itemPropertyCard = ", itemPropertyCard.length);
        return itemPropertyCard;
    }; 
    */
   //получение списка файлов по пути catalogName
    fetch(catalogName)
        .then(function(resolve){
            return resolve.json();            
            })
            
        .then(function(listPropertyCard){                
            Promise.all( listPropertyCard.map(getBodyDocument) )
                .then(function(result){
                    console.log("Promise all", result);
                    //создание объекта на странице
                    listPropertyCard.forEach(function(item, i){
                        //form.removeChild(textarea); //очистить форму при перезаписи
                        createElement(item);
                        
//                        newLabel = document.createElement("label");
//                        newTextArea = document.createElement("textarea");
//                        
//                        newTextArea.setAttribute("id", "textArea" + item);
                        //newTextArea.innerHTML = result[i];
                        document.getElementById("textArea" + item).innerHTML = result[i];
//                        newTextArea.setAttribute("rows", "3");
//                        newTextArea.setAttribute("cols", "80");
//                        newTextArea.setAttribute("class", "classTextarea");
//                        newTextArea.setAttribute("name", "textarea-" + item);
//                        
//                        newLabel.setAttribute("for", "textArea" + item);
//                        newLabel.innerHTML = item;
//                        newLabel.setAttribute("class", "classLabel");
                        //newLabel.setAttribute("name", "label-" + item);
                        
//                        cardId.appendChild(newLabel);
//                        cardId.appendChild(newTextArea);
                        
                        //добавление существующим элементам динамических свойств
                        document.getElementById('submitCard').setAttribute('ctl', metaName);
                        document.getElementById('submitCard').addEventListener('click', postJSON);
                        document.getElementById('cancelCard').addEventListener('click', function(){document.getElementById('cardId').innerHTML = ''; changePage('card', 'main');});                                             
                    });
                    
            });
        })                    
        .catch(alert);
    
    //получение содержимого документа 
    function getBodyDocument(item){
        //var prom = Promise(function(res, rej){
        
        var path = catalogName + '/' + item;
        
        return fetch(path)
            //получение содержимого файла
            .then(function(resolve){
                var text = resolve.text();
                //console.log('res1', text); 
                return text;
            });
    };       
            
    itemPropertyCard.forEach((item) => {
        //xhr.open('GET', catalogName + '/' + item, true);
        //xhr.send();
        console.log('catalogName + '/' + item)', catalogName + '/' + item);
    });
};

function createElement(item){
    var newLabel = document.createElement("label");
    var newTextArea = document.createElement("textarea");

    newTextArea.setAttribute("id", "textArea" + item);
    //newTextArea.innerHTML = result[i];
    newTextArea.setAttribute("rows", "3");
    newTextArea.setAttribute("cols", "80");
    newTextArea.setAttribute("class", "classTextarea");
    newTextArea.setAttribute("name", "textarea-" + item);

    newLabel.setAttribute("for", "textArea" + item);
    newLabel.innerHTML = item;
    newLabel.setAttribute("class", "classLabel");
    newLabel.setAttribute("name", "label-" + item);

    cardId.appendChild(newLabel);
    cardId.appendChild(newTextArea);
}