import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
});

export const purchaseBurgerFail = error => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
}

export const fetchOrderStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrderSuccess = orders => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrderFail = error => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
});

export const fetchOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams)
                .then(res => {
                    const fetchedOrders = [];
                    for(let key in res.data){
                        fetchedOrders.push({
                            id: key,
                            ...res.data[key]
                        })
                    }
                    dispatch(fetchOrderSuccess(fetchedOrders));
                })
                .catch(error => {
                    dispatch(fetchOrderFail(error));
                });
    }
}