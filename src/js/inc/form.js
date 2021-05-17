import city from './city'
import order from './order'
const app = {
  init () {
    app.forms = document.getElementsByClassName('needs-validation')
    document.getElementById('zip').addEventListener('focusout', event => { app.loadCities(event) })
    document.getElementById('zip').addEventListener('change', event => { app.loadCities(event) })
    // Loop over them and prevent submission
    Array.prototype.slice.call(app.forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
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
    event.preventDefault()
    // Retrieve the products and place their identifier in a table
    if (validateEmail(document.getElementById('email').value)) {
      order.setOrder()
    }
  },
  loadCities (event) {
    const zipcodeEl = document.getElementById('zip')

    event.preventDefault()

    city.getCitys(zipcodeEl.value)
      .then((cities) => {
        document.querySelectorAll('.state__value').forEach(a => {
          a.remove()
        })
        const targetElement = document.getElementById('city')

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
function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export default app
