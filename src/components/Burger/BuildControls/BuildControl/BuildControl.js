import React, {useEffect} from "react";
import classes from "./BuildControl.css";

const buildControl = props => {
 useEffect(() => {
  if(props.ingredients[props.type] === 3)
   alert(`Hey, wait! it's enough! Leave some ${props.type} for other people`)
 }, [props.ingredients[props.type]])

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={props.removed} disabled={!props.ingredients[props.type]}>Less</button>
      <button className={classes.More} onClick={props.added} disabled={props.ingredients[props.type] === 3 ? true : false}>More</button>
    </div>
  );
};

export default buildControl;
