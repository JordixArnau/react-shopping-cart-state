import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

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
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  handleAddToCart(productId) {
    const { cartItems } = this.state;
    const { products } = this.state;
    const [...rest] = products;
    let cont = 0;
    rest.forEach((eleme) => {
      if (eleme.id === productId) {
        cartItems.forEach((cItem) => {
          if (cItem.id === productId) {
            // eslint-disable-next-line
            console.log("entra2");
            // eslint-disable-next-line
            const inicialQ = cItem.price / cItem.quantity;
            // eslint-disable-next-line
            console.log("quantity", inicialQ);
            // eslint-disable-next-line
            cItem.quantity += 1;
            // eslint-disable-next-line
            cItem.price = inicialQ * cItem.quantity;
            // eslint-disable-next-line
            console.log(cItem);
            // }
          } else {
            cont += 1;
          }
        });
        if (cont === cartItems.length || cartItems.length === 0) {
          // eslint-disable-next-line
          eleme.quantity = 1;
          cartItems.push(eleme);
        }
      }
    });
    this.setState({
      cartItems: cartItems,
    });
  }

  handleChange(event, preu, productId) {
    // eslint-disable-next-line
    let { cartItems } = this.state;
    // eslint-disable-next-line
    console.log(event, preu, productId);
    // eslint-disable-next-line
    console.log(this);
  }

  handleRemove(productId) {
    let { cartItems } = this.state;
    // eslint-disable-next-line
    console.log(productId);
    // eslint-disable-next-line
    console.log(this);
    // eslint-disable-next-line
    console.log(cartItems);
    const nou = cartItems.filter((elem) => elem.id !== productId);
    cartItems = nou;
    // eslint-disable-next-line
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
