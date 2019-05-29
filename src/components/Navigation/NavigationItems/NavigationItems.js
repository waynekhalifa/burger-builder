import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ( props ) => (
    <ul className="navigation">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/my-account">Account</NavigationItem>
    </ul>
);

export default NavigationItems;