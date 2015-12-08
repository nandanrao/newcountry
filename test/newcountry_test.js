var sinon = require('sinon');
var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
var fs = require('fs');

var app = require('../app');
var request = require('supertest');
var nock = require('nock');
var worldbank = require('../worldbank/worldbank');

// Mock data as it comes from World Bank API
var mockdata = fs.readFileSync('./test/mock.json', 'utf8'); 
mockdata = JSON.parse(mockdata);


describe('API', function () {
    var scope;

    beforeEach(function () {
        scope = nock(worldbank.getUrl())
            .get('')
            .query(true);
    });

    describe('promiseness', function () {

        it('catches, handles, and returns 500 on external API errors', function (done) {
            scope.replyWithError('Busted!');
            request(app)
                .get('/promiseness')
                .expect(500, done);
        });

        it('catches, handles, and returns 500 on internal errors', 
           function (done) {
               scope.reply(200, "not an array");
               request(app)
                   .get('/promiseness')
                   .expect(500, done);
        });

        it('returns a country when given proper data from the external API',
           function (done) {
               scope.reply(200, mockdata);
               request(app)
                   .get('/promiseness')
                   .expect(200, done);
        });
    });

    describe('nastiness', function () { 
        
        it('catches, handles, and reutrns 500 on external API errors', function (done) {
            scope.replyWithError('get nasty');
            request(app) 
                .get('/nastiness')
                .expect(500, done);
        });

        it('catches, handles, and retursn 500 on internal errors', function (done) {
            scope.reply(200, 'not an array');
            request(app)
                .get('/nastiness')
                .expect(500, done);
        });

        it('returns a country when give proper data', function (done) {
            scope.reply(200, mockdata);
            request(app) 
                .get('/nastiness')
                .expect(200, done);
        });
    });
});
 
