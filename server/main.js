import { Meteor } from 'meteor/meteor';
import { ConfigCollection } from '/imports/api/config'
import {CRYPTO_COMPARE_API_KEY} from "./apiKeys.js"


Meteor.methods({
  /**
    getPriceRelativeTo()
    @description get the price of a cryptocurrency
      relative to another cryptocurrency
    @param apiKey your api key
      String
    @param baseCurrency the currency to be used to measure the other
      currencies by
      String
    @param currencies the currencies to do a price check for relative
      to the baseCurrency
      Array[String]

    @returns {symbol:price, ...}
  */
  getPriceRelativeTo: function(baseCurrency, currencies) {
    const baseURL = "https://min-api.cryptocompare.com/data/price?"

    console.log(currencies);

    // make the currencies into a string
    let currenciesAsString = ""
    if(currencies.length > 1) {
      for (var i = 0; i < currencies.length-1; i++) {
        currenciesAsString += currencies[i] + ","
      }
      currenciesAsString += currencies[currencies.length - 1]
    } else {
      currenciesAsString = currencies[0]
    }

    const fullURL = baseURL + "fsym=" + baseCurrency + "&tsyms=" +
      currenciesAsString + "&api_key=" + CRYPTO_COMPARE_API_KEY

    console.log(fullURL)

    return HTTP.call("get", fullURL)
  },


  /**
    getPriceForToday()
    @description get price of bitcoin for the day
    @param apiKey your api key
      String
    @param baseCurrency the currency to be used to measure the other
      currencies by
      String
    @param currencies the currency to get the price for relative
      to the baseCurrency
      Array[String]
    @param limit how many price points to get for the day
      Number
  */
  getPriceForToday: function(baseCurrency, currency, limit) {
    const baseURL = "https://min-api.cryptocompare.com/data/v2/histoday?"
    const fullURL = baseURL + "fsym=" + baseCurrency +
      "&tsym=" + currency + "&limit=" + limit + "&api_key=" + CRYPTO_COMPARE_API_KEY

    return HTTP.call("get", fullURL)
  }
})
