var express    = require('express');
var Plan       = require('../models/plan');

var router = express.Router();

var getPlan = function(req, res) {
  var query = Plan.findOne();

  // Now send back resulting plan
  query.exec(function(err, plan) {
    if (err) res.send(err);
    
    plan = plan || new Plan({
      monthlyIncome: 0,
      monthlyBills: 0,
      monthlySavings: 0
    });
    
    res.json(plan);
  });
};

var updatePlan = function(req, res) {
  Plan.findOne({}, function(err, plan) {
    if (err) res.send(err);

    if (plan) {
      // Only save fields that have been passed, without editing ones that have not.
      if (req.body.monthlyIncome !== undefined) { plan.monthlyIncome = req.body.monthlyIncome; }
      if (req.body.monthlyBills !== undefined) { plan.monthlyBills = req.body.monthlyBills; }
      if (req.body.monthlySavings !== undefined) { plan.monthlySavings = req.body.monthlySavings; }
    } else {
      plan = new Plan({
        monthlyIncome: req.body.monthlyIncome,
        monthlyBills: req.body.monthlyBills,
        monthlySavings: req.body.monthlySavings
      });
    }

    plan.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Plan Updated!' });
    });
  });
};

// Routes that end in /plan
// ----------------------------------------------------
router.route('')
// GET /api/plan
  .get(getPlan)
// POST /api/plan
  .post(updatePlan)
// PUT /api/plan
  .put(updatePlan);

module.exports = router;