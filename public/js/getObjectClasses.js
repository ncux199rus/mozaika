
function getObjectClasses(){
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
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/classes/42', true);
    xhr.send();
    
};

function testSetListClasses(){
    //console.log("gtestSetListClasses");
    
    
}