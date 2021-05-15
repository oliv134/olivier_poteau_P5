/**
 * Function allowing to make AJAX calls with the "GET" method and return in JSON format
 *
 * @param {string} url
 *
 * @returns {Promise<Response>}
 */

export const get = (url) => {
  const header = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return window.fetch(url, header)

    .catch(function (error) {
      window.alert('AJAX request failed, please try again later: ' + error.message)
    })
}

/**
* Function allowing to make AJAX calls with the "POST" method and return in JSON format
*
* @param {string} url
* @param {string} content
*
* @returns {Promise<Response>}
*/
export const post = (url, content) => {
  const header = {
    method: 'POST',
    body: content,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    return window.fetch(url, header)
  } catch (error) {
    window.alert('AJAX request failed, please try again later: ' + error.message)
  }
}
