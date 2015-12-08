/*
 * Integration tests for all API endpoints in this file are found under
 * test/newcountry_test.js
 */

var router = require('express').Router();
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var worldbank = require('../worldbank/worldbank');
var _ = require('lodash');

/*
 * Here are the two examples of promises/callbacks.
 *
 * You can clearly see the separate error handling needed when we use
 * callbacks, which do not have any sort of explicit error chaining. When
 * using promises, on the other hand, error handling withn the promise chain
 * is propogated automatically to the "catch block," making it so that you
 * don't need to keep track of erros in intermediate steps.
 *
 * NOTE: Rather than mapping the requests to a controller in a separate
 * module, which would be more idiomatic in an Express app, I handled the
 * asyncrhonicity directly in the router, here, to avoid obscuring the point of the
 * excersize. It also gave some meaning to the integration tests, which would
 * otherwise be rather pointless, and it felt important to show both integration
 * and unit tests. 
 */

router.use('/promiseness', function (req, res, next) {
    request.getAsync(worldbank.getUrl())
        .then(function (response){
            data = JSON.parse(response.body);
            var country = worldbank.pickACountry(data);
            res.status(200).send(country);
        })
        .catch(function (err) {
            next(err);
        });
});

router.use('/nastiness', function (req, res, next) {
    request(worldbank.getUrl(), function (err, response, body) {
        var data;
        var country;

        if (!err && response.statusCode == 200) {
            try {
                data = JSON.parse(response.body);
                country = worldbank.pickACountry(data);
                res.status(200).send(country);
            }
            catch (err) {
                next(err);
            }
        }
        else {
            next(err);
        }
    });
});

module.exports = router;
