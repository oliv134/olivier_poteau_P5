import product from './inc/product'
import modal from './inc/modal'
import { parameters } from './inc/param'
const app = {
  init () {
    // if the displayed page is the details page then we execute
    if (document.title.includes('Article') === true) {
      product.init()
      const id = parameters(window.location.href, 'id')
      product.getProducts(id).then((response) => {
        product.displayProduct(response)
      })
      modal.hide('modalCart', '2000')
    }
  }
}

document.addEventListener('DOMContentLoaded', app.init)
