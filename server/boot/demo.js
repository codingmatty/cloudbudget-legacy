module.exports = function(app) {
  var AccountHolder = app.models.AccountHolder;

  AccountHolder.create([
    {username: 'demo', email: 'demo@demo.com', password: 'demo'}
  ], function(err, accountHolder) {
    if (err) throw err;

    console.log('Created account holder:', accountHolder);

    accountHolder[0].Plan.create({
      monthlyIncome: 0,
      monthlyBills: 0,
      monthlySavings: 0
    }, function(err, plan) {
      if (err) throw err;

      console.log('Created plan:', plan);
    });
  });
};