/**
 * Regular expression for validating email addresses.
 * This regex checks for a general structure of an email, including '@' and domain parts.
 */
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Collection of utility functions for form validation.
 * Includes functions to validate username, email, password, dropdown selections, and general input.
 */
const validators = {
  /**
   * Validates a username.
   * @param {string} username - The username to validate.
   * @returns {string} An error message if validation fails, otherwise an empty string.
   */
  validateUsername: (username) => {
    if (!username) return 'Username is required.'
    if (username.length < 3) return 'Username must be at least 3 characters long.'
    return ''
  },

  /**
   * Validates an email address using the emailRegex.
   * @param {string} email - The email to validate.
   * @returns {string} An error message if validation fails, otherwise an empty string.
   */
  validateEmail: (email) => {
    if (!email) return 'Email is required.'
    if (!emailRegex.test(email)) return 'Email is invalid.'
    return ''
  },

  /**
   * Validates a password.
   * @param {string} password - The password to validate.
   * @returns {string} An error message if validation fails, otherwise an empty string.
   */
  validatePassword: (password) => {
    if (!password) return 'Password is required.'
    if (password.length < 6) return 'Password must be at least 6 characters long.'
    return ''
  },

  /**
   * Validates a dropdown selection.
   * @param {string} selection - The selected value.
   * @param {string} field - The field name of the dropdown for a custom error message.
   * @returns {string} An error message if validation fails, otherwise an empty string.
   */
  validateDropdown: (selection, field) => {
    if (!selection) return `${field} is required.`
    return ''
  },

  /**
   * Validates a generic text input, ensuring it is not empty or just whitespace.
   * @param {string} input - The input text to validate.
   * @returns {string} An error message if validation fails, otherwise an empty string.
   */
  validateInput: (input) => {
    if (!input.trim()) return 'Input cannot be blank.'
    return ''
  }
}

export default validators
