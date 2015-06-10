// app/models/transaction.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TransactionSchema = new Schema({
  date: Date,
  payee: String,
  amount: Number,
  account: String,
  cleared: Boolean,
  tag: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
