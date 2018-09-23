/**
 * AC100 Router
 * @author Toailq - 03/08/2018
 * Login
 */
const ADM100 = require('../../controllers/_adm/adm100')
module.exports = (app) => {

  this.ctrlADM100 = new ADM100()
  app.get('/ac/login', (req, res) => { this.ctrlADM100._login(req, res) })
}