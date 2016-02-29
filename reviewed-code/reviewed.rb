  class ShopifyAPIClient
  attr_accessor :shop_id
  SECRET_API_KEY = "asdasdasQWRESFSDFVSDFASDFSADFASDF123123ASDASD$%$%"
# I changed from attr_reader to attr_acessor, taking off the necessity of creating a setter, 
# and I created the initialize method to prevent that the variable shop_id could be used without any value.
  def initialize (shop_id) {
    @shop_id = shop_id
  }
# Instead of creating a hash with the username and password every time I would need it, I preferred to create this method that has the values that I need.
  def basic_auth
    {
      username: SECRET_API_KEY, 
      password: ''
    }
  end
# Instead of creating a lot of methods, I choose creating just these two methods that summarize well the job that those previous methods would do.
  def find(id)
    params = { basic_auth: basic_auth }
    json = some_http_library.get("https://www.shopify.this.is.a.sample.com/#{shop_id}/#{self.class.name.downcase}/#{id}", params)
    return JSON.parse(json)
  end

  def find_all
    params = { basic_auth: basic_auth }
    json = some_http_library.get("https://www.shopify.this.is.a.sample.com/#{shop_id}/#{self.class.name.downcase}", params)
    return JSON.parse(json)
  end
end
# Created two subclasses, one for orders, other for products, they will have find and find_all methods. I allowed order to have find with id, 
#because I assumed that there were more than one order, since the method name was "orders" not "order".
class Order < ShopifyAPIClient
# specific implementation
end

class Product < ShopifyAPIClient
# specific implementation
end