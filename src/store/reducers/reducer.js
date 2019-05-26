import * as actionTypes from '../actions/actionTypes';

const intialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 4,
}

const INGEDIENT_PRICES = {
    salad: 0.5,
    meat: 0.4,
    bacon: 0.7,
    cheese: 1.3
}

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case(actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGEDIENT_PRICES[action.ingredientName]
            };
        case(actionTypes.REMOVE_INGREDIENT):;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGEDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
}

export default reducer;