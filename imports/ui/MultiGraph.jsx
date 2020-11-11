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
      isSymbolVisible: [],
      currentSymbols: [],
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
    let isSymbolVisible = {}
    for(let key of Object.keys(this.props.prices)) {
      isSymbolVisible[key] = false
    }
    this.setState({
      currentSymbol: Object.keys(this.props.prices)[0],
      isSymbolVisible: isSymbolVisible
    })
  }

  symbolToColor(symbol) {
    var total = 0;
    let colors = [
      "red",
      "blue",
      "orange",
      "green",
      "teal",
      "violet",
      "pink",
      "yellow"
    ]

    for(var i = 0; i < symbol.length; i++) {
      total += symbol.charCodeAt(i);
    }
    return colors[total % colors.length];
  }


  /**
    toggleSymbol()
    @description toggles whether a particular symbol is shown
      on the graph
    @param symbol the symbol to be toggled

  */
  toggleSymbol(symbol) {
    let isSymbolVisible = this.state.isSymbolVisible;
    let data = this.state.data;

    isSymbolVisible[symbol] = !isSymbolVisible[symbol]
    data.datasets = [];
    data.labels = this.props.prices[symbol].map(price =>
      price.timestamp.getHours() + ":" + price.timestamp.getMinutes() + "." + price.timestamp.getSeconds())

    for(var symbol of Object.keys(isSymbolVisible)) {
      if(isSymbolVisible[symbol]) {
        var newDataset = {
          label: 'Price of ' + symbol,
          data: this.props.prices[symbol].map(price => price.value),
          fill: false,
          backgroundColor: this.symbolToColor(symbol),
          borderColor: this.symbolToColor(symbol),
        }

        data.datasets.push(newDataset)
      }
    }

    this.setState({
      isSymbolVisible: isSymbolVisible,
      data: data
    })
  }

  /**
    clear
    @description clear all the symbols from the graph
  */
  clearSymbols() {
    let isSymbolVisible = this.state.isSymbolVisible;
    let data = this.state.data;

    data.datasets = [];
    for(var symbol of Object.keys(isSymbolVisible)) {
      isSymbolVisible[symbol] = false;
    }

    this.setState({
      isSymbolVisible: isSymbolVisible,
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
                  onClick={() => this.toggleSymbol(symbol)}
                  value={symbol} />
              )
            })
          }
        </div>
        <div>
          <input
            type="submit"
            onClick={() => this.clearSymbols()}
            value="Clear" />
        </div>
      </div>
    )
  }
}
