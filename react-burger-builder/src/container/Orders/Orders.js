import React, { Component } from "react";
import Order from "../../component/Order/Order";
import axios from "../../axios-order";
import WithErrorHandler from "../../withErrorHandler/WithErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://react-udumy-taru.firebaseio.com/orders.json")
      .then((response) => {
        let fetchedOrder = [];
        for (let key in response.data) {
          fetchedOrder.push({ ...response.data[key], id: key });
        }
        console.log("key :: ", fetchedOrder);
        this.setState({ orders: fetchedOrder, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.orders.length);
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default WithErrorHandler(Orders, axios);
