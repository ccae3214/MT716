const {
  Pool,
  Client
} = require('pg')


const pool = require("./dbsetting.js")


const connectionString = 'postgresql://postgres:postgres@localhost:5432/student'
const client = new Client({
  connectionString: connectionString,
})

function get_students(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('students searched');
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const query = "SELECT  * FROM student ORDER BY REFERENCE_NO ASC;  "

  connet(query);
}
function get_users(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('users searched');
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const query = "SELECT  * FROM public.user ORDER BY code ASC;  "

  connet(query);
}
function get_student(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('student geted');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const reference_no = req.body.reference_no
  const query = "SELECT * FROM public.student WHERE reference_no= $1 ;  "
  const value = [reference_no]
  connet(query, value);
}
function get_local_employment(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('local_employment geted');
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const reference_no = req.body.reference_no
  const query = "SELECT  * FROM public.local_employment WHERE reference_no= $1 ORDER BY NUMBER ASC;  "
  const value = [reference_no]
  connet(query, value);
}
function get_family_background(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('family_background geted');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const reference_no = req.body.reference_no
  const query = "SELECT  * FROM public.family_background WHERE reference_no= $1 ;  "
  const value = [reference_no]
  connet(query, value);
}
function get_experience_working_abroad(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('experience_working_abroad geted');
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const reference_no = req.body.reference_no
  const query = "SELECT  *  FROM public.experience_working_abroad WHERE reference_no= $1 ORDER BY NUMBER ASC;  "
  const value = [reference_no]
  connet(query, value);
}
function get_education_background(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('education_background geted');
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const reference_no = req.body.reference_no
  const query = "SELECT *  FROM public.education_background WHERE reference_no= $1 ORDER BY NUMBER ASC;  "
  const value = [reference_no]
  connet(query, value);
}
function get_children_detail(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('children_detail geted');
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const reference_no = req.body.reference_no
  const query = "SELECT  *  FROM public.children_detail WHERE reference_no= $1 ORDER BY NUMBER ASC;  "
  const value = [reference_no]
  connet(query, value);
}
function get_not_ckeckin_students(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('not_ckeckin_students searched')
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const query = "SELECT  * FROM student WHERE reference_no NOT IN ( SELECT reference_no FROM processing ) ORDER BY reference_no ASC; ;  "

  connet(query);
}
function get_ckeckin_students(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('student searched');
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const query = "SELECT * FROM student WHERE reference_no  IN ( SELECT reference_no FROM processing ) ORDER BY reference_no ASC; ;  "

  connet(query);
}
function get_processing(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('processing geted')
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }

  const reference_no = req.body.reference_no
  const query = "SELECT * FROM processing WHERE reference_no =$1 ORDER BY reference_no ASC; ;  "
  const value = [reference_no]
  connet(query, value);

}
function get_payment(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('Payment geted')
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }

  const reference_no = req.body.reference_no
  const query = "SELECT * FROM payment WHERE reference_no =$1 ORDER BY reference_no ASC; ;  "
  const value = [reference_no]
  connet(query, value);

}
function get_processings(req, res) {
  function connet(query, values) {
    pool.connect((err, db, done) => {
      if (err) {
        return console.log(err.stack);
      } else {
        db.query(query, values, (err, table) => {
          done();
          if (err) {
            console.log(err.stack);
          } else {
            console.log('processings geted')
            return res.json(table.rows);
          }
        })
      }
    })
  }
  const query = "SELECT * FROM processing ORDER BY reference_no ASC; ;  "
  connet(query);

}
module.exports = {
  get_students,
  get_processings,

  get_users,
  get_student,
  get_local_employment,
  get_family_background,
  get_experience_working_abroad,
  get_education_background,
  get_children_detail,

  get_not_ckeckin_students,
  get_ckeckin_students,
  get_processing,
  get_payment,

};