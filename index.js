var form= document.getElementById('userData');
getUsers();
form.addEventListener('submit',event=>{
    event.preventDefault();
    var firstname=form.elements['firstname'].value;
    var lastname=form.elements['lastname'].value;
    var gender=form.elements['Gender'].value;
    var email=form.elements['email'].value;
    var user = JSON.stringify({"first_name":firstname, "last_name":lastname, "gender":gender, "email":email});
    var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://localhost:3000/users', true);
//Send the proper header information along with the request
xhr.setRequestHeader("Content-Type", "application/json");
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        getUsers();
    }
}
xhr.send(user);
})
function getUsers(){
    var usersFromDB = [];
 fetch('http://localhost:3000/users', {method:'GET'})
.then(result=>result.json()).then(function(usersFromDB){
     var table = document.createElement("TABLE");
        table.border = "1";
        var rowCount = usersFromDB.length;
        addTable();
       function addTable() {
    var myTableDiv = document.getElementById("myDynamicTable");
    var table = document.createElement('TABLE');
    table.border='1';
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    for (var i=0; i<rowCount; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       var keys = Object.keys(usersFromDB[0]);
        for(let key of keys){
var td = document.createElement('TD');
           td.width='75';
           td.appendChild(document.createTextNode(usersFromDB[i][key]));
           tr.appendChild(td);          
        }
    }
    myTableDiv.appendChild(table);
}
});
}