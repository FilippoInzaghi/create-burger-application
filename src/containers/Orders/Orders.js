import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
class Orders extends Component {

 componentDidMount(){
    this.props.onFetchOrders(this.props.token)
  }

 render() { 
  const orders = this.props.orders.sort((a, b) => {
   if (!a.date){
    a.date = 0
   };
   if (!b.date){
    b.date = 0
   };
   return new Date(b.date).getTime() - new Date(a.date).getTime()
  }).map((order => (
   <Order key={order.id} orderDetails={order} />
  )
 ));
  return ( 
   <div>
      {this.props.loading ? <Spinner/> : orders}
   </div>
   );
 }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));