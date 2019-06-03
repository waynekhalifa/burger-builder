import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            delivaryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'cheapest', text: 'Cheapest' },
                        { value: 'fastest', text: 'Fastest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState(() => ({ loading: true }));
        const formData = {};
        for(let name in this.state.orderForm){
            formData[name] = this.state.orderForm[name].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, identifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation),
            touched: true,
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [identifier]: updatedFormElement
        });

        let formIsValid = true;
        for(let identifier in updatedOrderForm){
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    render() {
        const elemenetsArray = [];

        for(let key in this.state.orderForm){
            elemenetsArray.push({
                id: key,
                config: this.state.orderForm[key]  
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {elemenetsArray.map(formElement => (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button
                    btnType="success" 
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if ( this.props.loading ) {
            form = <Spinner />
        }
        return (
            <div className="contact-info">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));