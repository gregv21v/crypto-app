import { Meteor } from 'meteor/meteor';
import { ConfigCollection } from '../api/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import Crypto from './Crypto.jsx';

const CryptoContainer = withTracker(({ id }) => {
  var crypto = ConfigCollection.findOne({"name":"CompareCrypto"})
  console.log(crypto)

  return {
    apiKey: crypto.fetch().apiKey
  };
})(Crypto);

export default CryptoContainer;
