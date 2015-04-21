// app/models/transaction.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlanSchema   = new Schema({
  monthlyIncome: Number,
  monthlyBills: Number,
  monthlySavings: Number,
});

module.exports = mongoose.model('Plan', PlanSchema);
