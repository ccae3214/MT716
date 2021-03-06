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


const connectionString = 'postgresql://postgres:postgres@localhost:5432/student'
const client = new Client({
  connectionString: connectionString,
})
function delit_student(req, res) {
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
            console.log(body.reference_no + ':delit_student delited', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "DELETE FROM public.student WHERE reference_no = $1  RETURNING REFERENCE_NO,JOBTYPE;  "
  const value =
    [
      body.reference_no,
    ]
  connet(query, value);
}
function delit_local_employment(req, res) {
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
            console.log(body.reference_no + ':local_employment delited', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "DELETE FROM public.local_employment WHERE reference_no = $1 AND number = $2 ;  "
  const value =
    [
      body.reference_no,
      body.number
    ]
  connet(query, value);
}
function delit_family_background(req, res) {
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
            console.log(body.reference_no + ':family_background delited', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "DELETE FROM public.family_background WHERE reference_no = $1 AND number = $2 ;  "
  const value =
    [
      body.reference_no,
      body.number
    ]
  connet(query, value);
}
function delit_experience_working_abroad(req, res) {
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
            console.log(body.reference_no + ':experience_working_abroad delited', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "DELETE FROM public.experience_working_abroad WHERE reference_no = $1 AND number = $2 ;  "
  const value =
    [
      body.reference_no,
      body.number
    ]
  connet(query, value);
}
function delit_education_background(req, res) {
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
            console.log(body.reference_no + ':education_background delited', table.rows[0]);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "DELETE FROM public.education_background WHERE reference_no = $1 AND number = $2 ;  "
  const value =
    [
      body.reference_no,
      body.number
    ]
  connet(query, value);
}
function delit_children_detail(req, res) {
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
            console.log(body.reference_no + ':children_detail delited', table);
            return res.json(table);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "DELETE FROM public.children_detail WHERE reference_no = $1 AND number = $2 ;  "
  const value =
    [
      body.reference_no,
      body.number
    ]
  connet(query, value);
}
function delit_empolyer(req, res) {
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
            console.log(body.e_no + ' empolyer delited', table.rowCount);
            return res.json(table);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "DELETE FROM public.empolyer WHERE e_no = $1 AND tma = $2 ;  "
  const value =
    [
      body.e_no,
      body.tma
    ]
  connet(query, value);
}
module.exports = {
  delit_student,
  delit_local_employment,
  delit_family_background,
  delit_experience_working_abroad,
  delit_education_background,
  delit_children_detail,

  delit_empolyer,
};
