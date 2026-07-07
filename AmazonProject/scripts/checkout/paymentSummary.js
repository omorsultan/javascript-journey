import { cart } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { returnDeliveryCharge } from "../utils/deliveryCarge.js";
import { updateCartQuantity } from "../utils/updateCartQuantity.js";
import { returnMatchingProduct } from "../../data/products.js";

export function renderPaymentSummary(){

  let costCents = 0.0;
  let shippingCostCents = 0.0;
  
  cart.forEach((cartProduct) => {
    let matchingItem = returnMatchingProduct(cartProduct);
    costCents += matchingItem.priceCents * cartProduct.quantity;
    shippingCostCents += returnDeliveryCharge(cartProduct);
    // console.log(cartProduct.deliveryOptionId);
    
  });
   
  let cost = formatCurrency(costCents);
  let shippingCost = formatCurrency(shippingCostCents);

  let costBeforeTaxCents = costCents + shippingCostCents;

  let taxCents = 0.1 * costBeforeTaxCents;

  let totalCents = costBeforeTaxCents + taxCents;

  updateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${updateCartQuantity()} items`;

  document.querySelector('.js-items')
    .innerHTML =`Items (${updateCartQuantity()}) `;

  document.querySelector('.js-total-cost')
    .innerHTML = `$${cost}`;

  document.querySelector('.js-total-delivery-charge')
    .innerHTML = `$${shippingCost}`;

  
  document.querySelector('.js-subtotal')
    .innerHTML = `$${formatCurrency(costBeforeTaxCents)}`;

  document.querySelector('.js-tax')
    .innerHTML = `$${formatCurrency(taxCents)}`;

  document.querySelector('.js-total')
    .innerHTML = `$${formatCurrency(totalCents)}`;
}