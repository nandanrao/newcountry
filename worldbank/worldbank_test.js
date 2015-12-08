var sinon = require('sinon');
var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');
var worldbank = require('./worldbank');

// Mock data as it comes from World Bank API
var mockdata = fs.readFileSync('./test/mock.json', 'utf8'); 
mockdata = JSON.parse(mockdata);
var mockcleandata = fs.readFileSync('./test/mockcleandata.json', 'utf8');
mockcleandata = JSON.parse(mockcleandata);


describe('worldbank', function () {
   
    describe('cleanData', function () {

        it('does not return any country named "World"', function () {
            var data = worldbank._cleanData(mockdata);
            _.every(data, function (el) {
                return el.country.value !== 'World';
            })
            .should.equal(true);            
        });

        it('returns an array of "country" objects', function () {
            var data = worldbank._cleanData(mockdata);
            data[1].should.have.deep.property('indicator');
        });
    });

    describe('filterCountries', function() {

        it('returns an array of strings', function () {
            var countries = worldbank._filterCountries(mockcleandata);
            countries[1].should.be.a('String');
        });

        /*
         * To test gdp filtering, we set the gdp threshold to
         * the exact gdp of the first country on the list,
         * then check to see if that country is still on the list. 
         */
        it('filters out a country with gdp lower than the given threshold', function () {
            var example = mockcleandata[0].country.value;
            var amt = mockcleandata[0].value;
            var countries = worldbank._filterCountries(mockcleandata, amt);
            countries[0].should.not.equal(example);
        });
    });

    describe('pickRandomCountry', function () {

        it('returns a single string from an array of strings', function () {
            worldbank._pickRandomCountry(['foo', 'bar', 'baz'])
            .should.be.a('string');
        });
    });

    describe('pickACountry', function () {
        
        it('returns the name of a country', function () {
            var country = worldbank.pickACountry(mockdata);
            country.should.be.a('string'); 
        });
    });
});
 
 
