const baseAPI = '/api';

const Service = {
  /*get *//////
  
 get_students() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_students`, {
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
  get_student(get_student) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_student`, {
        method: 'POST',
        body: JSON.stringify(get_student ),
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
  get_local_employment(get_local_employment) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_local_employment`, {
        method: 'POST',
        body: JSON.stringify(get_local_employment ),
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
  get_family_background(get_family_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_family_background`, {
        method: 'POST',
        body: JSON.stringify(get_family_background ),
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
  get_experience_working_abroad(get_experience_working_abroad) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_experience_working_abroad`, {
        method: 'POST',
        body: JSON.stringify(get_experience_working_abroad ),
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
  get_education_background(get_education_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_education_background`, {
        method: 'POST',
        body: JSON.stringify(get_education_background ),
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
  get_children_detail(get_children_detail) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_children_detail`, {
        method: 'POST',
        body: JSON.stringify(get_children_detail ),
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
  /*create*/
  create_children_detail(create_children_detail) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_children_detail`,{
        method: 'POST',
        body: JSON.stringify(create_children_detail),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  create_education_background(create_education_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_education_background`,{
        method: 'POST',
        body: JSON.stringify(create_education_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  create_experience_working_abroad(create_experience_working_abroad) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_experience_working_abroad`,{
        method: 'POST',
        body: JSON.stringify(create_experience_working_abroad),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  create_family_background(create_family_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_family_background`,{
        method: 'POST',
        body: JSON.stringify(create_family_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  create_local_employment(create_local_employment) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_local_employment`,{
        method: 'POST',
        body: JSON.stringify(create_local_employment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /*update data */
  update_student(update_student) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/update_student`,{
        method: 'POST',
        body: JSON.stringify(update_student),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update_children_detail(update_children_detail) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/update_children_detail`,{
        method: 'POST',
        body: JSON.stringify(update_children_detail),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update_education_background(update_education_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/update_education_background`,{
        method: 'POST',
        body: JSON.stringify(update_education_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update_experience_working_abroad(update_experience_working_abroad) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/update_experience_working_abroad`,{
        method: 'POST',
        body: JSON.stringify(update_experience_working_abroad),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update_family_background(update_family_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/update_family_background`,{
        method: 'POST',
        body: JSON.stringify(update_family_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update_local_employment(update_local_employment) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/update_local_employment`,{
        method: 'POST',
        body: JSON.stringify(update_local_employment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
        .then(result => {
          resolve(result);
        })
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
      fetch(`${baseAPI}/delit_education_background`,{
        method: 'POST',
        body: JSON.stringify(delit_education_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
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
      fetch(`${baseAPI}/delit_experience_working_abroad`,{
        method: 'POST',
        body: JSON.stringify(delit_experience_working_abroad),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
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
      fetch(`${baseAPI}/delit_family_background`,{
        method: 'POST',
        body: JSON.stringify(delit_family_background),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
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
      fetch(`${baseAPI}/delit_local_employment`,{
        method: 'POST',
        body: JSON.stringify(delit_local_employment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }) .then(response => response.json())
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
