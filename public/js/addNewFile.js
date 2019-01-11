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
}