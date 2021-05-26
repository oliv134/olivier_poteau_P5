import { get } from './fetch'
import cart from './cart'

const app = {
  init () {
    cart.init()
  },
  /**
  * Get products from the backend in json format
  *
  * @param {string} productId
  * @returns {Object[]}
  */
  getProducts (productId) {
    return get('http://localhost:3000/api/cameras' + (productId !== undefined ? '/' + productId : ''))
      .then(response => response.json())
  },

  /**
    * Displays all products retrieved earlier from the database on the .getProducts()
    *
    * @param  {Object[]} products
    */
  displayProducts (products) {
    for (const product of products) {
      app.displayProduct(product)
    }
  },
  /**
   * Display a product in a template
   * @function displayProduct
   * @param  {Object} product
   */
  displayProduct (product) {
    // Create a clone of the template and fill in all the information collected earlier
    const template = document.querySelector('#product-card')
    const targetElement = document.querySelector('.products')
    const templateClone = document.importNode(template.content, true)

    // Image div parent
    templateClone.querySelector('.product__image').href = 'details.html?id=' + product._id
    templateClone.querySelector('img').src = product.imageUrl
    templateClone.querySelector('img').alt = product.name

    // Shop button
    templateClone.querySelector('.shop').dataset.id = product._id
    templateClone.querySelector('.shop').addEventListener('click', cart.handleShopButtonClick)

    // Preview button
    templateClone.querySelector('.view').href = 'details.html?id=' + product._id

    // Description paragraphs
    templateClone.querySelector('.product__name').textContent = product.name
    templateClone.querySelector('.product__description').textContent = product.description
    templateClone.querySelector('.product__price').textContent = (product.price / 100) + '€'

    for (const options of product.lenses) {
      const newDiv = document.createElement('option')

      newDiv.className = 'options_value'
      newDiv.innerText = options
      templateClone.getElementById('options').appendChild(newDiv)
    }
    // Add the item's clone to the parent 'products'
    targetElement.appendChild(templateClone)
  },
  /**
   * Show Cart
   * @function displayCart
   */
  displayCart () {
    const products = JSON.parse(cart.getProducts())

    for (const product in products) {
      app.getProducts(product)
        .then(response => {
          response.count = products[product]
          cart.displayProduct(response)
        })
    }
    cart.updateSum()
  }

}
export default app
