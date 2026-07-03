
/*
let x = document.querySelector("h2");
// all not worked
// x.style.color = red ; // not works

x.style.color ="red";
x.style.fontFamily = "arial";

// x.innerHTML = "changed"; // inner text is changed.

//----Want to change the text after two second------------//

setTimeout(function(){
  x.innerHTML = "Changed after two second"
},2000);
*/

// let x = document.querySelector("#ele1"); // it works 
let x = document.getElementById("ele1"); // best. if not give "" it not works

x.addEventListener('click',function(){
  x.style.color = 'yellow';
});


let y = document.getElementById("ele2");

y.addEventListener('mousemove', function(){
  y.style.color = 'white';
  y.style.backgroundColor = 'orange';
})