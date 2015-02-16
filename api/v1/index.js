var express = require('express'),
    app = module.exports = express(),
    lakes = require('./lakes');

app.use(lakes);
