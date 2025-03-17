const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const post = require('../post');
const get = require('../get');
///get service
//verifyjwttoken
router.post('/verify_token', (req, res) => {
  post.verify_token(req, res);  
});



///post service
//sign_in
router.post('/sign_in', (req, res) => {
  post.sign_in(req, res);  
});
// signout API（remove Cookie）
router.post("/sign_out", (req, res) => {
  post.sign_out(req, res);  
 });
//create_user
router.post('/create_user', (req, res) => {
  post.create_user(req, res);  
});



module.exports = router;
