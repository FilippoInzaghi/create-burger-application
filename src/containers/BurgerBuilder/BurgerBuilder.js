import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../..//axios-orders';

export class BurgerBuilder extends Component {
  state = {
    showOrderSummary: false,
  };

  componentDidMount() {
    this.props.onInitIngredients()
  }

  // addOrRemoveIngredientHandler = (type, addOrRemove) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = addOrRemove ? oldCount + 1 : oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.props.ings
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.props.totalPrice;
  //   const newPrice = addOrRemove
  //     ? oldPrice + priceAddition
  //     : oldPrice - priceAddition;

  //   this.setState(prevState => ({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   }));
  // };

  showModal = () => {
    if (this.props.authenticated){
    this.setState(prevState => ({
      showOrderSummary: true,
    }));
  } else {
    this.props.onSetAuthRedirectPath('/checkout');
    this.props.history.push('/auth')
  }
  };

  modalClosedClicked = () => {
    this.setState(prevState => ({
      showOrderSummary: false,
    }));
  };

  orderSummaryBtnClicked = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout')
  };

  render() {
    const purchasable =
      this.props.ings === null
        ? null
        : !Boolean(
            Object.keys(this.props.ings)
              .map(ingr => this.props.ings[ingr])
              .reduce((total, a) => (total += a), 0)
          );
    let orderSummary =
      this.props.ings === null ? null : (
        <OrderSummary
          ingredients={this.props.ings}
          orderSummaryBtnClicked={this.orderSummaryBtnClicked}
          price={this.props.totalPrice}
        />
      );

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ingredients={this.props.ings}
            price={this.props.totalPrice}
            purchasable={purchasable}
            showModal={this.showModal}
            authenticated={this.props.authenticated}
          /> 
        </React.Fragment>
      );
    }
    return (
      <>
        <Modal
          show={this.state.showOrderSummary}
          modalClosed={this.modalClosedClicked}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
