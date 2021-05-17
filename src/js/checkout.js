
import product from './inc/product'
import forms from './inc/form'
const app = {
  init () {
    if (document.title.includes('Commande') === true) {
      console.log('jkjkj')
      const summary = JSON.parse(product.getProducts())

      if (summary.orderId === undefined) {
        document.getElementById('cart__products').classList.add('d-none')
        document.getElementById('cart__identity').classList.add('d-none')
        document.getElementById('cart__no').classList.remove('d-none')
      } else {
        product.init()
        product.displayCart()
        forms.init()
        document.getElementById('contactInformation').addEventListener('click', event => document.getElementById('firstName').focus())
      }
    }
  }

}
document.addEventListener('DOMContentLoaded', app.init)
