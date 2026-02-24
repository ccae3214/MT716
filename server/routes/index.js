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

// 新增：課程管理與任務
router.post('/create_course', (req, res) => post.create_course(req, res));
router.post('/create_task', (req, res) => post.create_task(req, res));
router.get('/courses', (req, res) => post.get_courses(req, res));

// 新增：學生端功能
router.post('/enroll_course', (req, res) => post.enroll_course(req, res));
router.get('/student_courses', (req, res) => post.get_student_courses(req, res));
router.get('/student_tasks', (req, res) => post.get_student_tasks(req, res));

// 新增：任務回報
router.post('/submit_task', (req, res) => post.submit_task(req, res));
router.get('/my_submissions', (req, res) => post.get_my_submissions(req, res));
router.get('/teacher_tasks', (req, res) => post.get_teacher_tasks(req, res));



module.exports = router;
