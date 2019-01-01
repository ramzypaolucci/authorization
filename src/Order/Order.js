import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from '../constants';
import axios from 'axios';

class Order extends Component {
  componentWillMount() {
    this.setState({ message: '' });
  }
  order() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${API_URL}/public`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  displayOrder() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated() && localStorage.getItem('email_verified') === 'false') {
      return(<p>You are logged in! But you need to verify your email before you can order pizza.</p>)
    }
    if (isAuthenticated() && localStorage.getItem('email_verified') === 'true') {
      return (<Button bsStyle="primary" onClick={this.order.bind(this)}>
                Order Here!
              </Button>)
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { message } = this.state;
    return ( 
      <div className="container">
        <h1>Fresh Pizza for Pickup or Delivery</h1>
        {
          !isAuthenticated() &&
            <p>Log in to make an order</p>
        }
        {
          this.displayOrder()
        }
        <h2>{message}</h2>
      </div>
    );
  }
}

export default Order;
