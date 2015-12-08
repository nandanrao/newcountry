# NEW COUNTRY!

This is an app that will pick a new country for you to live in! Based on some random study on happiness and GDP that I once read, happiness tends to trail off once a country reaches $25k US dollars in adjusted income. In that spirit, I created an app that polls the World Bank API for a list of all the countries in the world and their GDP for 2012-2014 (multiple years because some countries don't have recent data), filter the list to only those with an adjusted per capita GDP of over $25k, and then pick a random country, which can be your new home!

Run the app and aim at /promiseness or /nastiness to get a random country!

## Asynchronicity in NodeJS

The purpose of this repo is to show the difference in error handling between callbacks and promises, namely the advantages that promises have with automatic error propagation.

All the asyncrhonous goodness is piled into routes/index.js

## Structure of this app

I chose to make this a barebones Express app, foregoing boilerplate from a generator, in order to 
make it easier to see the actual code that I wrote, as this is meant to be an assignment. Because of that, it's not structured in an idiomatic Express fashion, which is an intentional choice. 

You can run the app with:

```
npm start
```

You can run the tests with:

```
npm test
```
