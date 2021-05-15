import { get } from './fetch'

const app = {

  /**
  * Get products from the backend in json format
  * @param {string} zipcode
  *
  * @returns {Object[]}
  */
  getCitys (zipCode) {
    console.log(zipCode)
    return get('https://geo.api.gouv.fr/communes' + (zipCode !== undefined ? '?codePostal=' + zipCode : ''))
      .then(response => response.json())
  }

}
export default app
