import { createStore, applyMiddleware } from 'redux';
import { combineForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import { handleChanges, enableChangeHandling } from 'redux-changes';
import { getJodaFormattedDate } from './util/DateTime';


export const defaultLoginState = {
    message: '',
    login: '',
    loginForm: '',
    password: '',
    id_token: '',
    isUserLoggedIn: false,
    modalIsOpen: false,
    afterPostSubmitFunction: null
};

const fakeLocation = {
    locationId: 1,
    name: 'Fake Location Name'
};


const paymentChangesHandler = handleChanges({
    'payment': (state, change, data) => {
        const oldPayment = Object.assign({}, change.value);
        const { paymentItems, invoiceAdjustment, alreadyPaid, availableCredit, discount } = change.value;
        var invoiceTotal = paymentItems.reduce(function(sum, invoiceItem) {
            var invoiceItemAmountWithDiscount = 0.0;
            if( parseFloat(invoiceItem.discountPercentage) > 0.0) {
                invoiceItemAmountWithDiscount = invoiceItem.paymentAmount - (invoiceItem.paymentAmount * invoiceItem.discountPercentage)/100.0
            } else {
                invoiceItemAmountWithDiscount = invoiceItem.paymentAmount - invoiceItem.discountAmount;
            }
            return sum + invoiceItemAmountWithDiscount;
        }, 0.0);
        var discountAmount = 0.0;
        if( discount ) {
            if( discount.discountType === parseInt(discountPercentageValue) ) {
                discountAmount = parseFloat(parseFloat(invoiceTotal * discount.discountPercentage / 100.00).toFixed(2));
            } else {
                discountAmount = parseFloat(parseFloat(discount.discountAmount).toFixed(2));
            }
        }
        const balance = invoiceTotal - parseFloat(invoiceAdjustment) - discountAmount - parseFloat(alreadyPaid);
        const outstandingBalance = balance - parseFloat(availableCredit);
        const newPaymentData = Object.assign({}, oldPayment, {discountAmount: discountAmount}, {invoiceTotal: invoiceTotal}, {balance: balance}, {outstandingBalance: outstandingBalance}, {paymentTotal: outstandingBalance});
        const newState = Object.assign({}, state, {payment: newPaymentData});
        return newState;
    }
});

const store = createStore(
    enableChangeHandling(
        combineForms({
            login: defaultLoginState
        }),
        paymentChangesHandler
    ),
    applyMiddleware(thunk)
);
export default store;
