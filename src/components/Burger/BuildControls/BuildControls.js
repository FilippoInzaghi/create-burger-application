import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
     <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
      {controls.map((ctrl, index) => (
        <BuildControl key={ctrl.label + index} label={ctrl.label} ingredientAddedOrRemoved={props.ingredientAddedOrRemoved}
        type={ctrl.type}
        ingredients={props.ingredients} />
      ))}
      <button className={classes.OrderButton} disabled={props.purchasable} onClick={props.showModal}>ORDER NOW</button>
    </div>
  );
};

export default buildControls;
