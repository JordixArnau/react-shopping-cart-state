import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";
// import ShoppingCartItem from "./components/ShoppingCartItem"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartItems: [],
      isLoading: false,
      hasError: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    api.getProducts().then((data) => {
      console.log(data);
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  handleAddToCart(productId) {
    console.log(productId);
    const { cartItems } = this.state;
    console.log({ cartItems });
    const { products } = this.state;
    const [...rest] = products;
    let cont = 0;
    rest.forEach((eleme) => {
      if (eleme.id === productId) {
        cartItems.forEach((cItem) => {
          if (cItem.id === productId) {
            console.log("+1");
          } else {
            cont += 1;
          }
        });
        if (cont === cartItems.length || cartItems.length === 0) {
          this.setState({
            cartItems: cartItems,
          });
          cartItems.push(eleme);
        }
      }
    });
  }

  handleChange(event, preu, productId) {
    console.log(event, preu, productId);
    console.log(this);
  }

  handleRemove(productId) {
    let { cartItems } = this.state;
    console.log(productId);
    console.log(this);
    console.log(cartItems);
    const nou = cartItems.filter((elem) => elem.id !== productId);
    cartItems = nou;
    console.log(cartItems);
    this.setState({
      cartItems: cartItems,
    });
  }

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  // handleSetFavorite(productId) {}

  render() {
    const {
      cartItems,
      products,
      isLoading,
      hasError,
      loadingError,
    } = this.state;

    return (
      <Home
        cartItems={cartItems}
        products={products}
        isLoading={isLoading}
        hasError={hasError}
        loadingError={loadingError}
        handleDownVote={() => {}}
        handleUpVote={() => {}}
        handleSetFavorite={() => {}}
        handleAddToCart={(prop) => {
          this.handleAddToCart(prop);
        }}
        handleRemove={(item) => {
          this.handleRemove(item);
        }}
        handleChange={(ele, price, item) => {
          this.handleChange(ele, price, item);
        }}
      />
    );
  }
}

export default App;
