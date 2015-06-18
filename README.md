# Cloud Budget

Cloud Budget is a Free and Open Source self-hostable budget management tool, inspired by some apps I have tried to use in the past.

## Requirements

* node.js
* npm
* bower - [`npm install -g bower`]
* mongodb
 * configure db port: package.json > config > mongodb > port

## Setup

* `npm install`
* `bower install`
* `npm run dev`

## Script Commands

* npm run
  * clean - removes public folder
  * build
    * build:scripts
    * build:styles
    * build:markup
  * test - (does nothing yet)
  * watch:test - (does nothing yet)
  * watch
  * watch:build
    * watch:build:scripts
    * watch:build:styles
    * watch:build:markup
  * open:dev
  * db:serve - db:start, serve
  * db:start
  * serve
  * live-reload
  * dev - open:dev, watch, love-reload, db:start, serve

## Features

* Transactions can be added, edited and deleted.
* Monthly spendable plan can be changed.
* View amount spendable today, this week and this month.
* Plan persistence.
* Transaction persistence.

## Roadmap

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

## Changelog

See [CHANGELOG](CHANGELOG.md) for details.

## License

Copyright (c) 2015 Matthew Jacobs.
See [LICENSE](LICENSE.md) for details.
