const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should;
const expect = require("chai").expect;

chai.use(chaiHttp);

describe("/api/Country/<SteamiD>", () => {
    it("valid ID", done => {
        chai.request(app).get("/api/country/76561197966771079").end((err, res) => {
            expect(res).have.property('status', 200);
            expect(res).have.property('text', 'https://www.countryflags.io/EE/flat/24.png');
            done();
        });
    });

    it("SteamID is invalid", done => {
        chai.request(app).get("/api/country/4654").end((err, res) => {
            expect(res).have.property('status', 404);
            expect(res).have.property('text', 'ERROR: Invalid steamID');
            done();
        });
    });

    it("User has no country", done => {
        chai.request(app).get("/api/country/76561197960799782").end((err, res) => {
            expect(res).have.property('status', 404);
            expect(res).have.property('text', 'ERROR: No country exists');
            done();
        });
    });

    it("SteamID is string", done => {
        chai.request(app).get("/api/country/asdfgh").end((err, res) => {
            expect(res).have.property('status', 404);
            expect(res).have.property('text', 'ERROR: SteamID is NaN');
            done();
        });
    });
});
