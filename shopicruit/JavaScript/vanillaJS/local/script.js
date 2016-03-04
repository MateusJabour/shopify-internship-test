//put IIFE to protect global environment and use strict.
(function (window, document) {
  'use strict';
//I created a function that it's a IIFE, called priceCalculator, this helps me to make methods private or public.
//On this function there are methods to calculate the total price of the maximum items that I can get with the limit of 100kg.
  var priceCalculator = (function () {
//The method priceCalculator.init will return the results, and forward I can use it return to print those results on html.
    var init = function (products) {
      var variants = sortVariants(products);
      return calculatePrice(variants);
    };
//priceCalculator.compareWeights is a callback to sort an array of objects by their weights(grams property).
    var compareWeights = function (itemA, itemB) {
      var x = itemA.grams;
      var y = itemB.grams;

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    };
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
    };
//priceCalculator.calculatePrice will calculate how much will cost for the maximum of items totalizing 100kg, then it will return an array containing objects with two properties: title and value.
//There are objects for each total: weight, items, price.
    var calculatePrice = function (products) {
      var totalWeight = 0;
      var totalPrice = 0;

      for (var totalItems = 0; totalItems < products.length; totalItems++) {
        if(totalWeight + products[totalItems].grams <= 100000) {
          totalWeight += products[totalItems].grams;
          totalPrice = Math.round((parseFloat(products[totalItems].price) + totalPrice) * 100)/100;
        } else {
          break;
        }
      }
      return [
        { title: 'Items number', value: totalItems },
        { title: 'Total price', value: '$' + totalPrice },
        { title: 'Total weight', value: totalWeight }
      ];
    };
//Letting init public, since it is the only method I will need to use outside the IIFE priceCalculator.
    return {
      init: init
    };
  })();
//printer is a IIFE too, this function has methods to print the results on html.
  var printer = (function () {
    var defListNode;
//printer.init create a definition list tag with the id that you passed by parameter and give defListNode the reference to this tag.
    var init = function (definitionListId) {
      var defList = document.createElement('dl');
      defList.id = definitionListId;
      document.body.appendChild(defList);

      defListNode = document.querySelectorAll('#' + definitionListId);
      defListNode = defListNode[0];
    };
//printer.log gets an array of objects and iterate on it using forEach , appending each object to the tag created by the init.
    var log = function (objects) {
      objects.forEach(appendObject);
    };
//printer.appendObject creates a dt tag with the title of the object and a dd tag with the value of the object, then append both to defListNode(dl tag).
    var appendObject = function (object) {
      var objectTitle = document.createElement('dt');
      objectTitle.innerHTML = object.title;

      var objectValue = document.createElement('dd');
      objectValue.innerHTML = object.value;

      defListNode.appendChild(objectTitle);
      defListNode.appendChild(objectValue);
    };
//Letting init and log publics
    return {
      init: init,
      log: log
    };
  })();

  printer.init('products');
  printer.log(priceCalculator.init(Shopify.Products.products));
})(window, document);
