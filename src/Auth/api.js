const baseAPI = '/api';

const Service = {

  /*login *//////
  get_user(get_user) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_user`, {
        method: 'POST',
        body: JSON.stringify(get_user),
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

  /*get_jwt *//////
  /*get data */
  get_jwt(get_jwt) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/get_jwt`, {
        method: 'POST',
        body: JSON.stringify(get_jwt),
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
