import city from './city'
import order from './order'

const app = {
  /**
   * Initialize form
   * @function init
   */
  init () {
    app.forms = document.getElementsByClassName('needs-validation')
    document.getElementById('zip').addEventListener('focusout', (event) => {
      app.displayCities(event)
    })
    document.getElementById('zip').addEventListener('change', (event) => {
      app.displayCities(event)
    })
    // Loop over them and prevent submission
    Array.prototype.slice.call(app.forms).forEach((form) => {
      form.addEventListener(
        'submit',
        (event) => app.handleFormSubmit(event),
        false
      )
    })
  },
  /**
   * Check the form data and create the order if necessary
   * @function handleFormSubmit
   * @param  {} event
   */
  handleFormSubmit (event) {
    event.preventDefault()
    const formType = event.target.getElementsByTagName('input')
    // Test the form fields
    let formValid = true
    Array.prototype.slice.call(formType).forEach((form) => {
      switch (form.id) {
      // Test firstName, lastName and city
      case 'firstName':
      case 'lastName':
      case 'city':
        if (validateText(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) {
            form.focus()
          }
          formValid = false
        }
        break
        // test address
      case 'address':
        if (validateAlphanumeric(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) {
            form.focus()
          }
          formValid = false
        }
        break
        // test email
      case 'email':
        if (validateEmail(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) {
            form.focus()
          }
          formValid = false
        }
        break
        // test zipcode
      case 'zip':
        if (validateNumeric(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) {
            form.focus()
          }
          formValid = false
        }
        break
      }
    })
    if (!event.target.checkValidity()) {
      event.target.classList.add('was-validated')
      formValid = false
    }
    if (formValid) {
      order.setOrder()
    }
  },
  /**
   * Returns a list of city with the given postal code
   * @function displayCities
   * @param  {string} event
   */
  displayCities (event) {
    const zipcodeEl = document.getElementById('zip')

    event.preventDefault()

    city.getCities(zipcodeEl.value).then((cities) => {
      document.querySelectorAll('.state__value').forEach((a) => {
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
    })
  }
}
/**
 * Test if an email is valid
 * @function validateEmail
 * @param  {string} text Email to test
 * @returns {boolean}
 */
const validateEmail = (text) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(text))
}
/**
 * Test if the character string contains only letters
 * @function validateText
 * @param  {string} text Text to test
 * @returns {boolean}
 */
const validateText = (text) => {
  const re = /^(([a-zA-ZÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+))$/
  return re.test(String(text))
}
/**
 * Test if the character string contains only numbers
 * @function validateNumeric
 * @param {string} text Text to test
 * @returns {boolean}
 */
const validateNumeric = (text) => {
  const re = /^(([0-9]+))$/
  return re.test(String(text))
}
/**
 * Test if the character string contains only letters and / or numbers
 * @function validateAlphanumeric
 * @param  {string} text Text to test
 * @returns {boolean}
 */
const validateAlphanumeric = (text) => {
  const re = /^(([a-zA-Z 0-9ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+))$/
  return re.test(String(text))
}
export default app
