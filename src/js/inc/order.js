import { post } from './fetch'
import cart from './cart'
const app = {
  setOrder () {
    const productsObject = JSON.parse(cart.getProducts())
    const products = []
    for (const product in productsObject) {
      products.push(product)
    }
    // Create a contact object with all the values of the forms
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }
    // Send the products table and the contact object to finalize the order
    post('http://localhost:3000/api/cameras/order', JSON.stringify({ contact, products }))
      .then(response => response.json())
      .then(function (response) {
        // Adds the order object retrieved in the request
        localStorage.setItem('order', JSON.stringify(response))
        // Remove products from localstorage
        localStorage.removeItem('products')
        // Redirects to the order confirmation page
        window.location.href = 'summary.html'
      })
  },
  getOrder () {
    return localStorage.getItem('order') ?? '{}'
  },
  displayOrder: function (product) {
    const template = document.querySelector('#cart__row')
    const targetElement = document.querySelector('#cart__products')

    // Create a clone of the template and fill in all the information collected earlier
    const templateClone = document.importNode(template.content, true)

    // Product id
    templateClone.querySelector('.product__row').dataset.id = product._id

    // Product image
    templateClone.querySelector('.product__image').src = product.imageUrl

    // Product name
    templateClone.querySelector('.product__name').textContent = product.name

    // Product price
    templateClone.querySelector('.product__price').textContent = product.price / 100

    targetElement.appendChild(templateClone)

    // Update products summary
    // app.updateSum()
  },
  deleterOrder () {
    localStorage.removeItem('order')
  },
  updateSum: function () {
    const totals = document.getElementsByClassName('product__price')
    let productsPrice = 0

    // Add all the total prices of the products
    for (const total of totals) {
      productsPrice += parseInt(total.textContent.replace('€', ''), 10)
    }

    // Updates the subtotal and total in the summary
    const productsTotal = app.getProductsCount()
    document.querySelector('.products__total').textContent = productsTotal + ' article' + (productsTotal > 1 ? 's' : '')
    document.querySelector('.subtotal__price').textContent = '€ ' + productsPrice
    document.querySelector('.total__price').textContent = '€ ' + productsPrice
  },
  getProductsCount () {
    const summary = JSON.parse(app.getOrder())
    return summary.products.length
  }

}

export default app
