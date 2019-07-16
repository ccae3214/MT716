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
});

module.export = { pool }