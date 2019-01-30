const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should;
const expect = require("chai").expect;

chai.use(chaiHttp);

describe('get /api/country/*', () => {
    it('Should return a valid countryflags.io address', done => {
        chai.request(app).get('/api/country/76561197966771079').end((err, res) => {
            expect(res).have.property('status', 200);
            expect(res).have.property('text', 'https://www.countryflags.io/EE/flat/24.png');
            done();
        });
    });

    it('Should return a NaN error', done => {
        chai.request(app).get('/api/country/assdasfas').end((err, res) => {
            expect(res).have.property('status', 200);
            expect(res).have.property('text', 'ERROR: NaN');
            done();
        });
    });

    it('Should return a inavlid steamID', done => {
        chai.request(app).get('/api/country/4654654').end((err, res) => {
            expect(res).have.property('status', 200);
            expect(res).have.property('text', 'ERROR: Invalid steamID');
            done();
        });
    });
});