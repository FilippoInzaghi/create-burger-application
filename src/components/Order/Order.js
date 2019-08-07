import React from 'react';
import classes from './Order.css'

const order = props => {
const order = props.orderDetails;
const date = order.date ? new Date(order.date) : "Sorry, I don't remember when you ordered this burger ;/";
 return (<div className={classes.Order}>
  <p>Ingredients: </p>
  <ul>
   {Object.keys(order.ingredients).map(((ingr, index) => (
    <li key={index}>{ingr}: <strong>{order.ingredients[ingr]}</strong></li>
   )))}
  </ul>
  <p>
   Order time: <strong>{date.toLocaleString()}</strong>
  </p>
  <p>Price: <strong>{Number(order.price).toFixed(2)}$</strong></p>
 </div>
 )
}


export default order;