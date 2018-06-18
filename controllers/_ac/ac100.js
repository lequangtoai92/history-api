/**
 * AC100 controller
 * @author Toailq - 23/04/2018
*/
const AC100_MODEL = require('../../models/_ac/ac100_models');

module.exports = class AC100 {
  constructor() {
    this.ac100_model = new AC100_MODEL();
  }
  _listOfKing(req, res) {
    this.ac100_model._listOfKing(req.query, rs => { res.send(rs) })
  }
}