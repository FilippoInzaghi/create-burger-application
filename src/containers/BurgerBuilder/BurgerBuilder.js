import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    showOrderSummary: false
  };

  addOrRemoveIngredientHandler = (type, addOrRemove) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = addOrRemove ? oldCount + 1 : oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = addOrRemove
      ? oldPrice + priceAddition
      : oldPrice - priceAddition;

    this.setState(prevState => ({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    }));
  };

  showModal = () => {
    this.setState(prevState => ({
      showOrderSummary: true
    }));
  };

  modalClosedClicked = () => {
    this.setState(prevState => ({
      showOrderSummary: false
    }));
    console.log("Klik");
  };

  orderSummaryBtnClicked = buttonType => {
    if (buttonType === "Danger") {
      const ingredients = {
        ...this.state.ingredients
      };
      Object.keys(ingredients).map(ingKey => (ingredients[ingKey] = 0));
      this.setState(prevState => ({
        showOrderSummary: false,
        ingredients,
        totalPrice: 4
      }));
    } else if (buttonType === 'Success'){
      alert('Potem dodamy połacznei z serwerem')
    }
  };

  render() {
    const purchasable = !Boolean(
      Object.keys(this.state.ingredients)
        .map(ingr => this.state.ingredients[ingr])
        .reduce((total, a) => (total += a), 0)
    );
    return (
      <>
        <Modal
          show={this.state.showOrderSummary}
          modalClosed={this.modalClosedClicked}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            orderSummaryBtnClicked={this.orderSummaryBtnClicked}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAddedOrRemoved={this.addOrRemoveIngredientHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchasable={purchasable}
          showModal={this.showModal}
        />
      </>
    );
  }
}
