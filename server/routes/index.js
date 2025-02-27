const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const login = require('../login');
const get = require('../get');
const create = require('../create');
const update = require('../update');
const delit = require('../delit');

//get service


//create service
router.post('/create_user', (req, res) => {
  create.create_user(req, res);  
});



module.exports = router;
