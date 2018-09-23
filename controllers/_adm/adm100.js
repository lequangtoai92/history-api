/**
 * AC100 controller
 * @author Toailq - 03/08/2018
*/
const ADM100_MODEL = require('../../models/_adm/adm100_models');

module.exports = class ADM100 {
  constructor() {
    this.adm100_model = new ADM100_MODEL();
  }
  _login(req, res) {
    this.adm100_model._login(req.query, rs => { res.send(rs) })
  }
}