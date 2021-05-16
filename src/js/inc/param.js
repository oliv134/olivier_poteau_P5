/**
 * Function allowing to make AJAX calls with the "GET" method and return in JSON format
 *
 * @param {string} url
 * @param {string/array} parameters
 *
 * @returns {array}
 */

export const parameters = (url, parameters) => {
  const ourl = new URL(url)
  if (parameters.isArray) {
    for (const element of parameters) {
      // const result = [element][parameter(ourl, element)]
      // return result
      console.log(element)
    }
  } else {
    return parameter(ourl, parameters)
  }
}

const parameter = (url, parameter) => {
  const searchParams = new URLSearchParams(url.search)
  if (searchParams.has(parameter)) {
    const name = searchParams.get(parameter)
    return name
  }
}
