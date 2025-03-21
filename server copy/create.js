const {
  Pool,
  Client
} = require('pg')

const pool = new Pool({
  user: 'qbfbtixbnjvvam',
  host: 'ec2-174-129-229-106.compute-1.amazonaws.com',
  database: 'de2q9t5u56fqop',
  password: 'd66fe1c2ebed7bd550e323086bf5760ff61d91b38c151d859692a7d50a2902ca',
  port: 5432,
  ssl: true
});


function create_student(req, res) {

  /*quickCreateStudent is use when new person ask for MT trainning*/

  const query = "INSERT INTO student (reference_no,jobtype,give_name,mid_name,last_name ,encoding_date,status) VALUES ($1,$2,$3,$4,$5,$6,$7)  RETURNING REFERENCE_NO,JOBTYPE,GIVE_NAME,MID_NAME,LAST_NAME,ENCODING_DATE,STATUS;"
  const body = req.body
  const now = new Date().toLocaleDateString()
  const status = 'not_yet_check_in'
  const values = [
    body.reference_no, body.jobtype, body.give_name, body.mid_name, body.last_name, now, status
  ]

  pool.connect((err, db, done) => {
    if (err) {
      return console.log(err);
    } else {
      db.query(query, values, (err, table) => {
        if (err) {
          done();
          return res.json("新增失敗()" + err);
        } else {
          console.log('student DATA INSERTED', table.rows[0]);
          return res.json(table.rows[0]);
        }
      })
    }
  })
}
function create_children_detail(req, res) {
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
            console.log(body.reference_no + ':children_detail created', table.rows);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "INSERT INTO public.children_detail (reference_no,number) VALUES ($1,$2)"
  const value =
    [body.reference_no,
    body.number,
    ]
  connet(query, value);
}
function create_local_employment(req, res) {
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
            console.log(body.reference_no + ':local_employment created', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "INSERT INTO public.local_employment (reference_no,number) VALUES ($1,$2)"
  const value =
    [body.reference_no,
    body.number,
    ]
  connet(query, value);
}
function create_family_background(req, res) {
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
            console.log(body.reference_no + ':family_background created');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "INSERT INTO public.family_background (reference_no) VALUES ($1)"
  const value =
    [body.reference_no
    ]
  connet(query, value);
}
function create_experience_working_abroad(req, res) {
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
            console.log(body.reference_no + ':experience_working_abroad created', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "INSERT INTO public.experience_working_abroad (reference_no,number) VALUES ($1,$2)"
  const value =
    [body.reference_no,
    body.number,
    ]
  connet(query, value);
}
function create_education_background(req, res) {
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
            console.log(body.reference_no + ':education_background created', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "INSERT INTO public.education_background (reference_no,number) VALUES ($1,$2)"
  const value =
    [body.reference_no,
    body.number,
    ]
  connet(query, value);
}
function student_checkin(req, res) {

  pool.connect((err, db, done) => {
    if (err) {
      return console.log(err);
    } else {
      db.query(query, values, (err, table) => {
        if (err) {
          done();
          return res.json("新增失敗()" + err);
        } else {
          return res.json(table.rows[0]);
        }
      })
    }
  })

  const query = "INSERT INTO processing (reference_no,checkin_date) VALUES ($1,$2)  RETURNING reference_no,checkin_date;"
  const body = req.body
  const values = [
    body.reference_no, body.checkin_date
  ]

}

function student_checkin2(req, res) {

  pool.connect((err, db, done) => {
    if (err) {
      return console.log(err);
    } else {
      db.query(query2, values, (err, table) => {
        if (err) {
          done();
          return res.json("新增失敗()" + err);
        } else {
          return res.json(table.rows[0]);
        }
      })

    }
  })

  const query2 = "UPDATE public.student SET status=$1  WHERE reference_no= $2   "
  const body = req.body
  const values = [
    'check_in', body.reference_no
  ]

}
function create_empolyer(req, res) {

  /*create_empolyer is use when new person ask for MT booking student*/

  const query = "INSERT INTO empolyer ( c_name,e_name,jobtype,tma,departure_date,job_order,approved_contract) VALUES ($1,$2,$3,$4,$5,$6,$7)  RETURNING e_no;"
  const body = req.body
  const values = [
    body.c_name, body.e_name, body.jobtype, body.tma, body.departure_date, body.joborder, body.approve_contract
  ]

  pool.connect((err, db, done) => {
    if (err) {
      return console.log(err);
    } else {
      db.query(query, values, (err, table) => {
        if (err) {
          done();
          console.log('empolyer 新增失敗 ', err);
          return res.json("新增失敗()" + err);
        } else {
          console.log('empolyer created ', table.rows[0]);
          return res.json(table.rows[0]);
        }
      })
    }
  })
}
module.exports = {
  create_student,
  create_children_detail,
  create_local_employment,
  create_family_background,
  create_experience_working_abroad,
  create_education_background,

  student_checkin,
  student_checkin2,

  create_empolyer,
};