import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import BurgerBuilder from './pages/BurgerBuilder/BurgerBuilder';
import Logout from './pages/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => {
    return import('./pages/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./pages/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./pages/Auth/Auth');
});

export const appRoutes = (
    <Switch>
        <Route path="/my-account" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
    </Switch>
);

export const protectedRoutes = (
    <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/my-account" component={asyncAuth} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
    </Switch>
);