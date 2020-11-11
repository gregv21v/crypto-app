import React, {Component} from 'react'
import {Mongo} from "meteor/mongo"

import Prices from "./Prices.jsx"
import Wallet from "./Wallet.jsx"
import Graph from "./Graph.jsx"
import MultiGraph from "./MultiGraph.jsx"


/**
  Crypto
  description:
*/


/**
  Algorithm:
    Lets say we have 2 cryptocurrencies: a, and b.
    When a is less then b by an interval equal to


*/

export default class Crypto extends Component {
  constructor(props) {
    super(props)

    const symbols = [
      "ATOM",
      "BTC",
      "COMP",
      "CGLD",
      "ETH",
      "STMX",
      "MKR",
      "XTZ"
    ]

    // create price arrays
    let prices = {};
    for(let symbol of symbols) {
      prices[symbol] = []
    }

    this.state = {
      symbols: symbols,
      prices: prices,
      wallet: {
        ATOM: 1,
        BTC: 1
      },
      from: "ATOM",
      fromAmount: 0,
      to: "ATOM",
      currentSymbol: "ATOM"
    }



    this.fromOnChange = this.fromOnChange.bind(this)
    this.fromAmountOnChange = this.fromAmountOnChange.bind(this)
    this.toOnChange = this.toOnChange.bind(this)
    this.convert = this.convert.bind(this)
  }


  updatePrices() {
    var prices = this.state.prices;
    var _timestamp = new Date();

    Meteor.call("getPriceRelativeTo", "USD", this.state.symbols, (error, result) => {
      for(var key of this.state.symbols) {
        prices[key].push({
          timestamp: _timestamp,
          value: result.data[key]
        })
      }

      this.setState({
        prices: prices
      })
    })
  }


  componentWillMount() {
    this.updatePrices()
    this.interval = setInterval(() => {
      this.updatePrices()
    }, 10000)
  }

  fromOnChange(event) {
    console.log(event.target.value);
    this.setState({
      from: event.target.value
    })
  }
  fromAmountOnChange(event) {
    this.setState({
      fromAmount: event.target.value
    })
  }
  toOnChange(event) {
    console.log(event.target.value);
    this.setState({
      to: event.target.value
    })
  }



  /**
    convert
    @description: convert the one cryptocurrency to another
  */
  convert() {
    //console.log("To From");
    //console.log([this.state.from]);
    //console.log(this.state.to);
    //                                     ATOM              BTC
    Meteor.call("getPriceRelativeTo", this.state.from, [this.state.to], (error, result) => {
      // this will give me how many "to" coins is equal to one "from" coin.
      var price = result.data[this.state.to]; // how many "BTC"s one "ATOM" is worth
      //console.log(result.data);
      //console.log(price);

      // if I want to convert 1 ATOM to however many BTC
      var toAmount = price * this.state.fromAmount;
      var tempWallet = this.state.wallet
      tempWallet[this.state.to] += toAmount
      tempWallet[this.state.from] -= this.state.fromAmount

      //console.log(tempWallet);
      this.setState({
        wallet: tempWallet
      })

    })

     event.preventDefault();
  }



  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
    render()
    @description renders the component
  */
  render() {
    return (
      <div>
        <div>
          <h2>Prices</h2>
          <Prices prices={this.state.prices} />
        </div>
        <div>
          <h2>Individual Prices</h2>
          <Graph prices={this.state.prices} />
        </div>
        <div>
          <h2>Multiple Prices</h2>
          <MultiGraph prices={this.state.prices} />
        </div>
        <div>
          <h2>Wallet</h2>
          <Wallet wallet={this.state.wallet} />

          <div>
            <br />
            <label>
              From:
              <select
                value={this.state.from}
                onChange={this.fromOnChange}>
                {
                  Object.keys(this.state.wallet).map(symbol => {
                    return (
                      <option key={symbol} value={symbol}>{symbol}</option>
                    )
                  })
                }
              </select>
            </label>
            <input type="text"
              placeholder="amount"
              value={this.state.fromAmount}
              onChange={this.fromAmountOnChange}/> <br/>
            <label>
              To:
              <select
                value={this.state.to}
                onChange={this.toOnChange}>
                {
                  Object.keys(this.state.wallet).map(symbol => {
                    return (
                      <option key={symbol} value={symbol}>{symbol}</option>
                    )
                  })
                }
              </select>
            </label> <br />
            <input type="submit" onClick={this.convert} value="Convert" />
          </div>
        </div>
      </div>
    )
  }
}
