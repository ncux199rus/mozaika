//функции по удалению объектов на сервере

//удаляет весь каталог метеданных
function delOjectMetaData(object, nameObject){
    let conf = confirm("Подтвердите удаление каталога " + nameObject + ".");
    if (!conf) {
        console.log('отмена удаления ', nameObject);
        return;
    };
    
    console.log('delete nameObject = ', nameObject);
    let delOject = {
        typeObject: object,
        nameObject: nameObject
    };
    
    let delJSONObject = JSON.stringify(delOject);
    console.log(delJSONObject);

    path = '/classes/'; // + nameObject + '/del';
    fetch(path, {
        method: 'delete', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },      
        body: delJSONObject
    })
    .then(response =>{
        if (response.status === 200){
            alert('Объект ' + nameObject + ' удален.');
            
            if (object == "catalog"){
                //очистка тела таблицы со списком мета каталогов
                clearBodyTables();            
                //получение таблицы с карточками метаданных
                getListClasses();
            } else if (object == "file") {
                console.log("update after delete file")
                let metaName = document.getElementById("inputHeadId").value
                clearCard();
                
                getObjectClasses(metaName);
            } else {
              console.error('Unknown object type: ' + object);
            }
        } else{
            console.log(response);
        }
    })
    .catch(console.error);
};