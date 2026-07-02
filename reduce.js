
//-----------simple reduce a+b -------------------//
/*
let arr = [2, 3, 8, 88, 24, 25, 79, 83, 1];

let x = arr.reduce(function(a, b){
  return a+b;
});
console.log(x);
// 2+3+8+88+24+25+79+83+1 = 313
*/

//----------------------(a - b) ---------------------------------//
let arr = [2, 3, 8, 88, 24, 25, 79, 83, 1];

let x = arr.reduce(function(a, b){
  return a-b;
});
console.log(x);

// (2-3)-8-88-24-25-79-83-1 = (2*2 - 313 ) = -309