const {
    Pool,
    Client
} = require('pg')


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student',
    password: 'postgres',
    port: 5432,
});
const connectionString = 'postgresql://postgres:postgres@localhost:5432/student'
const client = new Client({
    connectionString: connectionString,
})
function get_user(req, res) {
    //檢查jwt token,檢查資料庫會員資料
    //儲存jwt和取得的會員資料

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
                        if (table.rows[0]) {
                            console.log('user geted');
                            return res.json(table.rows[0]);
                        }
                        else {
                            console.log('user not exsist or wrong password');
                            return res.json(null);
                        }
                    }
                })
            }
        })
    }
    const name = req.body.name
    const password = req.body.password
    const value = [name, password]
    const query = "SELECT  * FROM public.user where name=$1 AND password =$2  "
    connet(query, value);

}
function get_jwt(req, res) {
    //取得jwt token
    //create.accessToken.accessToken.expiresIn
    // Defining our token parts 標頭資料和秘密
    var CryptoJS = require("crypto-js");
    var header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    var data = {
        "id": req.body.code,
        "username": req.body.password
    };

    var secret = "MTMMT";

    function base64url(source) {
        var encodedSource
        // Encode in classical base64
        encodedSource = CryptoJS.enc.Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        return encodedSource;
    }

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);
    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);
    var signature = encodedHeader + "." + encodedData;
    signature = CryptoJS.HmacSHA256(signature, secret);
    signature = base64url(signature);

    var jwt = { accessToken: '', expiresIn: '300' }
    jwt.accessToken = encodedHeader + '.' + encodedData + '.' + signature

    return res.json(jwt);
}
module.exports = {
    get_user,
    get_jwt

};