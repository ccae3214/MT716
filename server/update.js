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


//update////////////////////////////////////////////////////
function update_student(req, res) {
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
            console.log(body.reference_no + ':student updateed', table.rows);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.student SET jobtype=$2,cel_no=$3,encoding_date=$4,permanent_address=$5,picture=$6,passport_no=$7,birthday=$8,age=$9,height=$10,weight=$11,language=$12,religion=$13,married_status=$14,passport=$15,remarks_passport=$16,unified=$17,remarks_unified=$18,comments=$19,applicant_source=$20,applicant_source_name=$21, give_name=$22,mid_name=$23,last_name=$24,give_name_of_married_spouse=$25,mid_name_of_married_spouse=$26,last_name_of_married_spouse=$27 WHERE reference_no= $1 RETURNING *;  "
  const value =
    [body.reference_no,
    body.jobtype,
    body.cel_no,
    body.encoding_date,
    body.permanent_address,
    body.picture,
    body.passport_no,
    body.birthday,
    body.age,
    body.height,
    body.weight,
    body.language,
    body.religion,
    body.married_status,
    body.passport,
    body.remarks_passport,
    body.unified,
    body.remarks_unified,
    body.comments,
    body.applicant_source,
    body.applicant_source_name,
    body.give_name,
    body.mid_name,
    body.last_name,
    body.give_name_of_married_spouse,
    body.mid_name_of_married_spouse,
    body.last_name_of_married_spouse
    ]
  connet(query, value);
}
function update_children_detail(req, res) {
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
            console.log(body.reference_no + body.number + ':children_detail updateed');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.children_detail  SET  child_name=$3,child_gender=$4,child_age=$5   WHERE reference_no=$1 AND number=$2 RETURNING * ;  "
  const value =
    [body.reference_no,
    body.number,
    body.child_name,
    body.child_gender,
    body.child_age
    ]
  connet(query, value);
}
function update_education_background(req, res) {
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
            console.log(body.reference_no + ':/number/:' + body.number + ':education_background updateed');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.education_background SET  name_of_school=$3,location=$4,major=$5,from_date=$6,to_date=$7,attainment=$8   WHERE reference_no = $1 AND number = $2 RETURNING * ;  "
  const value =
    [body.reference_no,
    body.number,
    body.name_of_school,
    body.location,
    body.major,
    body.from_date,
    body.to_date,
    body.attainment,
    ]
  connet(query, value);
}

function update_experience_working_abroad(req, res) {
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
            console.log(body.reference_no + body.number + ':experience_working_abroad updateed');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.experience_working_abroad SET  name_of_employer=$3 ,country_city=$4,description=$5,from_date=$6,to_date=$7   WHERE reference_no = $1 AND number = $2 RETURNING * ;  "
  const value =
    [body.reference_no,
    body.number,
    body.name_of_employer,
    body.country_city,
    body.description,
    body.from_date,
    body.to_date,
    ]
  connet(query, value);
}

function update_family_background(req, res) {
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
            console.log(body.reference_no + ':family_backround updateed');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.family_background SET total_family_child_number=$2,child_rank=$3,give_name_of_father=$4,mid_name_of_father=$5,last_name_of_father=$6,age_of_father=$7,give_name_of_mother=$8,mid_name_of_mother=$9,last_name_of_mother=$10,age_of_mother=$11,number_of_brother=$12,number_of_sister=$13 WHERE reference_no = $1  RETURNING * ;  "
  const value =
    [body.reference_no,
    body.total_family_child_number,
    body.child_rank,
    body.give_name_of_father,
    body.mid_name_of_father,
    body.last_name_of_father,
    body.age_of_father,
    body.give_name_of_mother,
    body.mid_name_of_mother,
    body.last_name_of_mother,
    body.age_of_mother,
    body.number_of_brother,
    body.number_of_sister
    ]
  connet(query, value);
}

function update_local_employment(req, res) {
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
            console.log(body.reference_no + body.number + ':student updateed');
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.local_employment SET  name_of_employer=$3,country_city=$4,description=$5,from_date=$6,to_date=$7  WHERE reference_no = $1 AND number=$2 RETURNING * ;  "
  const value =
    [body.reference_no,
    body.number,
    body.name_of_employer,
    body.country_city,
    body.description,
    body.from_date,
    body.to_date
    ]
  connet(query, value);
}

function update_empolyer(req, res) {
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
            console.log(body.reference_no + ':student updateed', table.rows);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.empolyer SET c_name=$3,jobtype=$4,departure_date=$5,joborder=$6,approve_contract=$7 WHERE e_no= $1 AND tma=$2 RETURNING *;  "
  const value =
    [body.e_no,
    body.tma,
    body.c_name,
    body.jobtype,
    body.departure_date,
    body.joborder,
    body.approve_contract
    ]
  connet(query, value);
}
function empolyer_book(req, res) {
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
            console.log(body.reference_no + ':student updateed', table.rows);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.empolyer SET worker=$3 WHERE e_no= $1 AND tma=$2 RETURNING *;  "
  const value =
    [
      body.e_no,
      body.tma,
      body.worker,

    ]
  connet(query, value);
}
function match(req, res) {
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
            console.log(body.reference_no + ':student updateed', table.rows);
            return res.json(table.rows[0]);
          }
        })
      }
    })
  }
  const body = req.body
  const query = "UPDATE public.empolyer SET worker=$3 WHERE e_no= $1 AND tma=$2 RETURNING *;  "
  const value =
    [
      body.e_no,
      body.tma,
      body.worker,

    ]
  connet(query, value);
}

module.exports = {

  update_student,
  update_local_employment,
  update_family_background,
  update_experience_working_abroad,
  update_education_background,
  update_children_detail,

  update_empolyer,
  empolyer_book,
  match
};