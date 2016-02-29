class ShopifyAPIClient
  attr_reader :shop_id
  SECRET_API_KEY = "asdasdasQWRESFSDFVSDFASDFSADFASDF123123ASDASD$%$%"
   
  def set_shop_id(shop_Id)
    @shop_id = shop_Id
  end
  
  def orders
    params = Hash.new
    params[:basic_auth] = {username: SECRET_API_KEY, password: ''}
    orders_json = some_http_library.get("https://www.shopify.this.is.a.sample.com/#{shop_id}/orders", params)
    return JSON.parse(orders_json)
  end
  
  def products
    params = Hash.new
    params[:basic_auth] = {username: SECRET_API_KEY, password: ''}
    products_json = some_http_library.get("https://www.shopify.this.is.a.sample.com/#{shop_id}/products", params)
    return JSON.parse(products_json)
  end
  
  def product(id)
    params = Hash.new
    params[:basic_auth] = {username: SECRET_API_KEY, password: ''}
    product_json = some_http_library.get("https://www.shopify.this.is.a.sample.com/#{shop_id}/products/#{id}", params)
    return JSON.parse(product_json)
  end
end