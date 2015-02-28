var express    = require('express');
var Transaction       = require('../models/transaction');

var router = express.Router();

// Routes that end in /transactions
// ----------------------------------------------------
router.route('')
/* GET /api/transactions
 * params:
 *   count - first # transactions
 *   startdate - earliest date of transaction to return
 *   enddate - latest date of transaction to return
 */
.get(function(req, res) {
    var count = req.query.count ? req.query.count : -1;
    var startDate = req.query.startdate ? new Date(req.query.startdate) : -1;
    var endDate = req.query.enddate ? new Date(req.query.enddate) : -1;

    var query = Transaction.find();

    // Query with passed in query strings.
    if (startDate > 0) { query = query.where('date').gte(startDate); }
    if (endDate > 0) { query = query.where('date').lte(endDate); }
    if (count > 0) { query = query.limit(count); }
    
    // Now send back resulting transactions
    query.exec(function(err, transactions) {
        if (err)
            res.send(err);
        
        res.json(transactions);
    });
})
// POST /api/transactions
.post(function(req, res) {
    var transaction = new Transaction({
        date: req.body.date,
        payee: req.body.payee,
        amount: req.body.amount,
        account: req.body.account,
        cleared: req.body.cleared,
        tag: req.body.tag
    });

    // Save transaction and check for errors
    transaction.save(function(err) {
        if (err)
            res.send(err);

        res.json(transaction);
    });

});


// Routes that end in /transactions/:transaction_id
// ----------------------------------------------------
router.route('/:transaction_id')
// GET /api/transactions/:transaction_id
.get(function(req, res) {
    Transaction.findById(req.params.transaction_id, function(err, transaction) {
        if (err)
            res.send(err);
        res.json(transaction);
    });
})
// PUT /api/transactions/:transaction_id
.put(function(req, res) {
    // Use transaction model to find transaction by id
    Transaction.findById(req.params.transaction_id, function(err, transaction) {
        if (err)
            res.send(err);
        
        // Only save fields that have been passed, without editing ones that have not.
        if (req.body.date !== undefined) { transaction.date = req.body.date; }
        if (req.body.payee !== undefined) { transaction.payee = req.body.payee; }
        if (req.body.amount !== undefined) { transaction.amount = req.body.amount; }
        if (req.body.account !== undefined) { transaction.account = req.body.account; }
        if (req.body.cleared !== undefined) { transaction.cleared = req.body.cleared; }
        if (req.body.tag !== undefined) { transaction.tag = req.body.tag; }

        // Save transaction and check for errors
        transaction.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Transaction Updated!' });
        });
    });
})
// DELETE /api/transactions/:transaction_id
.delete(function(req, res) {
    Transaction.remove({
        _id: req.params.transaction_id
    }, function(err, transaction) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully Deleted' });
    });
});

module.exports = router;