import product from './inc/product'
import modal from './inc/modal'
import { parameters } from './inc/param'
const app = {
  init () {
    // Retrieves the products from the database and calls the associated method to display them

    if (document.title.includes('Article') === true) {
      // if (document.querySelector('.products') !== null) {
      product.init()

      console.log(parameters(window.location.href, 'id'))

      modal.hide('modalCart', '2000')
    }
  }
}

document.addEventListener('DOMContentLoaded', app.init)
