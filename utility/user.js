const https = require('https');
const xml =  require('xml-js');

module.exports.readUserCountry = (steamId, returnFunc) => {
    if (isNaN(steamId)) { return returnFunc("ERROR: NaN"); }
  
    https.get(`https://steamcommunity.com/profiles/${steamId}/?xml=1`, res => {
    let data = '';
  
    res.on('data', chunk => {
        data += chunk
    });

    res.on('end', () => {
        data = JSON.parse(xml.xml2json(data, { compact: true, spaces: 4}));
        if (data.hasOwnProperty("response") && data.response.hasOwnProperty("error")) { return returnFunc("ERROR: Invalid steamID"); }
        if (data.hasOwnProperty("profile") && !data.profile.hasOwnProperty("location")) { return returnFunc("ERROR: No country exists"); }

        data = data.profile.location._cdata;
        data = data.split(", ");
        return returnFunc(data[data.length - 1]);
    });
    }).on('error', err => {
        console.log("Error: "+ err.message);
        return returnFunc("ERROR: Steamcommunity unavailable");
    });
}

module.exports.readCountryShortName = (country, returnFunc) => {
    https.get(`https://restcountries.eu/rest/v2/name/${country}`, res => {
        let data = '';

        res.on('data', chunk => {
            data += chunk
        });

        res.on('end', () => {
            data = JSON.parse(data);
            if (data.hasOwnProperty("status") && data.status == 404) { return returnFunc("ERROR: Country Invalid"); }
            
            return returnFunc(data[0].alpha2Code);
        });
        }).on('error', err => {
            console.log("Error: "+ err.message);
            return returnFunc("ERROR: restcountries unavailable");
        });
}