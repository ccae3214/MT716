const baseAPI = '/api';

const Service = {

  create_student(create_student) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/create_student`, {
        method: 'POST',
        body: JSON.stringify(create_student),
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
}
export default Service;
