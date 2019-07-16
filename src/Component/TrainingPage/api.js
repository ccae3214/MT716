const baseAPI = '/api';

const Service = {
  /*get *//////
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
}
export default Service;
