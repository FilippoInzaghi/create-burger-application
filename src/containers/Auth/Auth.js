import React, { Component } from "react";
import classes from "./Auth.css";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          name: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 30
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  changeInputHandler = (e, inputIdentifier) => {
    // const orderForm = JSON.parse(JSON.stringify(this.state.orderForm));
    // orderForm[inputIdentifier].value = e.target.value
    // this.setState({
    //   orderForm
    // })

    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedControls[inputIdentifier]
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    } else updatedFormElement.valid = true;
    updatedControls[inputIdentifier] = updatedFormElement;

    // let formIsValid = true;
    // for (let inputIdentifier in updatedControls) {
    //   formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    // }

    // this.setState({ controls: updatedControls, formIsValid: formIsValid });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      isSignup: !prevState.isSignup
    }));
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        inputtype={formElement.config.elementType}
        elementconfig={formElement.config.elementConfig}
        shouldValidate={formElement.config.validation}
        valid={formElement.config.valid}
        value={formElement.config.value}
        touched={formElement.config.touched}
        changed={event =>
          this.changeInputHandler(event, formElement.config.elementConfig.name)
        }
      />
    ));

    let formToShow = (
      <>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignup ? "SIGN UP" : "SIGN IN"}
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </>
    );

    if (this.props.loading) {
      formToShow = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.authenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {formToShow}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authenticated: state.auth.token !== null,
    buildingBurger: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
