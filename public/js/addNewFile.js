function createNewFile(){
    console.log("addNewFile");
    var fileName = prompt("Введите название файла с расширением:", 'test.txt');
    console.log("fileName = ", fileName);
    if (!fileName) {
        return new Error("Не корректное имя файла.");        
    }    
    createElement(fileName);
};

function createNewCard(){
    console.log("addNewFile");
    changePage('main', 'card'); 
    //var fileName = prompt("Введите название карты", '');
    //if (!fileName) {
    //    return new Error("Не корректное имя карты.");        
    //}
    var headInputId = sreateHeadCard('FileName', 1); 
    createNavCard('metaName');
    createElement("meta.json");    
    addPic();  
    saveAllMetaCard();
}

//кнопка сохранить всю новую карточку
function saveAllMetaCard(){
    let newButton = document.createElement("button");
    newButton.innerHTML = "SAVE ALL";
    
        
    newButton.addEventListener('click', function(){
        postJSON(event)
                .then(res => submitIco().then(res => ...).catch())
                .catch(...)
        /*
        fetch(postJSON())
                .then(res => {
                    //if (res === 200){
                        submitIco();
                        console.log("save res = ", res);
//                    }else{
//                        alert(res);
//                    } 
        });
        */
    });
    
    card.appendChild(newButton);
    
}