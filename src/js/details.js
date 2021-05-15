import product from './inc/product'
import modal from './inc/modal'
const app = {
  init () {
    // Retrieves the products from the database and calls the associated method to display them

    if (document.title.includes('Article') === true) {
      // if (document.querySelector('.products') !== null) {
      product.init()

      const url = new URL(window.location.href)
      const searchParams = new URLSearchParams(url.search)
      if (searchParams.has('id')) {
        const name = searchParams.get('id')
        console.log(name)
      }
      modal.hide('modalCart', '2000')
    }
  }
}

document.addEventListener('DOMContentLoaded', app.init)
