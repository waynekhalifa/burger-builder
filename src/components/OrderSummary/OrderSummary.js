import React from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Button from '../UI/Button/Button';

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
            <Button
                btnType="danger" 
                onClick={props.purchasedCanceled}>CANCEL</Button>
            <Button
                btnType="success"
                onClick={props.purchasedContinued}>CONTINUE</Button>
        </Wrapper>
    );
}


export default OrderSummary;