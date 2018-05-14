var mentees = [];


// function refresh() {
//
//   var list = document.getElementById('list');
//     var length = localStorage.getItem("length");
//
//   for (i = 0; i < length; i++) {
//     var len = i.toString(10);
//   JSON.parse(localStorage.getItem(len));
//   var div = JSON.parse(localStorage.getItem(len));
//
//     list.appendChild(div);
//   }
//
//
//
//
// }
// if(localStorage.getItem("flag")=="1")
// refresh();
var rating = [];
var j = 0,
  i;

function add() {


  var div = document.createElement('div'); //creating a div element everytime add is clicked

  var node = document.createElement('input'); //reference to li that will hold the name
  node.type = "text";
  node.placeholder = "Enter name here";
  node.className = "mentee";
  node.value = document.getElementById('text').value; //setting the content of li to user input
  var list = document.getElementById('list'); //getting the reference to ul
  var button = document.createElement('button'); //Deletebutton
  button.textContent = "Delete";
  j++;



  var i;
  var radio = new Array(5);
  var label = new Array(5);
  for (i = 0; i < 5; i++) {
    radio[i] = document.createElement('input');
    radio[i].type = "radio";
    radio[i].className = "radio" + i;
    radio[i].name = "radio" + j;
    var val = i + 1;
    radio[i].value = val.toString(10);
    label[i] = document.createElement('label');
    label[i].className = "label" + i;
    label[i].textContent = val.toString(10);


  }


  var lockbutton = document.createElement('input');
  lockbutton.type = "button";
  lockbutton.value = "Lock";
  lockbutton.className = "lock";



  var para = document.createElement('p');
  para.textContent = "Specify rating:- ";
  para.className = "rating"; //para:- the rating heading
  var comments = document.createElement('textarea');
  comments.type = "text";
  comments.placeholder = "Enter your comments here";
  comments.className = "comments";

  var editbutton = document.createElement('input');
  editbutton.type = "button";
  editbutton.value = "Edit";
  editbutton.className = "edit";


  function func() {
    var x = this.value;
    rating.push(x);
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
    radio[i].addEventListener('click', func);
  var status = document.createElement('input');
  status.type = "radio";
  status.style.display = "none";
  status.name = "status";
  status.className = "status";
  status.checked = false;

  div.appendChild(node);
  div.appendChild(para);

  for (i = 0; i < 5; i++) {
    div.appendChild(radio[i]);
    div.appendChild(label[i]);
  }
  list.appendChild(status);

  div.appendChild(comments);
  div.appendChild(button);
  div.appendChild(lockbutton);
  div.appendChild(editbutton);
  div.appendChild(status);
  list.appendChild(div);
  mentees.push(div);




  button.onclick = function() {
    var index = mentees.indexOf(div);
    div.remove();
    mentees.splice(index, 1);
    rating.splice(index, 1);

  }
  lockbutton.onclick = function() { //LOCK BUTTON onclick
    comments.disabled = true;
    for (m = 0; m < 5; m++)
      radio[m].disabled = true;
    node.disabled = true;
  }

  editbutton.onclick = function() {
    comments.disabled = false;
    for (m = 0; m < 5; m++)
      radio[m].disabled = false;
    node.disabled = false;

  }






} //END OF ADD FUNCTION


function save() {                 //SAVE FUNCTION


    localStorage.clear();
      localStorage.setItem("flag", "1");
  var ment = [];
  for (i = 0; i < mentees.length; i++) {
    ment[i] = mentees[i];

      JSON.stringify(ment[i]);
      localStorage.setItem(i, JSON.stringify(ment[i]));
      console.log(localStorage.getItem(i));

  }
  localStorage.setItem("length", mentees.length);



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
