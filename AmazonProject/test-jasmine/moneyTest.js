import { formatCurrency } from "../scripts/utils/money.js";


describe('test suite: formatCurrency', ()=>{
  it('converts dollers into cents', ()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  })
  
});