const constants = require('./constants');

function validateRegistrationFormFields(user) {
    const username = user.username;
    const password = user.password;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const number = user.phoneNumber;
    const country = user.country;
    const town = user.town;

    const emailRegex = constants.emailRegex;
    const digitsRegex = constants.onlyDigitsRegex;

    return new Promise((resolve, reject) => {
        try {
            validateValueLength(3, 15, firstName, constants.invalidFirstName);
            validateValueLength(3, 15, lastName, constants.invalidLastName);
            validateValueLength(3, 15, username, constants.invalidUsername);
            validateWithRegex(email, emailRegex, constants.invalidEmail);
            validateWithRegex(number, digitsRegex, constants.invalidNumber);
            validateValueLength(1, 30, country, constants.invalidCountry);
            validateValueLength(1, 30, town, constants.invalidTown);
            validateValueLength(3, 15, password, constants.invalidPassword);

            resolve('Success');
        } catch (error) {
            reject(error);
        }
    });
}

// validate other data

module.exports = { validateRegistrationFormFields };

function validateValueLength(min, max, value, errorMessage) {
    if (min >= value.length || value.length >= max) {
        throw errorMessage;
    }
}

function validateWithRegex(value, regex, errorMessage) {
    const regexExp = new RegExp(regex);
    if (!regexExp.exec(value)) {
        throw errorMessage;
    }
}
