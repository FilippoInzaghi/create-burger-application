import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "name",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "street",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4
        },
        valid: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "postalCode",
          placeholder: "ZIP Code"
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 8
        },
        value: "",
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "country",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          name: "deliveryMethod",
          placeholder: "Delivery Method",
          options: [
            {
              value: "fastest",
              displayValue: "fastest"
            },
            {
              value: "normal",
              displayValue: "normal"
            },
            {
              value: "cheapest",
              displayValue: "cheapest"
            }
          ]
        },
        value: "fastest",
        touched: false
      }
    },
    formIsValid: false,
    date: null
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail){
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric){
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  changeInputHandler = (e, inputIdentifier) => {
    // const orderForm = JSON.parse(JSON.stringify(this.state.orderForm));
    // orderForm[inputIdentifier].value = e.target.value
    // this.setState({
    //   orderForm
    // })

    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    } else updatedFormElement.valid = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  clearAllDataHandler = () => {
    const formUpdatedClear = JSON.parse(JSON.stringify(this.state.orderForm));
    // const formUpdatedClear = {};
    for (let fieldToClear in formUpdatedClear) {
      formUpdatedClear[fieldToClear].value = "";
    }
    this.setState({
      orderForm: formUpdatedClear
    });
  };

  orderHandler = event => {
    event.preventDefault();
    const dateOfPurchase = new Date();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const orderObject = {
      userId: this.props.userId,
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
      date: dateOfPurchase
    };
    this.props.onOrderBurger(orderObject, this.props.token)
  };
  render() {
    let formShow = (
      <>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {Object.values(this.state.orderForm).map((inputElement, index) => (
            <Input
              key={index}
              inputtype={inputElement.elementType}
              elementconfig={inputElement.elementConfig}
              shouldValidate={inputElement.validation}
              valid={inputElement.valid}
              value={inputElement.value}
              touched={inputElement.touched}
              changed={event =>
                this.changeInputHandler(event, inputElement.elementConfig.name)
              }
            />
          ))}

          <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
        <input
          className={classes.Input}
          type="button"
          value="Clear all data"
          onClick={this.clearAllDataHandler}
        />
      </>
    );
    if (this.props.loading) {
      formShow = <Spinner />;
    }
    return <div className={classes.ContactData}>{formShow}</div>;
  }
}

const mapStateToProps = state => {
  return{
    ings: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
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
