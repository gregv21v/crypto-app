import React, {Component} from 'react'
import { Line } from 'react-chartjs-2';

/**
  Graph
  @description a graph of the price of a certain
    cryptocurrency
*/
export default class Graph extends Component {

  /**
    Props:
      prices
  */
  constructor(props) {
    super(props)

    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Price of ',
            data: [],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ]
      }
    }
  }

  componentWillMount() {
    this.setState({
      currentSymbol: Object.keys(this.props.prices)[0]
    })
  }

  changeGraph(symbol) {
    // update data
    let data = this.state.data

    // get values

    data.datasets[0].data = this.props.prices[symbol].map(price => price.value)
    data.labels = this.props.prices[symbol].map(price =>
      price.timestamp.getHours() + ":" + price.timestamp.getMinutes() + "." + price.timestamp.getSeconds())
    data.datasets[0].label = "Price of " + symbol

    this.setState({
      data: data
    })
  }


  render() {
    return (
      <div>
        <div>
          <Line data={this.state.data} />
        </div>
        <div>
          {
            Object.keys(this.props.prices).map(symbol => {
              return (
                <input
                  key={symbol}
                  type="submit"
                  onClick={() => this.changeGraph(symbol)}
                  value={symbol} />
              )
            })
          }
        </div>
      </div>
    )
  }
}
