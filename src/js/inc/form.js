import { post } from './fetch'
import city from './city'
import cart from './cart'
const app = {
  init () {
    app.forms = document.getElementsByClassName('needs-validation')
    document.getElementById('zip').addEventListener('focusout', event => { app.loadCities(event) })
    // Loop over them and prevent submission
    console.log(app.forms)
    Array.prototype.slice.call(app.forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          console.log(form)
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    document.addEventListener('submit', event => app.handleFormSubmit(event))
  },
  handleFormSubmit (event) {
    console.log(app.forms)
    event.preventDefault()
    // Retrieve the products and place their identifier in a table
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
        window.location.href = 'commande.html'
      })
  },
  loadCities (event) {
    const zipcodeEl = document.getElementById('zip')
    console.log(zipcodeEl.value)

    event.preventDefault()

    city.getCitys(zipcodeEl.value)
      .then((cities) => {
        document.querySelectorAll('.state__value').forEach(a => {
          a.remove()
        })
        const targetElement = document.getElementById('city')
        console.log(cities)
        for (const city of cities) {
          const newDiv = document.createElement('option')
          newDiv.className = 'state__value'
          newDiv.innerText = city.nom
          targetElement.appendChild(newDiv)
        }
        targetElement.focus()
        /* A DEBUGGER */
        const eventMouseDown = document.createEvent('Event')
        eventMouseDown.initEvent('click', true, true)
        targetElement.dispatchEvent(eventMouseDown)
      })
  }
}

export default app
