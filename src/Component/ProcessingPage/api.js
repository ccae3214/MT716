const baseAPI = '/api';

const Service = {
  /*get *//////
  get_not_ckeckin_students() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_not_ckeckin_students`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },
  get_ckeckin_students() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_ckeckin_students`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  get_processings() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_processings`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },
  /*post *//////
  /*get data */
  get_processing(get_processing) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_processing`, {
        method: 'POST',
        body: JSON.stringify(get_processing),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /*create*/
  student_checkin(student_checkin) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/student_checkin`, {
        method: 'POST',
        body: JSON.stringify(student_checkin),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  student_checkin2(student_checkin2) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/student_checkin`, {
        method: 'POST',
        body: JSON.stringify(student_checkin2),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get_payment(get_payment) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_payment`, {
        method: 'POST',
        body: JSON.stringify(get_payment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /*update data */
  match(match) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/match`, {
        method: 'POST',
        body: JSON.stringify(match),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },
  /*delit data */
  delit_student(delit_student) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/delit_student`, {
        method: 'POST',
        body: JSON.stringify(delit_student),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },
  delit_children_detail(delit_children_detail) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/delit_children_detail`, {
        method: 'POST',
        body: JSON.stringify(delit_children_detail),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },
  delit_education_background(delit_education_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/delit_education_background`, {
        method: 'POST',
        body: JSON.stringify(delit_education_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delit_experience_working_abroad(delit_experience_working_abroad) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/delit_experience_working_abroad`, {
        method: 'POST',
        body: JSON.stringify(delit_experience_working_abroad),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delit_family_background(delit_family_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/delit_family_background`, {
        method: 'POST',
        body: JSON.stringify(delit_family_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delit_local_employment(delit_local_employment) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/delit_local_employment`, {
        method: 'POST',
        body: JSON.stringify(delit_local_employment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
}
export default Service;
