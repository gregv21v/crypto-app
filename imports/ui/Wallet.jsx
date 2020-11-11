import React, {Component} from 'react'

/*
  Wallet
  Description:
*/
export default class Wallet extends Component {

  /**
    Props:
      wallet an object of symbols and the quantity of
        that symbol that the person has.
  */
  constructor(props) {
    super(props)
  }

  renderRow(symbol) {
    return (
      <tr key={symbol}>
        <td>
          {symbol}
        </td>
        <td>
          {this.props.wallet[symbol]}
        </td>
      </tr>
    )
  }


  render() {
    return (
      <table>
        <tbody>
          {
            Object.keys(this.props.wallet).map(symbol => {
              return this.renderRow(symbol)
            })
          }
        </tbody>
      </table>
    )
  }
}
