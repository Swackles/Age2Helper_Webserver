const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should;
const expect = require("chai").expect;

chai.use(chaiHttp);