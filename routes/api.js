const express = require('express');
const user = require('../utility/user');
const mysql = require('../utility/mysql');

const router = express.Router();

/* GET users listing. */
router.get('/country/*', function(serReq, serRes, next) {
  var steamId = serReq.url.split("/");

  let data = {
    User: {
      Id: null,
      SteamID: steamId[2],
      updated: null,
      created: null
    },
    Country: {
      id: null,
      Name: null,
      Short2Name: null,
      updated: null,
      created: null
    }
  }
  mysql.createTransaction((connection, err) => {
    if (err) {
      console.log(err);
      serRes.status(404);
      serRes.send("ERROR: SteamID could not be read");
      mysql.cancelTransaction(connection, () => {/*END POINT*/});   
    } else {
      mysql.selectUser(connection, data, (res, err) => {
        if (err) {
          console.log(err);
          serRes.status(404);
          serRes.send("ERROR: SteamID could not be read");
          mysql.cancelTransaction(connection, () => {/*END POINT*/});          
        } else {
          //If User dosen't exist
          if (res.length == 0) {
            user.readUserCountry(data.User.SteamID, userCountry => {
              if (userCountry.includes("ERROR: ")) {
                console.log(err);
                serRes.status(404);
                serRes.send(userCountry);
                mysql.cancelTransaction(connection, () => {/*END POINT*/});   
              } else {
                data.Country.Name = userCountry;
                mysql.selectCountry(connection, data, (res, err) => {
                  if (err) {
                    console.log(err);
                    serRes.status(404);
                    serRes.send("ERROR: userCountry could not be read");
                    mysql.cancelTransaction(connection, () => {/*END POINT*/});   
                  } else {
                    // If Country dosen't exist
                    if (res.length == 0) {
                      user.readCountryShortName(data.Country.Name, (Short2Name) => {
                        if (userCountry.includes("ERROR: ")) {
                          console.log(err);
                          serRes.status(404);
                          serRes.send(userCountry);
                          mysql.cancelTransaction(connection, () => {/*END POINT*/});   
                        } else {
                          data.Country.Short2Name = Short2Name;

                          serRes.status(200);
                          serRes.send(`https://www.countryflags.io/${data.Country.Short2Name}/flat/24.png`);

                          mysql.insertCountry(connection, data, (res, err) => {
                            if (err) {
                              console.log(err);
                              mysql.cancelTransaction(connection, () => {/*END POINT*/});
                            } else {
                              data.Country.Id = res.insertId;

                              mysql.insertUser(connection, data, (res, err) => {
                                if (err) {
                                  console.log(err);
                                  mysql.cancelTransaction(connection, () => {/*END POINT*/});
                                } else {

                                  mysql.commitTransaction(connection, (err) => {
                                    if (err) {
                                      console.log(err);
                                      mysql.cancelTransaction(connection, () => {/*END POINT*/});
                                    } else {/*END POINT*/};
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                    // If country does exist
                    else {
                      serRes.status(200);
                      serRes.send(`https://www.countryflags.io/${res.Short2Name}/flat/24.png`);

                      mysql.insertUser(connection, data, (res, err) => {
                        if (err) {
                          console.log(err);
                          mysql.cancelTransaction(connection, () => {/*END POINT*/});
                        } else {/* END POINT*/}
                      }); 
                    }
                  }
                });
              }
            });
          }
          // User does exist
          else {
            serRes.status(200);
            serRes.send(`https://www.countryflags.io/${res.Short2Name}/flat/24.png`);

            mysql.commitTransaction(connection, (err) => {
              if (err) {
                console.log(err);
                mysql.cancelTransaction(connection, () => {/*END POINT*/});
              } else {/*END POINT*/};
            });
          }
        }
      });
    }
  });
});




module.exports = router;
