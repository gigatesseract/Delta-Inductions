var mentees = []; //mentees and rating array are for keeping track of tree configuration for sorting
var objarray = [];
var rating = [];
var comm = [];
var j = 0,
  i;


document.getElementById('add').addEventListener("click", function() {
  add(document.getElementById('text').value, 1, false, "")
});

function reconstruct() {
  var length = localStorage.getItem("length");
  objarray.splice(0, length);


  for (i = 0; i < length; i++) {
    var obj = JSON.parse(localStorage.getItem(i));
    console.log(JSON.parse(localStorage.getItem(i)));
    add(obj.name, obj.rat, obj.lockstatus, obj.comments);


  }




}


window.addEventListener("load", reconstruct);

function add(name, ratings, lockstatus, comments) { //START OF ADD FUNCTION

  var list = document.getElementById('list'); //getting the reference to ul

  var myobj = new Object();
  var div = document.createElement('div'); //creating a div element everytime add is clicked

  var node = document.createElement('input'); //reference to input that will hold the name
  node.type = "text";
  node.placeholder = "Enter name here";
  node.className = "mentee";
  node.value = name; //setting the content of name from argument


  var deletebutton = document.createElement('input'); //DELETEBUTTON PROPERTIES
  deletebutton.type = "button";
  deletebutton.value = "Delete";
  deletebutton.className = "delete"
  j++;


  localStorage.setItem("j", j);

  //SETTING THE RADIO BUTTONS AND THEIR CORRESPONDING LABELS

  var i;
  var radio = new Array(5);
  var label = new Array(5);
  for (i = 0; i < 5; i++) {
    radio[i] = document.createElement('input');
    radio[i].type = "radio";
    radio[i].className = "radio" + i;
    radio[i].name = "radio" + localStorage.getItem("j");
    var val = i + 1;
    radio[i].value = val.toString(10);
    label[i] = document.createElement('label');
    label[i].className = "label" + i;
    label[i].textContent = val.toString(10);


  }
  var pos = parseInt(ratings);
  pos = pos - 1;
  radio[pos].checked = true;
  func(pos + 1);


  var lockbutton = document.createElement('input'); //LOCK BUTTON PROPERTIES
  lockbutton.type = "button";
  lockbutton.value = "Lock";
  lockbutton.className = "lock";


  var para = document.createElement('p'); //RATING p PROPERTIES
  para.textContent = "Specify rating:- ";
  para.className = "rating";


  var comment = document.createElement('input'); //COMMENT PROPERTIES
  comment.type = "text";
  comment.placeholder = "Enter your comments here";
  comment.className = "comments";
  comment.value = comments;
  comm.push(comment);
  // comment.id = "comments";

  var editbutton = document.createElement('input'); //EDITBUTTON PROPERTIES
  editbutton.type = "button";
  editbutton.value = "Edit";
  editbutton.className = "edit";



  function func(x) { //FUNCTION TO CHANGE COLOR BASED ON RATING
    rating.push(x);
    myobj.rat = x;
    var yg = Math.ceil(63.75 * (x - 1));
    var yr = Math.ceil(-63.75 * (x - 5));
    var ygd = yg.toString(16);
    if (ygd.length == 1) ygd = '0' + ygd;
    var yrd = yr.toString(16);
    if (yrd.length == 1) yrd = '0' + yrd;
    var mystring = '#' + yrd.toUpperCase() + ygd.toUpperCase() + '00';
    div.style.background = mystring;

    var pos = mentees.indexOf(div);
    rating[pos] = x;

  }
  for (i = 0; i < 5; i++)
    radio[i].addEventListener("click", function() {
      func(this.value)
    });




  var status = document.createElement('input');
  status.type = "radio";
  status.style.display = "none";
  status.name = "status";
  status.className = "status";
  status.checked = true;



  div.appendChild(node); //APPENDING CHILDREN TO LIST
  div.appendChild(para);
  // div.appendChild(status);

  for (i = 0; i < 5; i++) { //Radio buttons and labels
    div.appendChild(radio[i]);
    div.appendChild(label[i]);
  }



  div.appendChild(deletebutton);
  div.appendChild(lockbutton);
  div.appendChild(editbutton);

  list.appendChild(div);
  div.appendChild(comment);
  mentees.push(div); //pushing the div to metees for sorting




  deletebutton.onclick = function() { //Delete function
    var index = mentees.indexOf(div);
    div.remove();
    mentees.splice(index, 1);
    rating.splice(index, 1);
    objarray.splice(index, 1);
    comm.splice(index,1);
    console.log(objarray.length);

  }

  function lock() { //LOCK BUTTON onclick
    comment.disabled = true;
    for (m = 0; m < 5; m++)
      radio[m].disabled = true;
    node.disabled = true;
    myobj.lockstatus = true;
    myobj.comments = comment.value;
    myobj.name = node.value;
  }

  function edit() {
    comment.disabled = false;
    for (m = 0; m < 5; m++)
      radio[m].disabled = false;
    node.disabled = false;
    myobj.lockstatus = false;

  }
  if (lockstatus == true) lock();
  else edit();

  editbutton.addEventListener("click", edit);
  lockbutton.addEventListener("click", lock);




  myobj.name = node.value; //EDITING OBJECT PARAMETERS
  myobj.comments = comment.value;
  var index = mentees.indexOf(div);
  objarray[index] = myobj;

  // div.tabIndex = "0";

  // div.onfocus = function(){
  //   comment.style.display = "block";
  // }
  //
  // div.onblur = function(){
  //   comment.style.display = "none";
  // }

  div.tabIndex = "0";
  status.tabIndex = "0";

  function expandcollapse(){

      div.style.marginBottom = "1%";
      div.style.gridTemplateRows = "1fr 0.5fr 0.5fr 1fr 1fr 1fr 1fr 1fr";
      comment.style.display = "block";


    for(i=0;i<mentees.length;i++)
    {
      if(mentees[i]!=div)
    {
      //console.log(i);
      mentees[i].style.marginBottom = "1%";
      mentees[i].style.gridTemplateRows = "1fr 0.5fr 0.5fr 1fr";
      comm[i].style.display = "none";
    }
  }
}



  div.addEventListener("click", expandcollapse);
   div.appendChild(status);

} //END OF ADD FUNCTION


function save() { //SAVE FUNCTION
  localStorage.setItem("flag", "1");
  var obj2 = [];

  for (i = 0; i < objarray.length; i++) {
    obj2[i] = objarray[i];
    JSON.stringify(obj2[i]);
    localStorage.setItem(i, JSON.stringify(obj2[i]));







  }
  localStorage.setItem("length", objarray.length);

}



function sort() {

  var mentees2 = [];
  for (i = 0; i < mentees.length; i++)
    mentees2[i] = mentees[i];
  for (i = 0; i < mentees.length; i++) {
    for (k = i + 1; k < mentees.length; k++) {
      if (rating[i] > rating[k]) {
        var temp = mentees2[i];
        mentees2[i] = mentees2[k];
        mentees2[k] = temp;
        temp = rating[i];
        rating[i] = rating[k];
        rating[k] = temp;
        var temp = objarray[i];
        objarray[i] = objarray[k];
        objarray[k] = temp;
        var temp = comm[i];
        comm[i] = comm[k];
        comm[k] = temp;
      }
    }
  }

  for (i = 0; i < mentees.length; i++) {
    mentees[i].remove();

  }
  for (i = 0; i < mentees2.length; i++) {
    list.appendChild(mentees2[i]);
    mentees[i] = mentees2[i];

  }


}
