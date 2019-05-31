import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const intialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGEDIENT_PRICES = {
    salad: 0.5,
    meat: 0.4,
    bacon: 0.7,
    cheese: 1.3
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGEDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]:state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGEDIENT_PRICES[action.ingredientName],
        building: true
    };
}

const setIngredients = (state, action) => {
    return (state, {
        ingredients: action.ingredients,
        totalPrice: 4, 
        error: true,
        building: false
    });
}

const fetchIngredientFail = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case(actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
        case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state,action);
        case(actionTypes.SET_INGREDIENTS): return setIngredients(state, action);
        case(actionTypes.FETCH_INGREDIENTS_FAIL): return fetchIngredientFail(state, action);
        default: return state;
    }
}

export default reducer;