

//  // print 1 to 10 . with some gap 
// for( let i= 10 ; i>= 0 ; i--){
//   setTimeout(function(){
//     console.log("Hello",i);
//   },i*200);
// };

// // print random number , with 100 msec gap
for( let i = 0; i<= 100 ; i++){
  setTimeout(function(){
    console.log(Math.floor(Math.random()*10))
  },i*100);
};