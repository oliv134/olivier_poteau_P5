import { get } from './fetch'

const app = {
  /**
  * Retourne une liste de villes en fonction du code postal fourni
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
