import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ( props ) => (
    <ul className="navigation">
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="#">Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;