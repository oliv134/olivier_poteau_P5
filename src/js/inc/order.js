import { post } from './fetch'
import cart from './cart'
const app = {
  init () {
    console.log('cést commadé')
  },
  setOrder () {
    // Retrieve the products and place their identifier in a table
    const productsObject = JSON.parse(cart.getProducts())
    const products = []
    for (const product in productsObject) {
      products.push(product)
    }

    // Create a contact object with all the values of the forms
    const contact = {
      firstName: form.formElement.querySelector('#firstname').value,
      lastName: form.formElement.querySelector('#lastname').value,
      address: form.formElement.querySelector('#address').value,
      city: form.formElement.querySelector('#city').value,
      email: form.formElement.querySelector('#email').value
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
        window.location.href = 'commande.html'
      })
  }
}

export default app
