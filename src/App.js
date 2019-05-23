import React, { Component } from 'react';
import Wrapper from './hoc/Wrapper/Wrapper';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';

class App extends Component {
    state = {
        sideDrawer: true
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
                    <BurgerBuilder />
                </main>
            </Wrapper>
        );
    }
}

export default App;