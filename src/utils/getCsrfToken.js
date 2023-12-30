// TODO: Remove, not used.

/**
 * Extracts the CSRF token from the document cookies.
 * @return {string} The value of the CSRF token, or an empty string if not found.
 */
function getCsrfToken () {
  const name = 'csrftoken='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim()
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }

  return '' // Return empty string if the token isn't found
}

export default getCsrfToken
