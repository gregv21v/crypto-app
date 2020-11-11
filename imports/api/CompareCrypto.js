

class CompareCrypto {

  constructor(apiKey) {
    this.apiKey = apiKey;
  }


  /**
    @description get the price of a cryptocurrency
      relative to another cryptocurrency
    @param baseCurrency the currency to be used to measure the other
      currencies by
      String
    @param currencies the currencies to do a price check for relative
      to the baseCurrency
      Array[String]
  */
  getPriceRelativeTo(baseCurrency, currencies) {
    const baseURL = "https://min-api.cryptocompare.com/data/price?"

    // make the currencies into a string
    let currenciesAsString = ""
    for (var i = 0; i < currencies.length-1; i++) {
      currenciesAsString += currencies[i] + ","
    }
    currenciesAsString += currencies[currencies.length - i]

    const fullURL = baseURL + "fsym=" + baseCurrency + "&tsyms=" +
      currenciesAsString + "&api_key=" + this.apiKey

    return axios.get(fullURL)
  }

  getPriceForDays(baseCurrency, currency, limit) {
    const baseURL = "https://min-api.cryptocompare.com/data/v2/histoday?"
    const fullURL = baseURL + "fsym=" + baseCurrency +
      "&tsym=" + currency + "&limit=" + limit

    return axios.get(fullURL)
  }
}

module.exports = CompareCrypto;
