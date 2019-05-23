import React from 'react';

const BuildControl = ( props ) => (
    <div className="build-control">
        <label className="build-control__label">{props.label}</label>
        <button
            className="build-control__less"
            onClick={props.removed}
            disabled={props.disabled}>Less</button>
        <button
            className="build-control__more"
            onClick={props.added}>More</button>
    </div>
);

export default BuildControl;