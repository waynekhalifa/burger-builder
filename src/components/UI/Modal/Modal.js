import React from 'react';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ( props ) => (
    <Wrapper>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            className="modal"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Wrapper>
);

export default Modal;