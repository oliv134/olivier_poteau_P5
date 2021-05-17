
import product from './inc/product'
import forms from './inc/form'

const app = {
  init () {
    if (document.title.includes('Commande') === true) {
      product.init()
      product.displayCart()
      forms.init()
      document.getElementById('contactInformation').addEventListener('click', event => document.getElementById('firstName').focus())
    }
  }

}
document.addEventListener('DOMContentLoaded', app.init)
