const express = require('express');
const user = require('../utility/user');

const router = express.Router();

/* GET users listing. */
router.get('/country/*', function(req, res, next) {
  var steamId = req.url.split("/");
  steamId = steamId[steamId.length - 1];

  user.readUserCountry(steamId, country => {
    if (country.includes("ERROR: ")) {
      res.status(404);
      res.send(country);
    } else {
      user.readCountryShortName(country, shortCountry => {
        if (shortCountry.includes("ERROR: ")) {
          res.status(404);
          res.send(shortCountry);
        } else {
          res.status(200);
          res.send(`https://www.countryflags.io/${shortCountry}/flat/24.png`);
        }
      });
    }
  })

});




module.exports = router;
