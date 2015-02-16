var express = require('express'),
    app = module.exports = express(),
    v1 = require('./v1');

 app.use(v1); /* API version 1 */

