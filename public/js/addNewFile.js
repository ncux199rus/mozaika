function createNewFile(){
    console.log("addNewFile");
    var fileName = prompt("Введите название файла с расширением:", '');
    console.log("fileName = ", fileName);
    if (!fileName) {
        return new Error("Не корректное имя файла.");        
    }
    
    createElement(fileName);
};