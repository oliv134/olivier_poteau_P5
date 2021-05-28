import { get } from './fetch'

const app = {
  /**
  * Returns a list of cities based on the postal code provided
  * @function getCities
  * @param {string} zipcode
  * @returns {Object[]} cities
  */
  getCities (zipCode) {
    return get('https://geo.api.gouv.fr/communes' + (zipCode !== undefined ? '?codePostal=' + zipCode : ''))
      .then(response => response.json())
  }
}
export default app
