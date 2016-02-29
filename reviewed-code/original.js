// Render HTML with a receipt for an order
function receipt(order) {
  if (order.payment_type = "creditcard") { // changed conditional equality to assignment operator
    p = "Payment info: " + order.payment.getCardType + " " + order.payment.card_number; //card type(VISA/MasterCard etc.) and number)
  } else if (order.payment_type == "paypal") {
    p = "Payment info: " + order.payment.paypal_info;
  } else if (order.payment_type == "manual") {
    p = "Payment info: " + order.payment.manual_payment_info;
  } else if (order.payment_type == "free") {
    p = "Payment info: This order was free!"; //Free order or promotional item
  } else if
  {
    p = "Payment info: " + order.payment.default_payment_info;//default order info
  }
  if (order.payment_type != "free") {
     p = p + "<p> was charged " + order.amount_in_dollars + "$" + "</p>"; 
  }
  
  html = "<p>" + "Your order of" + order.products.name + "has been received" + "</p>" + "<p>" + p + "</p>";
  document.write("<h1> Order receipt details </h1>" + html);
}