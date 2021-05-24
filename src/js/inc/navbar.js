/**
 * Object allowing the handling of events related to the navigation bar
 */
const navbar = {
  /**
   * Navbar initialisation
   * @function init
   */
  init () {
    const navbarToggleButtonElement = document.querySelector('#navbar-toggle')
    navbarToggleButtonElement.addEventListener('click', navbar.onNavbarToggleClick)
  },

  /**
   * Toggles 'visible' class, which lets you expand the navigation menu on a mobile device
   * @function onNavbarToggleClick
   */
  onNavbarToggleClick () {
    const navbarMobileTargetElement = document.querySelector('#navbar-mobile')
    navbarMobileTargetElement.classList.toggle('visible')
  },

  /**
   * Refreshes the items in the navbar cart counter
   * @function refreshShopCounter 
   * @param {number} productsCount
   */
  refreshShopCounter (productsCount) {
    const shopCounterElements = document.querySelectorAll('.shop-icon__counter')

    for (const counter of shopCounterElements) {
      counter.textContent = productsCount
    }
  }
}

export default navbar
