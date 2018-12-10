
function getObjectClasses(metaName){
    //test promise
//    let promise = new Promise(function(res, rej){        
//        try {
//            json = JSON.parse(text);
//            res(json)
//            
            
            //changePage('main', 'card');
//        } catch(err) {
//            rej(err);
//        }   
//    });
//    promise.then(res => {
//     
//    return sendJSON();
//    
//    }).catch();
//    console.log('getObjectClasses function');
//    
    changePage('main', 'card');
    sendJSON();
    
    console.log("testSetListClasses");
    catalogName = '/classes/' + metaName;    
    var itemPropertyCard = [];
    var xhr = new XMLHttpRequest();
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
        return itemPropertyCard;
    };
    console.log("itemPropertyCard = ", itemPropertyCard.length);  
    itemPropertyCard.forEach((item) => {
        //xhr.open('GET', catalogName + '/' + item, true);
        //xhr.send();
        console.log('catalogName + '/' + item)', catalogName + '/' + item);
    });
};

function testSetListClasses(){
    //console.log("gtestSetListClasses");    
}