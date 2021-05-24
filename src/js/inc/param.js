/**
 * Function which retrieves a specified parameter and its value in a url
 * @function parameters
 * @param {string} url
 * @param {string} parameter
 * @returns {string} value
 */

export const parameters = (url, parameter) => {
  const findUrl = new URL(url)
  const searchParams = new URLSearchParams(findUrl.search)
  if (searchParams.has(parameter)) {
    const name = searchParams.get(parameter)
    return name
  }
}
