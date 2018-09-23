/**
 * AC100 Router
 * @author Toailq - 23/04/2018
 */
const AC100 = require('../../controllers/_ac/ac100')
module.exports = (app) => {

  this.ctrlAC100 = new AC100()
  app.get('/ac/lst_ofking', (req, res) => { this.ctrlAC100._listOfKing(req, res) })
}