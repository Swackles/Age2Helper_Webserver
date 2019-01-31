const express = require('express');
const user = require('../utility/user');
const mysql = require('../utility/mysql');

const router = express.Router();

/* GET users listing. */
router.get('/country/*', function(serReq, serRes, next) {
  var steamId = serReq.url.split("/");
  steamId = steamId[steamId.length - 1];

  user.readUserCountry(steamId, userCountry => {
    if (userCountry.includes("ERROR: ")) {
      serRes.status(404);
      serRes.send(userCountry);
    } else {
      mysql.createTransaction(connection => {
        
        let data = {
          Country: {
            Name: `${userCountry}`
          }
        }
        
        console.log(data);

        mysql.selectCountry(connection, data, (res, err) => {
          if (err) {
            console.log(err);
            serRes.status(404);
            serRes.send("ERROR: No country found");
          } else {
            console.log(res);
          }
        });
      });
      /*
      user.readCountryShortName(country, shortCountry => {
        if (shortCountry.includes("ERROR: ")) {
          res.status(404);
          res.send(shortCountry);
        } else {
          res.status(200);
          res.send(`https://www.countryflags.io/${shortCountry}/flat/24.png`);
        }
      });*/
    }
  })

});




module.exports = router;
