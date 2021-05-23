import city from './city'
import order from './order'
const app = {
  init () {
    app.forms = document.getElementsByClassName('needs-validation')
    document.getElementById('zip').addEventListener('focusout', (event) => {
      app.loadCities(event)
    })
    document.getElementById('zip').addEventListener('change', (event) => {
      app.loadCities(event)
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
  handleFormSubmit (event) {
    event.preventDefault()

    const formType = event.target.getElementsByTagName('input')

    // Retrieve the products and place their identifier in a table
    let formValid = true
    Array.prototype.slice.call(formType).forEach((form) => {
      switch (form.id) {
      case 'firstName':
      case 'lastName':
      case 'city':
        if (validateText(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) { form.focus() }
          formValid = false
        }
        break
      case 'address':
        if (validateAlphanumeric(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) { form.focus() }
          formValid = false
        }
        break
      case 'email':
        if (validateEmail(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) { form.focus() }
          formValid = false
        }
        break
      case 'zip':
        if (validateNumeric(form.value)) {
          form.setCustomValidity('')
          formValid = true
        } else {
          form.setCustomValidity('Invalid')
          if (formValid === true) { form.focus() }
          formValid = false
        }
        break
      }
    })
    if (!event.target.checkValidity()) {
      event.target.classList.add('was-validated')

      formValid = false
    }
    if (formValid) { order.setOrder() }
  },
  loadCities (event) {
    const zipcodeEl = document.getElementById('zip')

    event.preventDefault()

    city.getCitys(zipcodeEl.value).then((cities) => {
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
const validateEmail = (text) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(text))
}
const validateText = (text) => {
  const re = /^(([a-zA-ZÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+))$/
  return re.test(String(text))
}
const validateNumeric = (text) => {
  const re = /^(([0-9]+))$/
  return re.test(String(text))
}
const validateAlphanumeric = (text) => {
  const re = /^(([a-zA-Z 0-9ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ]+))$/
  return re.test(String(text))
}
export default app
