const expect = require("chai").expect;
const user = require("../utility/user");

describe("Country parsing", () => {
    it("Country is correct", done => {
        user.readUserCountry("76561197966771079", (value) => {
            expect(value).to.equal("Estonia");
            done();
        });

    });
    it("false steamId", done => {
        user.readUserCountry("76561198189", (value) => {
            expect(value).to.equal("ERROR: Invalid steamID");
            done();
        });
    });
    it("No country available", done => {
        user.readUserCountry("76561198257575271", value => {
            expect(value).to.equal("ERROR: No country exists");
            done();
        });
    });
    it("NaN", done => {
        user.readUserCountry("asdadsdf", value => {
            expect(value).to.equal("ERROR: SteamID is NaN");
            done();
        });
    });
});

describe("Country shortname", () => {
    it("Country is correct", done => {
        user.readCountryShortName("Estonia", value => {
            expect(value).to.equal("EE");
            done();
        });
    });
    it("Country is not correct", done => {
        user.readCountryShortName("Ullah", value => {
            expect(value).to.equal("ERROR: Country Invalid");
            done();
        });
    });
});