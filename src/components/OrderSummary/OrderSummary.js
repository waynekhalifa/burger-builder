import React from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const OrderSummary = ( props ) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingKeys => (
            <li key={ingKeys}>
                <span style={{ textTransform: 'capitalize' }}>{ingKeys}</span> {props.ingredients[ingKeys]}
            </li>
        ));
    return (
        <Wrapper>
            <h1>Your Order</h1>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Wrapper>
    );
}


export default OrderSummary;