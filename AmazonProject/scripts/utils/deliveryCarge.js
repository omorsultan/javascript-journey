
import { deliveryOptions } from "../../data/delivaryOptions.js";

export function returnDeliveryCharge(cartProduct){

  for(const option of deliveryOptions){
    if(option.id === cartProduct.deliveryOptionId)
      return option.priceCents;
  }
}