import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Burger from './Burger/Burger';
import BuildControls from './BuildControls/BuildControls';
import Modal from '../UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';

const INGEDIENT_PRICES = {
    salad: 0.5,
    meat: 0.4,
    bacon: 0.7,
    cheese: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchasable( ingredients ) {
        const sum = Object.keys( ingredients )
            .map(ingKeys => {
                return ingredients[ingKeys];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState(() => ({ purchasable: sum > 0 }));
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState(() => ({ ingredients: updatedIngredients, totalPrice: newPrice }));
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState(() => ({ ingredients: updatedIngredients, totalPrice: newPrice }));
        this.updatePurchasable(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Wrapper>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchase={this.state.purchasable} />
            </Wrapper>
        );
    }
}

export default BurgerBuilder;