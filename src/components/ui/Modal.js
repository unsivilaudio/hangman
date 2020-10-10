import React from 'react';

import Backdrop from './Backdrop';
import '../../assets/stylesheets/modal.css';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.clicked} />
                <div
                    className='modal'
                    style={{
                        transform: this.props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;
