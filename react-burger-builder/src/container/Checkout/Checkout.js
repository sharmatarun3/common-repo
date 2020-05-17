import React, { Component } from "react";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";
import { Route } from "react-router-dom";
class Checkout extends Component {
  state = {
    ingrediants: null,
    totolPrice: 0,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingrediants = {};
    let totolPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === "totolPrice") {
        totolPrice = +param[1];
      } else {
        ingrediants[param[0]] = +param[1];
      }
    }

    this.setState({ ingrediants, totolPrice: totolPrice.toFixed(2) }, () => {
      console.log("checkout.js State :: ", this.state);
    });
  }
  checkoutCancel = () => {
    console.log("Checkout :: ", this.props);
    this.props.history.goBack();
  };
  checkoutContinue = () => {
    console.log("Checkout :: ", this.props);
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingrediants={this.state.ingrediants}
          checkoutCancel={this.checkoutCancel}
          checkoutContinue={this.checkoutContinue}
        />
        {/* <ContactData /> */}
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingrediants={this.state.ingrediants}
              totolPrice={this.state.totolPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;
