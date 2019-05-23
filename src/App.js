import React, { Component } from 'react';
import Wrapper from './hoc/Wrapper/Wrapper';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Toolbar from './components/Navigation/Toolbar/Toolbar';

class App extends Component {
    render() {
        return (
            <Wrapper>
                <Toolbar />
                <main className="main-content">
                    <BurgerBuilder />
                </main>
            </Wrapper>
        );
    }
}

export default App;