import { cart } from "../../data/cart.js";

export function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
 
    return cartQuantity;
}
