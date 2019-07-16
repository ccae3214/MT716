const baseAPI = '/api';

const Service = {
    /*get *//////
    get_users() {
        return new Promise((resolve, reject) => {
            fetch(`${baseAPI}/get_users`, {
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