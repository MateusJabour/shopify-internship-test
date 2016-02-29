//put IIFE to protect global environment and use strict.
(function() {
    'use strict';
//I created a function that it is a IIFE, this helps me to make methods private and public.
//On this IIFE there are methods to calculate the total price of the maximum items that I can get with the limit of 100kg of items
  var priceCalculator = (function () {
//priceCalculator.init will call pricaCalcultor.calculatePrice sing priceCalculator.sortVariants as an argument 
//because it returns the array priceCalculator.calculatePrice needs for calculating the price and then log the results.
    var init = function (products) {
      calculatePrice(sortVariants(products));
    }
//priceCalculator.compareWeights is a callback to sort an array of objects by their weights(grams property).
    var compareWeights = function (itemA, itemB) {
      var x = itemA.grams; 
      var y = itemB.grams;

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
//priceCalculator.sortVariants will create an empty array, fill it with the products variants and return it sorted by the weight, starting from the lightest item
//and ending on the heaviest.
    var sortVariants = function (products) {
      var productVariants = [];

      products.forEach(function(product) {
        product.variants.forEach(function(variant) {
          productVariants.push(variant);
        });
      });

      return productVariants.sort(compareWeights);
    }
//priceCalculator.calculatePrice will calculate how much will cost for the maximum of items totalizing 100kg, then it will return log the total of items, price and weight.
    var calculatePrice = function (products) {
      var totalWeight = 0;
      var totalPrice = 0;

      for (var totalItems = 0; totalItems < products.length; totalItems++) {
        if(totalWeight + products[totalItems].grams <= 100000) {
          totalWeight += products[totalItems].grams;
          totalPrice = Math.round((parseFloat(products[totalItems].price) + totalPrice) * 100)/100;
        } else {
          console.log('Number of items: ' + totalItems,
                      '\nPrice: $' + totalPrice, 
                      '\nWeight: ' + totalWeight);
          break;
        }
      }
    }
//Letting init public, since it is the only method I will need to use outside the IIFE priceCalculator.
    return {
      init: init 
    }
  })();
//In node, we can use require to get a file that we what to use, so, I called init, passing the required JSON by parameter.
  priceCalculator.init(require('../../products.json').products);
})();