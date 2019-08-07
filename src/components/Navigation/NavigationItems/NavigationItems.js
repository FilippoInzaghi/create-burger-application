import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Create Your Burger!
      </NavigationItem>
      {props.authenticated ? (
        <NavigationItem link="/orders" exact={false}>
          Orders
        </NavigationItem>
      ) : null}
      {props.authenticated ? (
        <NavigationItem link="/logout" exact={false}>
          Log out
        </NavigationItem>
      ) : (
        <NavigationItem link="/auth" exact={false}>
          Log in
        </NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
