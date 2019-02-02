const expect = require("chai").expect;
const mysql = require("../utility/mysql");
const sinon = require("sinon");

describe("mysql Transactions", () => {  
    it("Transaction can start", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);
            
            mysql.cancelTransaction(connection, () => {
                done();
            });
        });
    });    
    it("Transaction can commit", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.commitTransaction(connection, (err) => {
                expect(err).to.equal(null);

                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });
});

describe("Database Country Select queries", () => {
    it("Select Country_OK", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectCountry(connection, { Country: { Id: "1" } }, (res, err) => {
                expect(err).to.equal(null);
                expect(res).to.be.an("array");
                expect(res).not.to.equal(null);

                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select Country_Country undefined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectCountry(connection, { }, (res, err) => {
                expect(err).to.equal("ERROR: Country is not an object");
                expect(res).to.equal(null);     
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select Country_Country value", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectCountry(connection, { Country: "string" }, (res, err) => {
                expect(err).to.equal("ERROR: Country is not an object");
                expect(res).to.equal(null);
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select Country_Country.Id undefined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectCountry(connection, { Country: { } }, (res, err) => {
                expect(err).to.equal("ERROR: No valid data");
                expect(res).to.equal(null);
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select Country_ID string", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectCountry(connection, { Country: { Id: "string" } }, (res, err) => {
                expect(err).to.equal("ERROR: No valid data");
                expect(res).to.equal(null);
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select Country_ID set", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectCountry(connection, { Country: { Id: "1" } }, (res, err) => {
                expect(err).to.equal(null);
                expect(res).to.be.an("array");
                expect(res).to.not.equal(null);
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("select Country_String set", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectCountry(connection, { Country: { Name: "Unknown" } }, (res, err) => {
                expect(err).to.equal(null);
                expect(res).to.be.an("array");
                expect(res).to.not.equal(null);

                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });
});

describe("Database Country Insert query", () => {
    it("Insert query_ok", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertCountry(connection, { Country: { Name: "TestCountry", Short2Name: "TT" } }, (res, err) => {
                expect(err).to.equal(null);
                expect(res).not.to.equal(null);

                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert query_country not valid", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertCountry(connection, { }, (res, err) => {
                expect(err).to.equal("ERROR: Country is not an object");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert query_country Name undefined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertCountry(connection, { Country: { } }, (res, err) => {
                expect(err).to.equal("ERROR: Country name is undefined");
                expect(res).to.equal(null);

                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert query_country Short2Name undefined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertCountry(connection, { Country: { Name: "TestCountry" } }, (res, err) => {
                expect(err).to.equal("ERROR: Country Short2Name is undefined");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });
});

describe("Database user Select query", () => {
    it("Select query_ok", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { User: { SteamID: "15465487" } }, (res, err) => {
                expect(err).to.equal(null);
                expect(res).not.to.equal(null);
                expect(res).to.be.an("array");
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select query_user not object", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { }, (res, err) => {
                expect(err).to.equal("ERROR: User is not an object");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select query_user not defined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { User: { } }, (res, err) => {
                expect(err).to.equal("ERROR: SteamID is NaN");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select query_user SteamID string", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { User: { SteamID: "asdafsdf" } }, (res, err) => {
                expect(err).to.equal("ERROR: SteamID is NaN");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Select query_user SteamID too long", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { User: { SteamID: "1111111111111111111111111" } }, (res, err) => {
                expect(err).to.equal("ERROR: SteamID is too long");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });
});

describe("Database user insert query", () => {
    it("Insert query_ok", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertUser(connection, { Country: { Id: 1 }, User: { SteamID: "15465487" } }, (res, err) => {
                expect(err).to.equal(null);
                expect(res).not.to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert query_user not object", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { Country: { Id: 1 } }, (res, err) => {
                expect(err).to.equal("ERROR: User is not an object");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert query_user not defined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { Country: { Id: 1 }, User: { } }, (res, err) => {
                expect(err).to.equal("ERROR: SteamID is NaN");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert query_user SteamID string", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { Country: { Id: 1 }, User: { SteamID: "asdafsdf" } }, (res, err) => {
                expect(err).to.equal("ERROR: SteamID is NaN");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert query_user SteamID too long", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.selectUser(connection, { Country: { Id: 1 }, User: { SteamID: "1111111111111111111111111" } }, (res, err) => {
                expect(err).to.equal("ERROR: SteamID is too long");
                expect(res).to.equal(null);
                
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert Country_Country undefined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertUser(connection, { }, (res, err) => {
                expect(err).to.equal("ERROR: Country is not an object");
                expect(res).to.equal(null);     
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert Country_Country value", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertUser(connection, { Country: "string" }, (res, err) => {
                expect(err).to.equal("ERROR: Country is not an object");
                expect(res).to.equal(null);
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert Country_Country.Id undefined", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertUser(connection, { Country: { } }, (res, err) => {
                expect(err).to.equal("ERROR: Country ID is NaN");
                expect(res).to.equal(null);
                mysql.cancelTransaction(connection, () => {
                    done();
                });
            });
        });
    });

    it("Insert Country_ID string", done => {
        mysql.createTransaction((connection, err) => {
            expect(err).to.equal(null);
            expect(connection).to.not.equal(null);

            mysql.insertUser(connection, { Country: { Id: "string" } }, (res, err) => {
                expect(err).to.equal("ERROR: Country ID is NaN");
                expect(res).to.equal(null);
                mysql.cancelTransaction(connection, () => {
                    done();                 });
            });
        });
    });
});