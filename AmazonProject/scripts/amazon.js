
// ------------------- list of products --------//
const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name:' Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: { // rating has two property so we use object
    stars: 4.5,
    count : 87
  },
  priceCents: 1090
}, // it is the data for first product now another object for 2nd product
{
  image:'images/products/intermediate-composite-basketball.jpg',
  name:'Intermediate Size Basketball',
  rating:{
    stars: 4,
    count: 127
  },
  priceCents: 2095
},{
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: ' Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799
}
/*
,
{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: ' Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating:{
    stars: 4.5,
    count: 87
  },
  priceCents: 1090
}
  */
]; // this is a list of a object . and array represent a list

// ---------- generate html using js loop -----------//

products.forEach((product)=>{ // inside create a function , pass parameter product. 
// check korbo product er html code kothai ache. otake hover kore then html code e class ta search korbo . poro code ta copy korbo
const html = ``; // ekhane paste korbo

}); // loop through this array using a for each method