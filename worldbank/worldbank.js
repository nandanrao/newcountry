var worldbank = {};
var _ = require('lodash');


/*********************************************************************************
 ---------------------------------------------------------------------------------
 HELPER METHODS
 ---------------------------------------------------------------------------------
 *********************************************************************************/

/*
 * cleanData cleans and formats some of the weirdness out of the World Bank
 * data, returning a single array of "country" objects (an object whose internal
 * structure we do not change here).
 */
worldbank._cleanData = function (data) {

    /* The world bank returns an array, the first index is
     * purely metadata, the second index is the array of countries.
     */
    data = data[1];
    
    /* The first 'countries in this dataset are actually
     * regions of the world, so we drop everything before
     * afghanistan, the first country in the alphabetical list.
     * NOTE: Fix this if there's a new country in the world :D
     */
    return _.dropWhile(data, function (el) {
        return el.country.value !== 'Afghanistan';
    });
};

/*
 * filterCountries takes an array of "country" objects (the format given by the World
 * Bank API), and returns an array of strings, names of the countries,
 * ie: ['Amurica', 'Lame Country']
 */
worldbank._filterCountries = function (data, amt) {
    // This is the threshold for our countries' GDP.
    amt = amt || 25000;

    return _(data)            
        .filter(function (el) {            
            return el.value > amt;
        })
        .map(function (el) {
            return el.country.value;
        })
        .uniq() // We grabbed multiple years of data, so we need to squash duplicates. 
        .value();
};

/*
 * pickRandomCountry just picks a random item from an array. 
 */
worldbank._pickRandomCountry = function (countries) {
    return countries[_.random(0, countries.length - 1)];
};


/*********************************************************************************
 ---------------------------------------------------------------------------------
 PUBLIC API
 ---------------------------------------------------------------------------------
 *********************************************************************************/

/*
 * this is just a wrapper around our hardcoded API call. 
 */
worldbank.getUrl = function () {
    return 'http://api.worldbank.org/countries/indicators/' +
        'NY.GNP.PCAP.PP.CD?per_page=2000&date=2012:2014&format=json';
};

/*
 * pickACountry takes the raw data returned by the World Bank's GDP API,
 * queried to get the GDP of every country, and an optional threshold number,
 * and returns the name of a random country whose GDP is above the the threshold.
 * If no threshold is given, it reverts to the default provided in the filterCountries
 * method.
 */
worldbank.pickACountry = function (rawData, gdpThreshold) {
    
    // Very primitive duck-typing on rawData, hoping it's at least an array.
    if (!_.isArray(rawData)) {
        throw new TypeError('Raw Data is not the right type! ', rawData);
    }
    var clean = worldbank._cleanData(rawData);
    var filtered = worldbank._filterCountries(clean, gdpThreshold);
    return worldbank._pickRandomCountry(filtered);
};


module.exports = worldbank;
