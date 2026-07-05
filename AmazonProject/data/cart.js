export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){

     let matchingItem;

     cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
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
    saveToStorage();
};

export function removeFromCart(deleteId){
    const index = cart.findIndex( item => item.productId === deleteId);
    
    if(index !== -1){
      cart.splice(index, 1);
      console.log(`procuct deleteted product id is= ${deleteId}`);
    }
   console.log(cart);
   saveToStorage(); 
}