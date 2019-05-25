import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGEDIENT_PRICES = {
    salad: 0.5,
    meat: 0.4,
    bacon: 0.7,
    cheese: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState(() => ({ ingredients: response.data }));
            })
            .catch(error => {
                this.setState(() => ({ error: true }));
            });
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

    purchaseHandler = () => {
        this.setState(() => ({ purchasing: true }));
    }
    
    purchaseCancelHandler = () => {
        this.setState(() => ({ purchasing: false }));
    }

    purchasedContinuedHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.state.ingredients ) {
            burger = (
                <Wrapper>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchase={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Wrapper>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchasedCanceled={this.purchaseCancelHandler}
                purchasedContinued={this.purchasedContinuedHandler} />;
        }

        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }

        return (
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Wrapper>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);