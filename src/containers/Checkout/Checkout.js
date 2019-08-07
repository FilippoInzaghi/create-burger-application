import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {

  clickedButtonHandler = buttonType => {
    if (buttonType === "Danger") {
      this.props.history.goBack();
    } else if (buttonType === "Success") {
      this.props.history.replace("checkout/contact-data");
    }
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            clickedButtonHandler={this.clickedButtonHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(
  mapStateToProps,
)(Checkout);
