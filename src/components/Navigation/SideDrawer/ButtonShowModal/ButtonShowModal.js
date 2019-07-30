import React from "react";
import classes from "./ButtonShowModal.css";

const buttonShowModal = props => {
  return (
    <div className={classes.ButtonShowModal} onClick={props.showModal}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default buttonShowModal;
