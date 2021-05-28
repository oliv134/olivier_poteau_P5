import * as bootstrap from 'bootstrap'
/**
 * Object used to display confirmation messages on the screen for a few seconds
 */
const modal = {
  /**
   * Hide modal view after x seconds
   * @function hide
   * @param {string} idModal Modal window id
   * @param {number} duration=2000 Window display time
   */
  hide (idModal, duration = 2000) {
    const myModalEl = document.getElementById(idModal)
    if (myModalEl !== null) {
      myModalEl.addEventListener('shown.bs.modal', function (event) {
        const myModal = bootstrap.Modal.getInstance(myModalEl)
        if (duration > 0) {
          setTimeout(function () {
            myModal.hide()
          }, duration)
        }
      })
    }
  }
}

export default modal
