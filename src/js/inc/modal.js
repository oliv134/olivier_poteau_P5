import * as bootstrap from 'bootstrap'
/**
 * Object used to display confirmation messages on the screen for a few seconds
 */
const modal = {
  /**
   * Hide modal view after x seconds
   *
   * @param {string} idModal
   * @param {number} Duration
   */
  hide (idModal, duration = 2000) {
    const myModalEl = document.getElementById(idModal)
    if (myModalEl !== null) {
      // const modal = bootstrap.Modal.getInstance(myModalEl)

      myModalEl.addEventListener('shown.bs.modal', function (event) {
        const myModal = bootstrap.Modal.getInstance(myModalEl)
        setTimeout(function () {
          myModal.hide()
        }, duration)
      })
    }
  }
}

export default modal
