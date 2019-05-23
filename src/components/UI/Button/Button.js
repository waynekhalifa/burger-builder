import React from 'react';

const Button = ( props ) => (
    <button
        className={["button", props.btnType].join(' ')}
        onClick={props.onClick}>{props.children}</button>
);

export default Button;