import React from 'react';

const NavigationItem = ( props ) => (
    <li className="navigation-item">
        <a href={props.link} className="navigation-item__link">{props.children}</a>
    </li>
);

export default NavigationItem;