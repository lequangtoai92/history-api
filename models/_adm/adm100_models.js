/**
 * * B000_MODEL
 * @author Toailq - 03/08/2018
 * Login
*/

'use strict'
const Model = require('./../model');
const mysqlUtilModel = require('../../utils/mysqlUtilModel');


module.exports = class ADM100_MODEL extends Model {
  constructor() {
    super()
  }

  _login(req_PARAM, callback) {

    let procName = 'Login',
      pvUSERNAME = !!req_PARAM.pvUSERNAME ? req_PARAM.pvUSERNAME : null
      pvPASSWORD = !!req_PARAM.pvPASSWORD ? req_PARAM.pvPASSWORD : null

    this.mysqlUtilModel._callProcerdure(procName, [pvUSERNAME, pvPASSWORD], callback)
  }
}
