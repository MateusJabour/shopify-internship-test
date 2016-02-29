# Allow me to parse strings to json.
require "json"
# getJSON will get a local file and return it parsed in json.
def getJSON(path)
  file = File.read(path)
  JSON.parse(file)
end
# sortProducts will create an empty array, fill it with the products variants and return it sorted by the weight, starting from the lightest item
# and ending on the heaviest.
def sortProducts(products)
  variants = []
  products.each {
    |product| product["variants"].each {
        |variant| variants << variant
    }
  }
  variants.sort_by { |variants| variants["grams"] }
end
# calculatePrice will calculate how much will cost for the maximum of items totalizing 100kg, then it will print the total of items, price and weight. 
def calculatePrice(products)
  totalItems = 0
  totalPrice = 0
  totalWeight = 0

  while totalWeight < 100000
    if totalWeight + products[totalItems]['grams'] <= 100000
      totalWeight += products[totalItems]['grams']
      totalPrice = (products[totalItems]['price'].to_f + totalPrice).round(2)
      totalItems += 1
    else
      puts('Number of items: ' + totalItems.to_s,
            'Price: $' + totalPrice.to_s, 
            'Weight: ' + totalWeight.to_s)
      break;
    end
  end
end
# Here I'm using sortProducts as an arguments on the calculatePrice call because it returns the array calculatePrice needs to calculate the price and then printing the results.
calculatePrice(
  sortProducts(
    getJSON("../products.json")['products']
  )
)
