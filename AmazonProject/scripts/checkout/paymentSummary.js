import { cart,returnMatchingProduct } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { returnDeliveryCharge } from "../utils/deliveryCarge.js";


export function renderPaymentSummary(){

  let costCents = 0.0;
  let shippingCostCents = 0.0;
  
  cart.forEach((cartProduct) => {
    let matchingItem = returnMatchingProduct(cartProduct);
    costCents += matchingItem.priceCents;
    shippingCostCents += returnDeliveryCharge(cartProduct);
    // console.log(cartProduct.deliveryOptionId);
    
  });
   
  let cost = formatCurrency(costCents);
  let shippingCost = formatCurrency(shippingCostCents);
}