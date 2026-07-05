export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 5
}];

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
};

export function removeFromCart(deleteId){
    const index = cart.findIndex( item => item.productId === deleteId);
    
    if(index !== -1){
      cart.splice(index, 1);
      console.log(`procuct deleteted product id is= ${deleteId}`);
    }
   console.log(cart);
}