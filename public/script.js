//changePage main-card
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

//json to server from card
var sendJSON = function (){
    //console.log("sendJSON");
    var a = {};
    var req = new XMLHttpRequest();
    req.open('GET', "test.json", true);
    req.send();
    req.onreadystatechange = function(){
        if (req.readyState !==4) return;

        if (req.status !== 200){
            alert( req.status + ": " + req.statusText);
        } else {
            a = JSON.parse(req.responseText);
            //console.log("a = ", a);
            for (var keyJSON in a){
                for (var i in a[keyJSON]){
                    //console.log("Ключ i: " + i + " значение: " + a[keyJSON][i] );
                    document.getElementById(i).value = a[keyJSON][i];
                }
                //console.log("Ключ: " + keyJSON + " значение: " + a[keyJSON] );
            }
            //document.getElementById("nameClass").value = a["cardMeta"];
            //meta.value += req.responseText;
        }
    };
};

// запись изменений в тип метаданных
var postJSON = function(){
    console.log("postJSON");
    var objectFormData = {};

    var formData = new FormData(document.forms.postCard);
    formData.append("icon", "icon.ico");//добавление пути иконки
    formData.forEach(function(value, key){
        objectFormData[key] = value;
    });
    var formJson = JSON.stringify(objectFormData);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(formJson);
};

//получение списка типов метаданных
function getListClasses(){
    console.log("getListClasses");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/classes', true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if (xhr.readyState !==4) return;

        if (xhr.status !== 200){
            alert( xhr.status + ": " + xhr.statusText);
        }else{
            a = JSON.parse(xhr.responseText);
            a.forEach(function(item, i, a){
                let newRow = document.createElement('tr');
                let newDataName = document.createElement('td');
                let newDataDesc = document.createElement('td');
                let newDataChange = document.createElement('td');
                newDataName.innerHTML = a[i];
                newRow.addEventListener("click", getObjectClasses);
                console.log("newDataName.value = ", newDataName.innerHTML);
                newRow.appendChild(newDataName);
                newRow.appendChild(newDataDesc);
                newRow.appendChild(newDataChange);
                tableClasses.appendChild(newRow);
                console.log(a[i]);
            });
               
        };
    };    
};