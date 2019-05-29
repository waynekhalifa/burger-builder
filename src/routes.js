import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BurgerBuilder from './pages/BurgerBuilder/BurgerBuilder';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import Auth from './pages/Auth/Auth';

export const routes = (
    <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/my-account" component={Auth} />
    </Switch>
);