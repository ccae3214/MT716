const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const post = require('../post');

//get service
router.post('/sign_in', (req, res) => {
  post.sign_in(req, res);  
});

//create service
router.post('/create_user', (req, res) => {
  post.create_user(req, res);  
});



module.exports = router;
