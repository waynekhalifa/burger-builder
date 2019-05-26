import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props)
        this.props.onInitIngredients();
    }

    updatePurchasable( ingredients ) {
        const sum = Object.keys( ingredients )
            .map(ingKeys => {
                return ingredients[ingKeys];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
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
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <Wrapper>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchase={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Wrapper>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchasedCanceled={this.purchaseCancelHandler}
                purchasedContinued={this.purchasedContinuedHandler} />;
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

const mapStateToProps = state => ({ 
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
});

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));