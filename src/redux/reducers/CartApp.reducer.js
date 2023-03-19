import {
    UPDATE_CART,
    UPDATE_CART_ITEMS,
    CLEAR_CART,
    SET_CART_ITEMS_COUNT
  } from '../actions/types';

  const INIT_STATE = {
        // cart_items: cart.cartItems,
        order_no: null,
        cart_items: [],
        other_amounts: [],
        tax_disc: [], 
        sub_total: 0,
        gross_total: 0,
        grand_total: 0,
        amount_due: 0,
        amount_payable: 0,
        cart_items_count: 0,
        payments: [],
        amount_paid: 0,
        payments: [],
        amount_change: 0,
        notes: ''
  };
  
  export default (state = INIT_STATE, action) => {


 
    switch (action.type) {


      case UPDATE_CART: {
        let { tax_disc, amount_payable, amount_paid, amount_due } = action.payload;
        let tdc = tax_disc && typeof tax_disc === 'string' ? JSON.parse(tax_disc) : tax_disc ? tax_disc : []; 
        let payable = amount_payable > 0 ? amount_payable : amount_due - amount_paid;
        return {
          ...state,
          ...action.payload,
          tax_disc: tdc,
          amount_payable: payable
        };
      }

      case UPDATE_CART_ITEMS: {
        return {
          ...state,
            cart_items: action.payload
        };
      }

      case CLEAR_CART: {
        return {
            // ...state,
         order_no: null,
        cart_items: [],
        other_amounts: [],
        tax_disc: [], 
        sub_total: 0,
        gross_total: 0,
        grand_total: 0,
        amount_due: 0,
        amount_change: 0,
        total_vatable: 0,
        amount_paid: 0,
        amount_payable: 0,
        notes: ''
        };
      }

      
      case SET_CART_ITEMS_COUNT: {
        return {
          ...state,
          cart_items_count: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  