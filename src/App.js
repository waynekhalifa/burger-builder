import React, { Component } from 'react';
import Wrapper from './hoc/Wrapper/Wrapper';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import { routes } from './routes';

class App extends Component {
    state = {
        sideDrawer: false
    }
    sideDrawerToggleHandler = () => {
        this.setState(() => ({ sideDrawer: true }));
    }
    sideDrawerClosedHandler = () => {
        this.setState(() => ({ sideDrawer: false }));
    }
    render() {
        return (
            <Wrapper>
                <Toolbar openDrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.sideDrawer}
                    close={this.sideDrawerClosedHandler} />
                <main className="main-content">
                    {routes}
                </main>
            </Wrapper>
        );
    }
}

export default App;