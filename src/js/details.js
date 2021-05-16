import product from './inc/product'
import modal from './inc/modal'
import { parameters } from './inc/param'
const app = {
  init () {
    // Retrieves the products from the database and calls the associated method to display them

    if (document.title.includes('Article') === true) {
      // if (document.querySelector('.products') !== null) {
      product.init()

      const id = parameters(window.location.href, 'id')
      console.log(id)
      product.getProducts(id).then((response) => {
        console.log(response)
        product.displayProduct(response)
      })

      modal.hide('modalCart', '2000')
    }
  }
}

document.addEventListener('DOMContentLoaded', app.init)
