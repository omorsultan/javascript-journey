
//-------- copy an arry .method 1--------------------------//
/*

let arr = [1, 3, 5, 6];

console.log(arr);

let n= arr.length;

//  // create a array with size and value
let brr = new Array(n).fill(5); // all value are 5;

console.log(brr);

// //  create a double array.
for( let i = 0; i<arr.length; i++){
  brr[i] = arr[i]*2;
}

console.log(brr);

for(let i = 0 ;i <arr.length; i++){
  arr[i] *=2; 
}
console.log(arr);
*/

// ------------------- copy an array method 2 ------------------------- // 

/*

let arr = [1, 2 ,5 , 9];

// // create a empty array
let brr = [];

// // copy using for of loop
for( const ele of arr){
  brr.push(ele *2);
}

console.log(arr ,brr);
*/

// ------------------COPY AN ARRAY USING MAP-----------------------//
/*
function twice(ele){
  return 2*ele;
}
const arr = [1, 4, 5, 20, 500];
let brr = arr.map(twice); // callback
console.log(brr);
*/

//---------------COPY AN ARRAY USING MAP WITHOUT ANOTHER FUNCTION ---------//
/*
const arr = [4, 5, 20, 50, 200];

let brr = arr.map(function(ele){
  return ele*5;
})
console.log(brr);
*/
//--------ARROW FUNCTION -------------//
/*
const arr = [4, 5, 20, 50, 200];

let brr = arr.map((ele)=>{ // no need to write word function insted use =>
  return ele*5} );
console.log(brr);
*/

//---------USING SINGLE LINE----------------//
/*
const arr = [4, 5, 20, 50, 200];

let brr = arr.map(ele=>ele*5 );
console.log(brr);
*/
//---------CHANGE SAME ARRAY ----------//

/*
let arr = [4, 5, 20, 50, 200];

arr.map(ele=>ele*5 ); // not changed print same array.
console.log(arr);
arr = arr.map(ele => ele*5); // now changed  , const is not working
console.log(arr);
*/
