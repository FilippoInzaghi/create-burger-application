import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
 return ( 
  <ul className={classes.NavigationItems}>
     <NavigationItem link='/' active>O nas</NavigationItem>
     <NavigationItem link='/'>Oferta</NavigationItem>
     <NavigationItem link='/'>Kontakt</NavigationItem>
  </ul>
  );
}
 
export default navigationItems;