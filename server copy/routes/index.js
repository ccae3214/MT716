const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const login = require('../login');
const get = require('../get');
const create = require('../create');
const update = require('../update');
const delit = require('../delit');

router.post('/get_jwt', (req, res) => {
  login.get_jwt(req, res);
});
router.post('/get_user', (req, res) => {
  login.get_user(req, res);
});
router.get('/get_users', (req, res) => {
  get.get_users(req, res);
});
router.get('/get_students', (req, res) => {
  get.get_students(req, res);
});

router.get('/get_not_ckeckin_students', (req, res) => {
  get.get_not_ckeckin_students(req, res);
});
router.get('/get_ckeckin_students', (req, res) => {
  get.get_ckeckin_students(req, res);
});
router.get('/get_processings', (req, res) => {
  get.get_processings(req, res);
});
//get service

router.post('/get_processing', (req, res) => {
  get.get_processing(req, res);
});
router.post('/get_payment', (req, res) => {
  get.get_payment(req, res);
});
router.post('/get_student', (req, res) => {
  get.get_student(req, res);
});
router.post('/get_local_employment', (req, res) => {
  get.get_local_employment(req, res);
});
router.post('/get_family_background', (req, res) => {
  get.get_family_background(req, res);
});
router.post('/get_experience_working_abroad', (req, res) => {
  get.get_experience_working_abroad(req, res);
});
router.post('/get_education_background', (req, res) => {
  get.get_education_background(req, res);
});
router.post('/get_children_detail', (req, res) => {
  get.get_children_detail(req, res);
});

router.post('/get_tma_empolyers', (req, res) => {
  get.get_tma_empolyers(req, res);
});

//create service
router.post('/create_student', (req, res) => {
  create.create_student(req, res);  
});
router.post('/create_children_detail', (req, res) => {
  create.create_children_detail(req, res);
});
router.post('/create_family_background', (req, res) => {
  create.create_family_background(req, res);
});
router.post('/create_education_background', (req, res) => {
  create.create_education_background(req, res);
});
router.post('/create_experience_working_abroad', (req, res) => {
  create.create_experience_working_abroad(req, res);
});
router.post('/create_local_employment', (req, res) => {
  create.create_local_employment(req, res);
});
router.post('/student_checkin', (req, res) => {
  create.student_checkin(req, res);
});
router.post('/student_checkin2', (req, res) => {
  create.student_checkin2(req, res);
});
router.post('/create_empolyer', (req, res) => {
  create.create_empolyer(req, res);
});

//update service
router.post('/update_student', (req, res) => {
  update.update_student(req, res);
});
router.post('/update_children_detail', (req, res) => {
  update.update_children_detail(req, res);
});
router.post('/update_education_background', (req, res) => {
  update.update_education_background(req, res);
});
router.post('/update_experience_working_abroad', (req, res) => {
  update.update_experience_working_abroad(req, res);
});
router.post('/update_family_background', (req, res) => {
  update.update_family_background(req, res);
});
router.post('/update_local_employment', (req, res) => {
  update.update_local_employment(req, res);
});

router.post('/update_empolyer', (req, res) => {
  update.update_empolyer(req, res);
});
router.post('/empolyer_book', (req, res) => {
  update.empolyer_book(req, res);
});
router.post('/match', (req, res) => {
  update.match(req, res);
});

//delit(delete) service
router.post('/delit_student', (req, res) => {
  delit.delit_student(req, res);
});
router.post('/delit_children_detail', (req, res) => {
  delit.delit_children_detail(req, res);
});
router.post('/delit_education_background', (req, res) => {
  delit.delit_education_background(req, res);
});
router.post('/delit_experience_working_abroad', (req, res) => {
  delit.delit_experience_working_abroad(req, res);
});
router.post('/delit_family_background', (req, res) => {
  delit.delit_family_background(req, res);
});
router.post('/delit_local_employment', (req, res) => {
  delit.delit_local_employment(req, res);
});

router.post('/delit_empolyer', (req, res) => {
  delit.delit_empolyer(req, res);
});



module.exports = router;
