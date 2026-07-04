

/* no need now
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

]; // this is a list of a object . and array represent a list

*/

// ---------- generate html using js loop -----------//
let productsHTML = [];
products.forEach((product)=>{ // inside create a function , pass parameter product. 
// check korbo product er html code kothai ache. otake hover kore then html code e class ta search korbo . poro code ta copy korbo

// this is accumulator pattern. we are adding result
productsHTML += `<div class="product-container">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                ${product.name }
                </div>

                <div class="product-rating-container">
                  <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars *10 }.png">
                  <div class="product-rating-count link-primary">
                    ${product.rating.count}
                  </div>
                </div>

                <div class="product-price">
                  $${(product.priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container">
                  <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                  <img src="images/icons/checkmark.png">
                  Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                  Add to Cart  <!--now we will implement add to cart button
                   here -->
                </button>
              </div>`; // ekhane paste korbo
              // tab press kore indexing thik rakhbo
   // kar kore kina check ?

}); // loop through this array using a for each method
// in this code there are fixed value but we want to change this


//-------part of DOM -------//


document.querySelector('.js-products-grid')
  .innerHTML = productsHTML; //  worked only for dot

document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{ 
    button.addEventListener('click',()=>{
     const productId = button.dataset.productId;
//------ update quantity only-------//
     let matchingItem;

     cart.forEach((item)=>{
      if(productId === item.productId){
        matchingItem = item;
      }
     })

     if(matchingItem){
      matchingItem.quantity +=1;
     }
     else{
       cart.push ({
        productId: productId, // use productId instead of productName
        quantity : 1
      });
    }
// ----------- show total cart quantity-----------// 
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = `${cartQuantity}`;
      console.log(cart);
  });
});



 
