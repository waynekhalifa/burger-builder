import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const CheckoutSummary = ( props ) => (
    <div className="checkout-summary">
        <h1>We hope it tastes well!</h1>
        <div>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button
            btnType="danger"
            onClick={props.checkoutCancelled}>CANCEL</Button>
        <Button
            btnType="success"
            onClick={props.checkoutContinued}>CONTINUE</Button>
    </div>
);

export default CheckoutSummary;