import product from './inc/product'
import modal from './inc/modal'
const app = {
  init () {
    // if the displayed page is the home page then we execute
    if (document.title.includes('Accueil') === true) {
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
