import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';
import classes2 from '../../Navigation/NavigationItems/NavigationItem/NavigationItem.css'

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }

];

const buildControls = props => {
  let buildControlsPanel = <>
    <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
    {controls.map((ctrl, index) => (
      <BuildControl key={ctrl.label + index} label={ctrl.label} added={() => props.ingredientAdded(ctrl.type)} removed={() => props.ingredientRemoved(ctrl.type)}
        type={ctrl.type}
        ingredients={props.ingredients} />
    ))}
    <button
      className={classes.OrderButton}
      disabled={props.purchasable}
      onClick={props.showModal}>{props.authenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </>
  if (props.authenticated === null) {
    buildControlsPanel = <>
      <p>You have to log in to add ingredients!</p>
      <NavigationItem className={classes2.NavigationItem} link='/auth'>Log in</NavigationItem>
    </>
  }

  return (
    <div className={classes.BuildControls}>
      {buildControlsPanel}
    </div>
  );
};

export default buildControls;
