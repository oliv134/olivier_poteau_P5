
import product from './inc/product'
import forms from './inc/form'
const app = {
  init () {
    if (document.title.includes('Commande') === true) {
      product.displayCart()
      product.init()
      forms.init()
    }
  }

}
document.addEventListener('DOMContentLoaded', app.init)
