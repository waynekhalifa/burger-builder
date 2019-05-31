import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from './hoc/Wrapper/Wrapper';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import { appRoutes, protectedRoutes } from './routes';
import * as actions from './store/actions';

class App extends Component {
    state = {
        sideDrawer: false
    }
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { sideDrawer: !prevState.sideDrawer };
        } );
    }
    sideDrawerClosedHandler = () => {
        this.setState(() => ({ sideDrawer: false }));
    }
    render() {
        let routes = appRoutes;
        if ( this.props.isAuthenticated ) {
            routes = protectedRoutes;
        }
        return (
            <Wrapper>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    openDrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.sideDrawer}
                    close={this.sideDrawerClosedHandler} />
                <main className="main-content">
                    {routes}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});
  
const mapDispatchToProps = dispatch => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);