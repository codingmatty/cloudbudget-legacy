var express    = require('express');
var Transaction       = require('../models/transaction');

var router = express.Router();

// on routes that end in /transactions
// ----------------------------------------------------
router.route('')

    // create a transaction (accessed at POST http://localhost:8080/api/transactions)
    .post(function(req, res) {
        
        var transaction = new Transaction({
          date: req.body.date,
          payee: req.body.payee,
          amount: req.body.amount,
          account: req.body.account,
          cleared: req.body.cleared,
          tag: req.body.tag
        });
        
        // save the transaction and check for errors
        transaction.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Transaction created!' });
        });
        
    })

    // get all the transactions (accessed at GET http://localhost:8080/api/transactions)
    .get(function(req, res) {
        var callback = function(err, transactions) {
            if (err)
                res.send(err);

            res.json(transactions);
          };
        var count = req.query.count ? req.query.count : -1;
        
        var query = Transaction.find();
  
        if (count > 0) {
          query.limit(count).exec(callback);
        } else {
          query.exec(callback);
        }
    });
    

// on routes that end in /transactions/:transaction_id
// ----------------------------------------------------
router.route('/:transaction_id')

    // get the transaction with that id (accessed at GET http://localhost:8080/api/transactions/:transaction_id)
    .get(function(req, res) {
        Transaction.findById(req.params.transaction_id, function(err, transaction) {
            if (err)
                res.send(err);
            res.json(transaction);
        });
    })
    
    // update the transaction with this id (accessed at PUT http://localhost:8080/api/transactions/:transaction_id)
    .put(function(req, res) {

        // use our transaction model to find the transaction we want
        Transaction.findById(req.params.transaction_id, function(err, transaction) {

            if (err)
                res.send(err);

            transaction.name = req.body.name;  // update the transactions info

            // save the transaction
            transaction.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Transaction updated!' });
            });

        });
    })

    // delete the transaction with this id (accessed at DELETE http://localhost:8080/api/transactions/:transaction_id)
    .delete(function(req, res) {
        Transaction.remove({
            _id: req.params.transaction_id
        }, function(err, transaction) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;