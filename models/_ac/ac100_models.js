/**
 * * B000_MODEL
 * @author Toailq - 23/04/2018
*/

'use strict'
const Model = require('./../model');
const mysqlUtilModel = require('../../utils/mysqlUtilModel');


module.exports = class AC100_MODEL extends Model {
  constructor() {
    super()
  }

  _listOfKing(req_PARAM, callback) {

    let procName = 'ListOfKing',
      pvLOGIN = !!req_PARAM.pvLOGIN ? req_PARAM.pvLOGIN : null

    this.mysqlUtilModel._callProcerdure(procName, [pvLOGIN], callback)
  }
}
