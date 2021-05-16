
// import product from './inc/product'
import order from './inc/order'
const app = {
  init () {
    if (document.title.includes('Récapitulatif') === true) {
      const summary = JSON.parse(order.getOrder())

      if (summary.orderId === undefined) {
        document.getElementById('order__message').classList.add('d-none')
        document.getElementById('order__summary').classList.add('d-none')
        document.getElementById('order__no').classList.remove('d-none')
      } else {
        document.getElementById('order__firstName').innerText = summary.contact.firstName

        document.getElementById('order__email').innerText = summary.contact.email
        document.getElementById('order__id').innerText = summary.orderId
      }
    }
  }

}
document.addEventListener('DOMContentLoaded', app.init)
