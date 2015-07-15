module.exports = function (app) {
  var AccountHolder = app.models.AccountHolder;

  var addAccounts = function (ah, accName) {
    ah.Accounts.findOne({ where: { name: accName } }, function (err, account) {
      if (err || account) return;

      ah.Accounts.create({ name: accName }, function (err, account) {
        if (err) throw err;

        console.log('Created account:', account);
      });
    });
  };

  AccountHolder.find({ where: { email: 'demo@demo.com' } }, function (err, ah) {
    if (err || (ah && ah.length > 0 && ah[0].id)) {
      if (err) throw err;
      
      addAccounts(ah[0], 'Savings Account');
      addAccounts(ah[0], 'Checking Account');
      return;
    };

    AccountHolder.create([
      { username: 'demo', email: 'demo@demo.com', password: 'demo' }
    ], function (err, accountHolder) {
        if (err) throw err;

        console.log('Created account holder:', accountHolder);

        accountHolder[0].Plan.create({
          monthlyIncome: 0,
          monthlyBills: 0,
          monthlySavings: 0
        }, function (err, plan) {
            if (err) throw err;

            console.log('Created plan:', plan);
          });

        // addAccounts(accountHolder[0], 'Savings Account');
        // addAccounts(accountHolder[0], 'Checking Account');
      });
  });

};