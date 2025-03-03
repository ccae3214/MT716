const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const post = require('../post');
const get = require('../get');
///get service
//verifyjwttoken
router.get('/verify_token', (req, res) => {
  get.verify_token(req, res);  
});
// signout API（remove Cookie）
router.get("/sign_out", (req, res) => {
  get.sign_out(req, res);  
 });


///post service
//sign_in
router.post('/sign_in', (req, res) => {
  post.sign_in(req, res);  
});

//create_user
router.post('/create_user', (req, res) => {
  post.create_user(req, res);  
});



module.exports = router;
