Requirements:

Node
npm
bower - npm install -g bower
grunt-cli - npm install -g grunt-cli

mongodb
- database: server/server.js line 13
- grunt-easy-mongo-fixture module

setup:
    npm install
    bower install
    grunt easy_mongo_fixture:load
    grunt (starts express and opens browser)
    - grunt build:development (watches for new file changes and reloads browser in scripts folder)
    

Notes:
    database folder holds seed data for mongo database
    bower installs go into /public/lib/bower folder