import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, props.showBackdrop ? classes.Open : classes.Close].join(' ');
  return (
    <>
      <Backdrop show={props.showBackdrop} clicked={props.closed}/>
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
