const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const create = require('../create');

//get service


//create service
router.post('/create_user', (req, res) => {
  create.create_user(req, res);  
});



module.exports = router;
