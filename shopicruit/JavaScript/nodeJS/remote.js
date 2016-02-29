//put IIFE to protect global environment and use strict.
(function() {
    'use strict';
//I created a function that it is a IIFE, this helps me to make methods private and public.
//On this IIFE there are methods to calculate the total price of the maximum items that I can get with the limit of 100kg of items
  var  priceCalculator = (function () {
    var http = require('http');//I'm using this library from node.js to make http requests
    var json = '';
//priceCalculator.init will handle the http request.
    var init = function (url) {
      makeRequestGet(
        parseUrl(url), 
        requestCallback(fillJson, endCallback), 
        showError
      );
    }
//priceCalculator.makeRequestGet makes a GET request, it requires 3 arguments: the options(port, host, path...) and two callbacks, one to handle the response and other to handle errors.
    var makeRequestGet = function (options, callback, errorCallback) {
      http.get(options, callback).on("error", errorCallback);
    }
//priceCalculator.parseUrl receives a url, clean it removing the http part, split into path and host, and return the options mentioned before.
    var parseUrl = function (url) {
      var protocolRegex = /\w+(\..+)?\.com\/.+/g;
      var cleanUrl = url.match(protocolRegex)[0];
      var splitCleanUrl = cleanUrl.split('/', 2);

      return {
        host: splitCleanUrl[0],
        path:'/' + splitCleanUrl[1],
        port: 80
      }
    }
//priceCalculator.requestCallback return a callback for the http request, it contains two events: one listens the data from the response coming, 
//and the other listens when the data finished coming. This functions requires 2 arguments: two callbacks for each event.
    var requestCallback = function (dataCallback, endCallback) {
      return function (response) {
        response.on('data', dataCallback);
        response.on('end', endCallback);
      }
    }
//priceCalculator.compareWeights is a callback to sort an array of objects by their weights(grams property).
    var compareWeight = function (itemA, itemB) {
      var x = itemA.grams; 
      var y = itemB.grams;

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
//This is the callback for the first event of the request, the one that listens the data coming in.
//It simply fills json variable with the json we requested.
    var fillJson = function (chunk) {
      json += chunk;
    }
//priceCalculator.sortVariants will create an empty array, fill it with the products variants and return it sorted by the weight, starting from the lightest item
//and ending on the heaviest.
    var sortVariants = function  (json) {
      var products = JSON.parse(json).products;
      var variants = [];
          
      products.forEach( function(product) {
        product.variants.forEach( function(variant) {
          variants.push(variant);
        });
      });
      return variants.sort(compareWeight);
    }
//priceCalculator.calculatePrice will calculate how much will cost for the maximum of items totalizing 100kg, then it will log the total of items, price and weight.
    var calculatePrice = function (products) {
      var totalPrice = 0;
      var totalWeight = 0;

      for (var totalItems = 0; totalItems < products.length; totalItems++) {
        if( totalWeight + products[totalItems].grams <= 100000 ) {
          totalWeight += products[totalItems].grams;
          totalPrice = Math.round((parseFloat(products[totalItems].price) + totalPrice) * 100)/100;
        } else {
          console.log('Number of items: ' + totalItems,
                      '\nPrice: $' + totalPrice, 
                      '\nWeight: ' + totalWeight);
          break;
          }
      };
    }
//This is the callback for the second event, the one that is listened when the data finished coming.
//It simply call priceCalculator.calculatePrice, I'm using priceCalculator.sortVariants as an argument 
//because it returns the array priceCalculator.calculatePrice needs for calculating the price and then log the results.
    var endCallback = function () {
      calculatePrice(sortVariants(json));
    }
//This is the callback for errors, if something wrong happens, it logs a error message.
    var showError = function (error) {
      console.log('Got an error: ' + error);
    }
//Letting init public, since it is the only method I will need to use outside the IIFE priceCalculator.
    return {
      init: init
    }
  })();

  priceCalculator.init('http://shopicruit.myshopify.com/products.json');
})();