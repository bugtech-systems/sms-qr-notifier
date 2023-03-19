import { UPDATE_CART, UPDATE_CART_ITEMS, SET_CART_ITEMS_COUNT, SET_CART_SUCCESS, SET_ACTION } from './types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { authHeader } from '../../services/auth-header';

import commonData from '../../utils/commonData';
import axios from 'axios';
import { getOrders, getCartOrderById } from './OrderApp';
import { getAdminDashboard } from './Dashboard';

import {formatDec} from '../../utils/helpers';




//For expanding sidebar
export const handleCartItem = (cart_items, item) => {

  let { stocks, uom  } = item.product ? item.product : {};
  let stcks = formatDec(stocks);
  let qty = item.qty || item.qty >= 0 ? formatDec(item.qty) : formatDec(1);
  let cartItems = cart_items;
  let inds = cart_items.map(a => { return a.productId}).indexOf(item.productId);



  if(qty >= 0){

    let newStock = stcks > qty && qty >= 0 ? stcks - qty : 0;

  if (inds !== -1) {

    cartItems = cartItems.map(a => {
      return a.productId == item.productId
        ? {
           ...item, 
            price: formatDec(item.price),
            qty: qty,
            stocks: formatDec(newStock),
            total: formatDec(item.price) * qty,
            productId: item.productId,
            name: item.name,
            description: item.description,
            uom  }
        : a;
    });

  } else {
    cartItems.unshift({
      ...item,
      price: item.price,
      qty: qty,
      stocks: newStock,
      total: item.price * qty,
      productId: item.id ? item.id : item.productId,
      name: item.name,
      description: item.description,
      uom
    });
  }

} else {
  cartItems.splice(inds, 1);
}


  return Promise.resolve(cartItems);
 
};


export const handleCart = (cartItem)  => dispatch => {



  let { cart_items, other_amounts, payments} = cartItem;
  let gross_total = 0;
  let amount_due = 0;
  let total_vatable = 0;
  let total_discounts = 0;
  let total_charges = 0;
  let tax_disc = [];


  for(let val of cart_items){
      //Gross Total
      let total = val.price * val.qty;
      gross_total += total;

      //Vatable
    let vats = val.other_amounts.find(a => a.type === 'tax' && !a.isCart);
    if(vats){
      let vatable = 0;
        vatable += total / (1 + (vats.value / 100));

        let ind = tax_disc.map(ab => { return ab.id }).indexOf(vats.id);
        if(ind !== -1){
          tax_disc[ind].total += total - vatable;
        } else {

          tax_disc.push({
            id: vats.id,
            description: 'VAT - 12%',
            type: 'tax',
            total: total - vatable
          })
        }

        total_vatable += vatable;


     
     
    }
   //Vat


      //Discounts
      let discs = val.other_amounts.filter(a => a.type === 'discounts' && !a.isCart);
      if(discs.length !== 0){
        discs.forEach(a => {
              let inds = tax_disc.map(a => {return a.id}).indexOf(a.id);
                total_discounts += a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value;
                if(inds === -1){
                tax_disc.push({
                  id: a.id,
                  description: `${a.name}${a.amount_type === 'rate' ? ` - ${a.value}%` : ''}`,
                  total: a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value,
                  type: 'discounts'
                 }) 
                } else {
                  tax_disc[inds].total += a.amount_type === 'rate' ? total * (a.value / 100) :  val.qty * a.value
                }
              })
      }


   
      //Charges
      let chrgs = val.other_amounts.filter(a => a.type === 'charges' && !a.isCart);
      if(chrgs.length !== 0){
        chrgs.forEach(a => {
              let inds = tax_disc.map(a => {return a.id}).indexOf(a.id);
                total_charges +=  a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value;
                if(inds === -1){
                tax_disc.push({
                  id: a.id,
                  description: `${a.name}${a.amount_type === 'rate' ? ` - ${a.value}%` : ''}`,
                  total: a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value,
                  type: 'charges'
                 }) 
                } else {
                  tax_disc[inds].total += a.amount_type === 'rate' ? total * (a.value / 100) :  val.qty * a.value
                }
              })
      }

      //Payment

      //Amount Due
  }


  for(let val of other_amounts){
    let total = val.amount_type === 'rate' ? gross_total * (val.value / 100) : val.value;
    if(val.type === 'discounts'){
      total_discounts += Number(total)
    }

    if(val.type === 'charges'){
      total_charges += Number(total)
    }


    tax_disc.push({
      id: val.id,
      description: `${val.name}${val.amount_type === 'rate' ? ` - ${val.value}%` : ''}`,
      total: Number(total),
      type: val.type,
      isCart: true
    })
  }




  let disc_gross = Number(gross_total) - Number(total_discounts)
  amount_due = disc_gross + Number(total_charges);


  const payload = {
    ...cartItem,
    cart_items: cart_items,
    tax_disc: tax_disc,
    gross_total: Number(gross_total).toFixed(2),

    amount_due: Number(amount_due).toFixed(2),
    
    cart_items_count: cart_items.length,
    total_vatable: Number(total_vatable).toFixed(2),
    other_amounts: other_amounts
  }


  dispatch({
    type: UPDATE_CART,
    payload
  });
};

export const createOrder = (cart) => dispatch => {
    dispatch(fetchStart());
    return axios
      .post(`${commonData.apiUrl}/orders`, cart, { headers: authHeader() })
      .then((res) => {
        let { message, data } = res.data;
     
        dispatch(getOrders());
        dispatch(getAdminDashboard());
        dispatch(getCartOrderById(data.id))
        dispatch(fetchSuccess(message));
        localStorage.removeItem('cart')
        dispatch({type: SET_CART_SUCCESS, payload: data.id});
        dispatch({type: SET_ACTION, payload: 'success'})
     
      })
      .catch(err => {
        console.log(err)
        throw err;
      });
};