/**
 * @author Toailq - 23/04/2018
*/
'use strict'
class UtilModel {
  /**
   * Convert mảng sang chuỗi query
   * @param params
   * @returns {string}
   */
  paramToString(params) {
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

  /**
   * Tạo câu query
   * @param fncName
   * @param params
   * @returns {string}
   */
  buidQuery(fncName, params) {
    return fncName + "(" + self.paramToString(params) + ")"
  }
}

module.exports = UtilModel