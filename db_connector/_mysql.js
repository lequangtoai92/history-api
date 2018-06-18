/**
 * @author Toailq - 23/04/2018
*/
const mysql = require('mysql'),
    config = require('../config/Config')

let poolCluster = mysql.createPoolCluster({
    removeNodeErrorCount: 1, // Remove the node immediately when connection fails.
    defaultSelector: 'ORDER'
})
// poolCluster.add("CENTER", config.dbMysql.centerUrl);

poolCluster.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

poolCluster.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

module.exports = exports = poolCluster