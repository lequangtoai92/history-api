
/**
 * @author Anph - 05/05/2018
*/
'use strict'
const MysqlUtilModel = require('./../utils/mysqlUtilModel'),
  _const = require('./../config/Constant')
module.exports = class Model {
  constructor() {
    this.mysqlUtilModel = new MysqlUtilModel()
    this.SYNONYM = _const.NEW_SYNONYM
    // this.SYNONYM = _const.OLD_SYNONYM
  }
}