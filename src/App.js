import React, { Component } from 'react';
import Wrapper from './hoc/Wrapper/Wrapper';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';

class App extends Component {
    render() {
        return (
            <Wrapper>
                <div>
                    Toolbar, SideDrawer, navigation
                </div>
                <main>
                    <BurgerBuilder />
                </main>
            </Wrapper>
        );
    }
}

export default App;