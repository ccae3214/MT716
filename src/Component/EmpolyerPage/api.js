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
  get_tma_empolyers(get_tma_empolyers) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_tma_empolyers`, {
        method: 'POST',
        body: JSON.stringify(get_tma_empolyers),
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
        body: JSON.stringify(get_local_employment),
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
        body: JSON.stringify(get_family_background),
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
        body: JSON.stringify(get_experience_working_abroad),
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
        body: JSON.stringify(get_education_background),
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
        body: JSON.stringify(get_children_detail),
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
  get_documentation(get_documentation) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_documentation`, {
        method: 'POST',
        body: JSON.stringify(get_documentation),
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
  create_empolyer(create_empolyer) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_empolyer`, {
        method: 'POST',
        body: JSON.stringify(create_empolyer),
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
  create_family_background(create_family_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_family_background`, {
        method: 'POST',
        body: JSON.stringify(create_family_background),
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

  create_children_detail(create_children_detail) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_children_detail`, {
        method: 'POST',
        body: JSON.stringify(create_children_detail),
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
  create_education_background(create_education_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_education_background`, {
        method: 'POST',
        body: JSON.stringify(create_education_background),
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
  create_experience_working_abroad(create_experience_working_abroad) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_experience_working_abroad`, {
        method: 'POST',
        body: JSON.stringify(create_experience_working_abroad),
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
  create_family_background(create_family_background) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_family_background`, {
        method: 'POST',
        body: JSON.stringify(create_family_background),
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
  create_local_employment(create_local_employment) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_local_employment`, {
        method: 'POST',
        body: JSON.stringify(create_local_employment),
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

  empolyer_book(empolyer_book) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/empolyer_book`, {
        method: 'POST',
        body: JSON.stringify(empolyer_book),
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
  update_empolyer(update_empolyer) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/update_empolyer`, {
        method: 'POST',
        body: JSON.stringify(update_empolyer),
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


  /*delit data */
  delit_empolyer(delit_empolyer) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/delit_empolyer`, {
        method: 'POST',
        body: JSON.stringify(delit_empolyer),
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

}
export default Service;
