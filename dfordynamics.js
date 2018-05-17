
var mentees = []; //mentees and rating array are for keeping track of tree configuration for sorting. I did this before knowing about children[]. so kept it.
var objarray = []; //Stores the important details in objects, for saving and retrieving
var rating = [];
    //Stores the comments, so as to hide every other comment box than the one thats pressed.
  //to store input tags of mentee names, so as to lock them when save button is clicked.
var j = 0;



document.getElementById('add').addEventListener("click", function() {
  add(document.getElementById('text').value, 1, false, "")
});

function reconstruct() {

  objarray = [];
  mentees = [];

 var len = localStorage.getItem("length");
  for (i = 0; i < len; i++) {
    var obj = JSON.parse(localStorage.getItem(i));
    // console.log(JSON.parse(localStorage.getItem(i)));
    add(obj.name, obj.rat, obj.lockstatus, obj.comments);



  }





}


window.addEventListener("load", reconstruct);

function add(name, ratings, lockstatus, comments) {                               //START OF ADD FUNCTION

  var list = document.getElementById('list');                                     //getting the reference to ul
  var myobj = new Object();                                                          //myobj stores the current details of div
  var div = document.createElement('div');                                            //creating a div element everytime add is clicked

  var node = document.createElement('input'); //reference to input that will hold the name
  node.type = "text";
  node.placeholder = "Enter name";
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
  
  radio[ratings-1].checked = true;

  func(ratings);


  var lockbutton = document.createElement('input'); //LOCK BUTTON PROPERTIES
  lockbutton.type = "button";
  lockbutton.value = "Lock";
  lockbutton.className = "lock";


  var para = document.createElement('p'); //RATING p PROPERTIES
  para.textContent = "Rating:- ";
  para.className = "rating";


  var comment = document.createElement('input'); //COMMENT PROPERTIES
  comment.type = "text";
  comment.placeholder = "Enter your comments here";
  comment.className = "comments";
  comment.value = comments;
  // comment.id = "comments";

  var editbutton = document.createElement('input'); //EDITBUTTON PROPERTIES
  editbutton.type = "button";
  editbutton.value = "Edit";
  editbutton.className = "edit";

  var cpara = document.createElement('p');
  if(comments=="")
  cpara.textContent = "No comments here.";
  else cpara.textContent = comments;
  cpara.className = "cpara";
  cpara.style.display= "none";



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




 var menname = document.createElement('p');     //name p
 menname.className = "menteename";
 if(name=="") menname.textContent = "Enter name";
 else menname.textContent = name;
 menname.style.display = "none";


 var toggle = document.createElement('input');   //toggle
 toggle.type = "button";
 toggle.value = "Expand/Contract";
 toggle.className = "toggle";


  div.appendChild(node); //APPENDING CHILDREN TO LIST
  div.appendChild(para);

  for (i = 0; i < 5; i++) { //Radio buttons and labels
    div.appendChild(radio[i]);
    div.appendChild(label[i]);
  }

  div.appendChild(deletebutton);
  div.appendChild(editbutton);
  div.appendChild(menname);

  div.appendChild(comment);
  div.appendChild(cpara);
  div.appendChild(toggle);
  mentees.push(div);
  list.appendChild(div);                                                            //pushing the div to metees for sorting




  deletebutton.onclick = function() {                                                     //Delete function
    var index = mentees.indexOf(div);
    div.remove();
    mentees.splice(index, 1);
    rating.splice(index, 1);
    objarray.splice(index, 1);
  console.log(index);

  }

  // function lock() {                  //LOCK BUTTON onclick
  //   comment.disabled = true;
  //   for (m = 0; m < 5; m++)
  //     radio[m].disabled = true;
  //   node.disabled = true;
  //   myobj.lockstatus = true;
  //   myobj.comments = comment.value;
  //   myobj.name = node.value;
  // }

  if(lockstatus==true)
  {
    menname.style.display = "block";
    node.style.display = "none";
    node.disabled = true;
    for (m = 0; m < 5; m++)
     radio[m].disabled = true;
     comment.disabled = true;

     div.style.height = "100px";
     div.children[15].style.display = "none";
       div.children[16].style.display = "none";
       div.children[13].style.display = "none";
       div.children[12].style.display = "none";



  }
  else{
    node.style.display = "block";
    menname.style.display = "none";
    node.disabled = false;
    for (m = 0; m < 5; m++)
     radio[m].disabled = false;
     comment.disabled = false;

     div.style.height = "150px";
     div.children[15].style.display = "block";
       div.children[16].style.display = "none";
       div.children[13].style.display = "block";
       div.children[12].style.display = "block";

  }




  function edit() {
    comment.disabled = false;
    for (m = 0; m < 5; m++)
      radio[m].disabled = false;
    node.style.display = "block";
    myobj.lockstatus = false;
    menname.style.display = "none";
    cpara.style.display = "none";
    node.disabled = false;
    comment.style.display = "block";

  }


  editbutton.addEventListener("click", edit);


  myobj.name = node.value; //EDITING OBJECT PARAMETERS
  myobj.comments = comment.value;
  myobj.lockstatus = lockstatus;
  // var index = mentees.indexOf(div);
  // objarray[index] = myobj;
  objarray.push(myobj);




  function expandcollapse(){


      if(window.innerWidth<=400)
     {


        if(div.style.height == "150px")
      {

        div.style.height = "100px";
      div.children[15].style.display = "none";
        div.children[16].style.display = "none";
        div.children[12].style.display = "none";
        div.children[13].style.display = "none";
      }
      else{
        div.style.height = "150px";
        div.children[13].style.display = "block";
        div.children[12].style.display = "block";
        if(myobj.lockstatus==true)
        {
          cpara.style.display = "block";
          div.children[15].style.display = "none";

        }
        else {
          comment.style.display = "block";
          cpara.style.display = "none";

        }

      }


    }
      else if  (div.style.height == "150px")    //12-delete 13-edi
      {  div.style.height = "100px";

        div.children[15].style.display = "none";
          div.children[16].style.display = "none";
          div.children[12].style.display = "none";
          div.children[13].style.display = "none";

        }


      else if(div.style.height=="100px")  //div.style.gridTemplateRows=="1fr 0.5fr 0.5fr 1fr"
      {


        div.style.height = "150px";




        div.children[13].style.display = "block";
        div.children[12].style.display = "block";
        if(myobj.lockstatus==true)
        {
          cpara.style.display = "block";
          div.children[15].style.display = "none";

        }
        else {
          comment.style.display = "block";
          cpara.style.display = "none";

        }

      }
  //     div.children[13].style.display = "block";
  //     div.children[12].style.display = "block";
  //     console.log(div.children[13]);
  //     // console.log(myobj.lockstatus);
  //     if(myobj.lockstatus==true)
  //     {
  //       cpara.style.display = "block";
  //       div.children[15].style.display = "none";
  //
  //     }
  //     else {
  //       comment.style.display = "block";
  //       cpara.style.display = "none";
  //
  //     }
  //
  //
  //
  //   for(i=0;i<mentees.length;i++)
  //   {
  //     if(mentees[i]!=div)
  //   {
  //     console.log(i);
  //     mentees[i].style.marginBottom = "1%";
  //     mentees[i].style.gridTemplateRows = "1fr 0.5fr 0.5fr 1fr";
  //     mentees[i].children[15].style.display = "none";
  //       mentees[i].children[16].style.display = "none";
  //       mentees[i].children[12].style.display = "none";
  //       mentees[i].children[13].style.display = "none";
  //   }
  // }

}



  toggle.addEventListener("click", expandcollapse);


} //END OF ADD FUNCTION


function save() {
                                                                                    //SAVE FUNCTION
  for(i=0;i<mentees.length;i++)
  {console.log(mentees[i].children[15].value)
    mentees[i].children[16].value = mentees[i].children[15].value;
    mentees[i].children[14].value = mentees[i].children[0].value;
      // mentees[i].style.gridTemplateRows = "1fr 0.5fr 0.5fr 1fr";
  //     for(n=0;n<mentees[i].children.length;n++)
  //     console.log(mentees[i].children[n]);
  // }
  console.log(mentees[i].children[16].value);
}

   console.log(objarray.length);
   console.log(mentees.length);
  for(i=0;i<objarray.length;i++)
  {


    objarray[i].lockstatus = true;
    objarray[i].name = mentees[i].children[14].value;
    objarray[i].comments = mentees[i].children[16].value;
    console.log(objarray[i]);

  }

  // for(i=0;i<mentees.length;i++)
  // {
  //   mentees[i].children[14].style.display = "block";      //name p
  //
  //   mentees[i].children[15].style.display = "none";      //comments input
  //   mentees[i].children[0].style.display = "none";         // name input
  //    for(n=0;n<5;n++)
  //    {
  //      mentees[i].children[2+ 2*n].disabled = true;
  //
  //    }
  //
  // }
  var obj2 = [];
 console.log(objarray.length);
  for (i = 0; i < objarray.length; i++) {
    obj2[i] = objarray[i];
    JSON.stringify(obj2[i]);
    localStorage.setItem(i, JSON.stringify(obj2[i]));

  }

  for(i=0;i<mentees.length;i++)
  mentees[i].remove();
    localStorage.setItem("length", objarray.length);
reconstruct();
  // console.log(objarray[i]);




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
