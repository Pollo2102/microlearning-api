const {Client} = require('pg');

const client = new Client({
    user: 'u283hif8hmnds9utdtcz',
    host: 'b6ko81pxbzztt3wlmlk4-postgresql.services.clever-cloud.com',
    database: 'b6ko81pxbzztt3wlmlk4',
    password: 'IOqYJ56B3Lsn151QAQJU',
    port: '5432'
});

client.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log('Connection Successful.');
    }
});

module.exports = client;