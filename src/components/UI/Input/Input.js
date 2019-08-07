import React from "react";
import classes from "./Input.css";
const input = props => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];

  if (!props.valid && props.shouldValidate && props.touched){
    inputClasses = [classes.InputElement, classes.Invalid]
  }
  if (props.valid && props.touched){
    inputClasses = [classes.InputElement, classes.Valid]
  }

  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementconfig}
          value={props.value} onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = 
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementconfig}
          value={props.value} onChange={props.changed}
        />;
            break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(' ')}
        value={props.value} onChange={props.changed}>
          {props.elementconfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementconfig} name='sraka'
          value={props.value} onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
