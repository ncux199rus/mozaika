/* global fetch, card */

//получение данных объекта
function getObjectClasses(metaName){
    changePage('main', 'card');    
    
    console.log("testSetListClasses, metaname = ", metaName);
    catalogName = '/classes/' + metaName;    
    var itemPropertyCard = [];
    
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
                    
                    //создание меню навигации по карточке
                    createNavCard(metaName);
                    //создание шапки карточки
                    sreateHeadCard(metaName, 0); 
                    //создание и наполнеине textarea
                    listPropertyCard.forEach(function(item, i){
                        //form.removeChild(textarea); //очистить форму при перезаписи
                        createElement(item);
                        
                        document.getElementById("textArea" + item).innerHTML = result[i];
//                       
                        //добавление существующим элементам динамических свойств
                    });
                    
                    //создание иконки
                    addPic(catalogName);
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
        /*    
    itemPropertyCard.forEach((item) => {
        //xhr.open('GET', catalogName + '/' + item, true);
        //xhr.send();
        console.log('catalogName + "/" + item)', catalogName + '/' + item);
    });*/
};

//создание общих элементов управления
function createNavCard(metaName){
    //создание навигации по карте метаданных
    let navMenu = document.createElement('div');
    navMenu.setAttribute("id", "navMenu");
    let navUl = document.createElement('ul');
    navUl.setAttribute('id', "navUl");
    navMenu.appendChild(navUl);
    cardId.appendChild(navMenu);
    
    //
    document.getElementById('submitCard').setAttribute('ctl', metaName);
    document.getElementById('submitCard').addEventListener('click', postJSON);
    document.getElementById('cancelCard').addEventListener('click', exitCard);
};

//создание нового тестового поля
function createElement(item){
    var newLabel = document.createElement("label");
    var newTextArea = document.createElement("textarea");
    let newButton = document.createElement("button");
    let newFieldSet = document.createElement("fieldset");
    let newLegend = document.createElement("legend");
    let navLi = document.createElement('li');
    
    newTextArea.setAttribute("id", "textArea" + item);    
    newTextArea.setAttribute("rows", "3");
    newTextArea.setAttribute("cols", "80");
    newTextArea.setAttribute("class", "classTextarea");
    newTextArea.setAttribute("name", "textarea-" + item);

    newLabel.setAttribute("for", "textArea" + item);
    newLabel.innerHTML = item;
    newLabel.setAttribute("class", "classLabel");
    newLabel.setAttribute("name", "label-" + item);
    
    newButton.innerHTML = "del";
    newButton.setAttribute("value", item);
    newButton.setAttribute("type", "button");
    
    newLegend.innerHTML = item;
    
    navLi.setAttribute("id", item);
    navLi.innerHTML = item;
    navLi.addEventListener("click", function(event) {choiseFile(item)});
    navUl.appendChild(navLi);
    
    newButton.addEventListener("click", (event) => {
        event.stopImmediatePropagation();
        var dir = document.getElementById("inputHeadId").value;
        var file = newButton.getAttribute("value");
        delOjectMetaData('file', dir + '/' + file);
    });
    
    newFieldSet.setAttribute("class", "navContent");
    newFieldSet.setAttribute("class", "unvisible");
    newFieldSet.setAttribute('id', item);
    
    
    newFieldSet.appendChild(newLabel);
    newFieldSet.appendChild(newTextArea);
    newFieldSet.appendChild(newButton);
    newFieldSet.appendChild(newLegend);
    cardId.appendChild(newFieldSet);
};

function choiseFile(item){
    console.log("choiseFile");
    let element = document.querySelectorAll('.classCard .navContent');
    for (var i = 0; i < element.length; i++){
        console.log('element =',  element[i]);
        element[i].classList.add("unvisible");
    }

    let current = document.querySelectorAll(".classCard #" + item);
    for (var i = 0; i < current.length; i++){
        console.log('element =',  current[i]);
        current[i].classList.remove("unvisible");
    }    
    
    let li = document.querySelectorAll('#navMenu #' + item);
    for (var i = 0; i < li.length; i++){
        console.log('element =',  li[i]);
        li[i].classList.add("buttonAdd");
    } 
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

//обновление или смена экрана
function exitCard(){
    //очистка экрана карточи метаданных
    clearCard();
    /*
    //очистка мета данных
    document.getElementById('cardId').innerHTML = ''; 
    
    //удаление кнопок навигации
    var parent = document.getElementById('card');
    var child = document.getElementById('picIcoId');
    parent.removeChild(child);
    */
    //смена экранов
    changePage('card', 'main');
    
    //очистка таблицы с карточками метаданных
    clearBodyTables();
    //let table = document.getElementById("tableClasses");
    //let tbody = document.getElementById("tbodyTableClass");
    //table.removeChild(tbody);
    
    //получение таблицы с карточками метаданных
    getListClasses();
};

//очистка экрана карточи метаданных
function clearCard(){
    //очистка мета данных
    document.getElementById('cardId').innerHTML = ''; 
    
    //удаление кнопок навигации
    var parent = document.getElementById('card');
    var child = document.getElementById('picIcoId');
    parent.removeChild(child);
}

//очистка тела таблицы со списком мета каталогов
function clearBodyTables(){
    //очистка таблицы с карточками метаданных
    let table = document.getElementById("tableClasses");
    let tbody = document.getElementById("tbodyTableClass");
    table.removeChild(tbody);
};

//создание меню управления иконкой
function addPic(catalogName) {
    var newPic = document.createElement("img");
    var newInput = document.createElement("input");
    var newSubmit = document.createElement("input");
    //var newForm = document.createElement("form");
    var newSect = document.createElement("section");
    var newButton = document.createElement("button");
    
    newSect.setAttribute("id", "picIcoId");
    
    //let pathIcon = catalogName + "/icon.png";    
    //newPic.setAttribute("src", catalogName + "/icon.png");    
    //newPic.onerror = function(){newPic.setAttribute("src", "default.png");};
    if (!catalogName){
        newPic.setAttribute("src", "default.png");
    }else{
        let pathIcon = catalogName + "/icon.png";    
        newPic.setAttribute("src", catalogName + "/icon.png");
    }
    
    newPic.setAttribute("alt", "иконка");
    newPic.setAttribute("id", "imgId");
    newPic.setAttribute("width", "100px");
    
    newInput.innerHTML = "Выбрать картинку";
    newInput.setAttribute("value", "Выбрать картинку");
    newInput.setAttribute("type", "file");
    newInput.setAttribute("id", "changePicInput");
    newInput.setAttribute("name", "fileName");
    newInput.setAttribute("accept", "image/png");
    newInput.setAttribute("onchange", "onImageChange()");
    
    newButton.innerHTML = "save Ico";
    newButton.addEventListener("click", submitIco);
    
    newSubmit.setAttribute("value", "Сохранить картинку");
    newSubmit.setAttribute("type", "submit");
    
    newSect.appendChild(newInput);    
    //newForm.appendChild(newSubmit);
    newSect.appendChild(newPic);        
    newSect.appendChild(newButton);
    
    card.appendChild(newSect);
    
    
    //заполенение иконки, если существует
    var path = document.getElementById("inputHeadId").value;
    //if (!file){
    //    path = '/classes/' + path + '/ico/';
    //}
    
}

//отправка иконки на сервер
function submitIco(){
    var path = document.getElementById("inputHeadId").value;
    
    path = '/classes/' + path + '/png';
    console.log("path = ", path);
    
    var file = document.getElementById("changePicInput").files[0];
    console.log("file = ", file);
    var formData = new FormData();
    formData.append('picture', file, 'icon.png');

    fetch(path, {
        method: 'POST',
        body: formData
    })
            .then(response => {
                if (response.status === 200){
                    alert("Icon save!");
                }else{
                    alert(response);
                }
    });
};

//функция отображения иконки
function onImageChange(){
    var reader = new FileReader();
    console.log('reader', reader);

    var img = document.getElementById('imgId');
    //console.log('onImageChange img1 = ', img);
    var file = document.getElementById("changePicInput").files[0];
    //console.log('file = ', file);

    reader.onloadend = function(){
        img.src = reader.result;
        //console.log('img1.src', img.src);
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        img.src = "";
    }
};