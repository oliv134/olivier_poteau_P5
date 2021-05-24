import product from './inc/product'
import modal from './inc/modal'
const app = {
  init () {
    // Retrieves the products from the database and calls the associated method to display them

    if (document.title.includes('Accueil') === true) {
    // if (document.querySelector('.products') !== null) {
      product.init()
      product.getProducts()
        .then((response) => {
          product.displayProducts(response)
        })
      modal.hide('modalCart', '2000')
    }
  }
}

document.addEventListener('DOMContentLoaded', app.init)
