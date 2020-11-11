import React, {Component} from 'react'

/**
  Prices
  @description
*/
export default class Prices extends Component {
  /**
    props:
      @prop prices
  */
  constructor(props) {
    super(props)
  }

  currentPrice(symbol) {
    let endIndex = this.props.prices[symbol].length - 1

    if(endIndex < 0)
      return 0
    else
      return this.props.prices[symbol][endIndex].value;
  }

  render() {
    return (
      <ul>
        {
          Object.keys(this.props.prices).map(symbol => {
            return (
              <li key={symbol}>
                {symbol + ":" + this.currentPrice(symbol)}
              </li>
            )
          })
        }
      </ul>
    )
  }
}
