
// ------------ remove (filter out) even elements-------------------------// 
/*
function fun(ele){
  if(ele%2!=0) return true;
  else return false;
}

let arr = [1,4, 6, 9 , 3, 2, 8, 24, 41, 63, 28];
console.log(arr);

arr.filter(fun); // it not works
arr= arr.filter(fun);
console.log(arr); // it works

*/

//-----------shortcut-----------------------//
/*
let arr = [1,4, 6, 9 , 3, 2, 8, 24, 41, 63, 28];
console.log(arr);


arr= arr.filter(ele => ele%2); // same vabe kaj kore
let brr = arr.filter(ele => !(ele%2));
console.log(brr);
*/

//-------------for filter out odd --------------//
/*
let arr = [1,4, 6, 9 , 3, 2, 8, 24, 41, 63, 28];
console.log(arr);

let brr = arr.filter(ele => !(ele%2));
console.log(brr);
*/