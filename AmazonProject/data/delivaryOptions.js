export const deliveryOptions = [{
  id : '1',
  delivaryDays : 7,
  priceCents : 0
},{
  id: '2',
  delivaryDays : 3,
  priceCents :499
},
{
  id : '3',
  delivaryDays : 1,
  priceCents : 999
} 
]
export function getDeliveryCharge(cartProduct){

  for(const option of deliveryOptions){
    if(option.id === cartProduct.deliveryOptionId)
      return option.priceCents || deliveryOptions[0]; // if not find any then default value;
  }
}