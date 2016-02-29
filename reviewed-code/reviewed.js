//Put IIFE to protect global environment and use strict.
(function(window, document) {
  'use strict';
//Created a function that it is a IIFE that has a lot of methods that have the same context, in this case, the context is making the order details appears on the HTML.
//The other reason to create a IIFE to store those methods is the fact that I can make methods public or private.
  var shopify = (function () {
//So I created shopify.writeOrderDetails to separate better each responsibility, it basically creates a new array, fill it strings that represent what I want to write on my html,
//after this, I use join on this array, passing a '\n' to the argument and write the return of this join. I used that way to make the code more readable and more organized.
    var writeOrderDetails = function (order, payment_info) {
      var finalHtml = [];
      finalHtml.push("<h1> Order receipt details </h1>");
      finalHtml.push("<p>Your order of" + order.products.name + "has been received</p>");
      finalHtml.push("<p>" + payment_info + "</p>");
      document.write(finalHtml.join('\n'));
    }
//On getPaymentInfo, I made two changes:I changed the name of the variable "p" to "payment_info", giving it a meaning,
//and I initialized it with the beginning of the text "Payment info:", instead of repeating it on all if's, and I changed a little bit of the logic, 
//instead of creating an unordered if/else statement, I made the logic follow two steps: 
//The first step is to see if the order is free or not, if yes, it just concatenate the order payment info and finish the if/else.
//If isn't free, it enter on the second step, that is to see which is the payment type,
//I used switch instead of an amount of if/else's to make it more organized.
  var getPaymentInfo = function (order) {
    var payment_info = 'Payment info: ';
    if (order.payment_type === 'free') {
      payment_info += order.payment.default_payment_info;
    } else {
      switch(order.payment_type) {
        case 'creditcard':
          payment_info += order.payment.getCardType + " " + order.payment.card_number;
          break;
        case 'paypal':
          payment_info += order.payment.paypal_info;
          break;
        case 'manual':
          payment_info += order.payment.manual_payment_info;
          break;
        default:
          payment_info += order.payment.default_payment_info;
        }
      return payment_info + "<p> was charged " + order.amount_in_dollars + "$" + "</p>";
      }
    }
//shopify.receipt will call writeOrderDetails and this call will receive the paymentInfo and the order.
    var receipt = function (order) {
      writeOrderDetails(order, getPaymentInfo(order));
    }
//I let receipt public, since it is the only method I really need to use outside this IIFE.
    return {
      receipt: receipt
    }
  })();
//Call receipt to see all order details on the html.
  shopify.receipt(order);

})(window, document);
