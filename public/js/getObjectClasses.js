//получение данных объекта
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
                    sreateHeadCard(metaName, 0); 
                    listPropertyCard.forEach(function(item, i){
                        //form.removeChild(textarea); //очистить форму при перезаписи
                        createElement(item);
                        
                        document.getElementById("textArea" + item).innerHTML = result[i];
//                       
                        //добавление существующим элементам динамических свойств
                        });
                    createNavCard(metaName);
//                    document.getElementById('submitCard').setAttribute('ctl', metaName);
//                    document.getElementById('submitCard').addEventListener('click', postJSON);
//                    document.getElementById('cancelCard').addEventListener('click', function(){document.getElementById('cardId').innerHTML = ''; changePage('card', 'main');});                    
                    addPic();
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

//создание нового тестового поля
function createElement(item){
    var newLabel = document.createElement("label");
    var newTextArea = document.createElement("textarea");
    
    newTextArea.setAttribute("id", "textArea" + item);    
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
};

//создание заголовка карточки
//0 - готовая карточка
//1 - создание карточки
function sreateHeadCard(item, num){    
    var newInput = document.createElement("input");
    var inputId = "inputHeadId";
    
    if (+num === 0){
        newInput.setAttribute("disabled", "disabled");
        newInput.setAttribute("value", item);
        newInput.setAttribute("id", inputId);
        cardId.appendChild(newInput); 
        return inputId;
    }
    else if (+num === 1){
        newInput.setAttribute("placeHolder", item);        
        newInput.setAttribute("id", inputId);
        cardId.appendChild(newInput); 
        return inputId;
    }  
}

//создание общих элементов управления
function createNavCard(metaName){
    document.getElementById('submitCard').setAttribute('ctl', metaName);
    document.getElementById('submitCard').addEventListener('click', postJSON);
    document.getElementById('cancelCard').addEventListener('click', function(){document.getElementById('cardId').innerHTML = ''; changePage('card', 'main');});                    
}

//создание меню управления иконкой
function addPic(){
    var newPic = document.createElement("img");
    var newInput = document.createElement("input");
    var newSubmit = document.createElement("input");
    var newForm = document.createElement("form");
    var newButton = document.createElement("button")
    
    newForm.setAttribute("method", "POST");
    newForm.setAttribute("enctype", "multypart/form-data");
    
    
    newPic.setAttribute("src", "hypnoFrog.png");
    newPic.setAttribute("alt", "иконка");
    newPic.setAttribute("id", "imgId");
    newPic.setAttribute("width", "100px");
    
    newInput.innerHTML = "Выбрать картинку";
    newInput.setAttribute("value", "Выбрать картинку");
    newInput.setAttribute("type", "file");
    newInput.setAttribute("id", "changePicInput");
    newInput.setAttribute("name", "fileName");
    newInput.setAttribute("accept", "image/*");
    newInput.setAttribute("onchange", "onImageChange()");
    
    newButton.innerHTML = "save Ico";
    //newButton.addEventListener("click", submitIco);
    
    newSubmit.setAttribute("value", "Сохранить картинку");
    newSubmit.setAttribute("type", "submit");
    
    //newForm.appendChild(newInput);    
    //newForm.appendChild(newSubmit);
    
    card.appendChild(newPic);    
    //card.appendChild(newForm);
    card.appendChild(newButton);
    card.appendChild(newInput);
    card.appendChild(newSubmit);
}

//отправка иеонки на сервер
function submitIco(){
    var file = document.getElementById("changePicInput").files[0];
                var formData = new FormData();
                formData.append('picture', file);

                fetch('/ico', {
                        method: 'POST',
                        body: formData
                    });
};

//функция отображения иконки
function onImageChange(){
                var reader = new FileReader();
                console.log('reader', reader);

                var img = document.getElementById('imgId');
                console.log('onImageChange img1 = ', img);
                var file = document.getElementById("changePicInput").files[0];
                console.log('file = ', file);

                reader.onloadend = function(){
                    img.src = reader.result;
                    console.log('img1.src', img.src);
                };

                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    img.src = "";
                }
};