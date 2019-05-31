import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import BurgerBuilder from './pages/BurgerBuilder/BurgerBuilder';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import Auth from './pages/Auth/Auth';
import Logout from './pages/Auth/Logout/Logout';

export const appRoutes = (
    <Switch>
        <Route path="/my-account" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
    </Switch>
);

export const protectedRoutes = (
    <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/my-account" component={Auth} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
    </Switch>
);