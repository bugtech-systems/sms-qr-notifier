//For expanding sidebar
  import { fetchError, fetchStart, fetchSuccess } from './Common';
  import axios from 'axios';
  import moment from 'moment';
  import commonData from 'utils/commonData';
  
  import { authHeader } from '../../services/auth-header';
  
  //For setting Filtertype
  export const setOrderReceipt = (data, print) => {
    return dispatch => {
        const { customers, business, tax_disc, total_vatable, notes, gross_total } = data;
        const customer = (!customers || customers.length === 0) ? '-' : customers[0].name;
        const amount_paid = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_paid)
        const amount_payable = data.amount_payable > 0 ? new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_payable) : 0;
        const amount_due = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_due)
        const amount_change = data.amount_change > 0 ? new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_change) : 0;

        const order_date = moment(data.createdAt).format('LLL');
        const due_date = data.dueDate && moment(data.dueDate).format('LLL');
        const order_items = data.order_items.map((a, index) => {
          return { ...a, price: Number(a.price).toFixed(2), total: Number(a.total).toFixed(2), no: index + 1 }
        })
        let txd = typeof tax_disc === 'string' ? JSON.parse(tax_disc) : tax_disc;
        const newTaxDisc =  txd.map(a => {
          return {...a, total: Number(a.total).toFixed(2) }
        })

        let taxes = newTaxDisc.filter(a => a.type === 'tax');
        let charges = newTaxDisc.filter(a => a.type === 'charges')
        let discounts = newTaxDisc.filter(a => a.type === 'discounts')    
        let totalTaxes = taxes.length !== 0 ? Number( sumValue(taxes, 'total')).toFixed(2) : 0;
        let totalDiscounts = discounts.length !== 0 ? Number(sumValue(discounts, 'total')).toFixed(2) : 0;
        let totalCharges = charges.length !== 0 ? Number(sumValue(charges, 'total')).toFixed(2) : 0;




        const newData = {
          ...data,
            "report_type": "INVOICE-SUMMARY",
            "export_type": "pdf",
            "key": data.order_no,
            "parser": "invoice",
            "header": {
              business, bill_to: (!customers || customers.length === 0) ? {} : customers[0],
              invoice: { order_no: data.order_no, order_date, due_date }
            },
            "content": {
                ...data,
                name: customer,
                amount_paid,
                amount_payable,
                amount_due,
                order_date,
                order_items
            },
            "footer": {
              amount_paid,
              amount_payable,
              amount_change,
              amount_due,
              order_date,
              total_vatable,
              taxes: taxes.length !== 0 ? 
              { taxes, totalTaxes } : null,
              charges: charges.length !== 0 ? 
              { charges, totalCharges } : null,
              discounts: discounts.length !== 0 ? 
              { discounts, totalDiscounts  } : null,
              gross_total,
              notes
            },
            "page_options": {
              // "page_orientation": "portrait"
            }
          }
          

        dispatch(printReport(newData, print))

    };
  };

  export const setOrderReceipt1 = data => {
    return dispatch => {
        const { customers } = data;
        const customer = (!customers || customers.length === 0) ? '-' : customers[0].name;
        const amount_paid = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_paid)
        const amount_payable = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_payable)
        const amount_due = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_due)
        const order_date = moment(data.createdAt).format('LLL');
        const newData = {
            "report_type": "PAYMENT-RECEIPT",
            "export_type": "pdf",
            "key": data.order_no,
            "parser": "invoice",
            "header": {
              
            },
            "content": {
                ...data,
                name: customer,
                amount_paid,
                amount_payable,
                amount_due,
                order_date
            }
          }
          


        dispatch(printReport(newData))

    };
  };
  
  //Generate Order Receipt Report
  export const printReport = (data, print) => {
    return dispatch => {
      dispatch(fetchStart());
      axios
        .post(`${commonData.apiUrl}/documents?direct=${print}`, data, { headers: authHeader() })
        .then(data => {
          dispatch(fetchSuccess('Generation In Progress!'));
        })
        .catch(error => {
          dispatch(fetchError('Generation Faild, Something went wrong! '));
        });
    };
  };
  
 

  const sumValue = (data, field) => {
    return data.map(a => { return  a[field]}).reduce(function(previousValue, currentValue) {
      return  Number(previousValue + currentValue)
        });
  }