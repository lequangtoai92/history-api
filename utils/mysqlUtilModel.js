/**
 * @author Toailq - 23/04/2018
*/
'use strict'
const UtilModel = require('./utilModel'),
    mysql = require('mysql'),
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "web"
    });
var pool = mysql.createPool({
    connectionLimit: 10, // default = 10
    host: 'localhost',
    user: 'root',
    password: 'kensxxx',
    database: 'fbtool'
});

module.exports = class MySQLUtilModel {

    /**
     * Convert mảng sang chuỗi query
     * @param params
     * @returns {string}
     */
    paramToString(params) {
        // return UtilModel.paramToString(params);
        var paramStr = ""
        var count = params.length
        for (var idx = 0; idx < count; idx++) {
            if (idx == count - 1) {
                paramStr += JSON.stringify(params[idx])
            } else {
                paramStr += JSON.stringify(params[idx]) + ", "
            }
        }
        return paramStr
    }

    // _callProcerdure(fncName, params) {
    //     let self = this;
    //     pool.getConnection(function (err, connection) {
    //         connection.query(`CALL ${fncName}(${self.paramToString(params)})`, function (err, rows) {
    //             connection.release();
    //             if (err) throw err;
    //             console.log(rows.length);
    //             return JSON.stringify(rows);
    //             // res.send(JSON.stringify(rows));
    //         });
    //     });
    // }

    _callProcerdure(fncName, params, callback) {
        let self = this;
        con.connect(function (err) {
            if (err) throw err;
            con.query(`CALL ${fncName}(${self.paramToString(params)})`, function (err, result) {
                con.release;
                if (err) throw err;
                // console.log(result[0]);
                callback(result[0]);
            });
        });
    }
}
