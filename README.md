# Cloud Budget

## Summary

Cloud Budget is a Free and Open Source self-hostable budget management tool, inspired by some apps I have tried to use in the past.
######Check out the [DEMO](http://cloudbudget.majacobs.net).

#### Concept

There is a monthly plan where you set the monthly income, how much you spend per month in bills, and how much you want to save per month. 
Then you can see on the spendable views how much you have left to spend in the current month, week and day. 
When you add a transaction, you can use 1 of the 4 tags: `count`, `don't count`, `bill`, and `credit`:
* A transaction with the `count` tag counts toward your spendable (i.e. a normal transaction that is not a bill nor a credit).
* A transaction with the `don't count` tag does not count toward your spendable (i.e. a transaction that you expect to get paid back for).
* A transaction with the `bill` tag should be used if the transaction is already considered within the bill section of the monthly plan.
* A transaction with the `credit` tag should be used for any incoming money; this will not affect the spendable in any way.

#### Features

* Transactions can be added, edited and deleted.
* Monthly spendable plan can be changed.
* View amount spendable today, this week and this month.
* Plan persistence.
* Transaction persistence.

#### Roadmap

* Move controller REST functions to an angular service.
* Be able to import transaction files (and maybe one day, directly from bank..).
* Add settings that will be persisted on the server and delivered to front-end app.
* Be able to use last months income in spendable, instead of plan result (setting).
* Create bills as scheduled transactions that will be used in the plan.
* Add trackers/categories to be able to monitor spending.
* Add graphs (i.e. pie graphs of categories, line graphs of account balances, etc.).
* Add receipts to transactions.
* Layout will be updated for better experience and more appealing look.
* Accounts will be added to link transactions and track balance.
* Transactions will be queryable and filterable.

## Getting Started

#### Dependencies

* [NodeJS](https://nodejs.org/download/)
* npm
* bower
* mongo

#### Setup

* `git clone https://github.com/swengmatt/cloudbudget.git`
* `cd cloudbudget`
* `npm install (--production)`
* `bower install`
* Setup MongoDB:
 * `mongo`
 * `use cloudbudget`
* `npm start` OR `npm run dev`
* Open browser window to http://localhost:3000/

## Changelog

See [CHANGELOG](CHANGELOG) for details.

## License

Copyright (c) 2015 Matthew Jacobs.
See [LICENSE](LICENSE) for details.
