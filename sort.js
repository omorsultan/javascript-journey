// -----------simple sort (not working)--------------//
/*
let arr = [1, 4, 6, 23, 0 , -5, 3];

arr = arr.sort(); // not working
console.log(arr);
// output
/* [
  -5, 0, 1, 23,
   3, 4, 6
]
*/


//---------sort using comperator operator (works perfectly) ----------//
/*
let arr = [1, 4, 6, 23, 0 , -5, 3];

arr = arr.sort(function(a,b){
  return a-b;
}); 
console.log(arr);
*/

//-----------------descending order (only b-a) --------------------//
/*
let arr = [1, 4, 6, 23, 0 , -5, 3];

arr = arr.sort(function(a,b){
  return b-a;
}); 
console.log(arr);
*/

//---------sorting ignoring (-) minus sign ------------------//

let arr = [1, 4, -6, 23, 0 , -5, 3, -9, -67];

arr = arr.sort(function(a,b){
  return Math.abs(a)-Math.abs(b);
}); 
console.log(arr);