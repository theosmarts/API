/**
 * check if values in the object are empty
 * 
 * @param {object} object
 * @return {object}
 * 
 */
export const isEmpty = (object, uniqueValues ) => {
    let result;
    let item = Object.keys(object)

    uniqueValues.forEach((element, index) => {
        if (object[element] === '' || object[element] === null) {
            
            result = {
                status: 'error',
                message: `${element} cannot be empty`
            }
        }
    });
    return result;
}

/**
 * Check is string is an email
 * @param {string} email
 * @returns {object}
 */
export const isEmail = (email) => {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !re.test(email)
        && {
                status: 'error',
                message: 'the email provided is invalid'
        }
}

/**
 * Checks if the object contains the expected keys
 * @param {object} object
 * @param {array} expectedKeys
 * @returns {object}
 */
export const isExpectedObject = (object, expectedKeys) => {
    let result;
    let keys = Object.keys(object)

    keys.map((item, index) => {
        if (keys.length != expectedKeys.length) {
            console.log(expectedKeys);
            result = {
                    status: 'error',
                    message: 'You either have extra or less fields'
            }
        }
        if (!expectedKeys.includes(item)) {
            result = {
                    status: 'error',
                    message: `the item --${keys[index]}-- is invalid`,
                }
        }

    })
    return result;
}

/**
 * Check if number is a valide phone number
 * @param {object} mobileNumber
 * @return {boolean}
 */
export const isPhoneNumber = (phone) => {
    let re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    if (re.test(phone)) {
        return true
    }
    else {
        return false
    }
}