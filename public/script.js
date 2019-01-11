//для загрузки скриптов паралельно основному документу
//но исполнение после загрузки всей страницы        
window.addEventListener("load", function(event) {
  
});

///changePage main-card
var changePage = function(beforePage, afterPage){
    //console.log("beforePage = " ,beforePage);
    var before = document.getElementById(beforePage);
    //console.log("before = " ,before);
    before.classList.remove('visible');
    before.classList.add('unvisible');
    //console.log("before    = " ,before);

    //console.log("afterPage = " ,afterPage);
    var after = document.getElementById(afterPage);
    //console.log("after = " ,after);
    after.classList.remove('unvisible');
    after.classList.add('visible');
    //console.log("after     = " ,after);
};

// запись изменений в каталог метаданных
var postJSON = function(event){    
    console.log("postJSON");
    var objectFormData = {};
    //var metaName = document.getElementById('submitCard').getAttribute('ctl');
    var metaName = document.getElementById('inputHeadId').value;
    //var form = new FormData(document.forms.classCard);
    var form = new FormData(document.getElementById('cardId')); 
    // querySelector('form[name="nameCard"]')
    console.log("form", form);
    //form.append("icon", "icon.ico");//добавление пути иконки
    
    //разбор ключей формы для формирования названия файлов
    form.forEach(function(value, key){
        if (key.substr(0, 9) === 'textarea-'){
            var keyMod = key.replace("textarea-", "");
            console.log('keyMod = ', keyMod);
        }else{
            keyMod = key;
        }        
        objectFormData[keyMod] = value;
    });
    
    console.log('objectFormData = ', objectFormData);
    var formJson = JSON.stringify(objectFormData);
    console.log("formJson", formJson);
    
    fetch("/classes/" + metaName + '/json', {
        headers: { "Content-Type" : "application/json" },
        method: "POST",
        body: formJson
    })
    .then(function(res){
        if (res.status === 200){
            alert("Метаданные сохранены.");
            return 200;
        }
    });
};

//получение списка типов метаданных
//добавление списка объектов метаданных на главную страницу
function getListClasses(){
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/classes', true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if (xhr.readyState !==4) return;

        if (xhr.status !== 200){
            alert( xhr.status + ": " + xhr.statusText);
        }else{
            let newTbody = document.createElement('tbody');
            newTbody.setAttribute("id", "tbodyTableClass");
            tableClasses.appendChild(newTbody);
            
            a = JSON.parse(xhr.responseText);
            a.forEach(function(item, i, a){
                let newRow = document.createElement('tr');
                let newDataName = document.createElement('td');
                let newDataDesc = document.createElement('td');
                let newDataChange = document.createElement('td');
                
                newRow.setAttribute("class", "rowTableCard");
                newDataName.innerHTML = a[i];
                newRow.addEventListener("click", () => (getObjectClasses(newDataName.innerHTML)));
                
                newRow.appendChild(newDataName);
                newRow.appendChild(newDataDesc);
                newRow.appendChild(newDataChange);
                newTbody.appendChild(newRow);
                //tableClasses.appendChild(newRow);
                //console.log(a[i]);
            });
               
        };
    };
    
    fetch('/classes');
};