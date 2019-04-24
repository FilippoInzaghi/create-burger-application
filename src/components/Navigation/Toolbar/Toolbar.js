import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ButtonShowModal from "../SideDrawer/ButtonShowModal/ButtonShowModal";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <ButtonShowModal showModal={props.showModal}/>
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
