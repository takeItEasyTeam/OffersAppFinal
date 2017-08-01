const constants = require('./constants');
    const emailRegex = constants.emailRegex;
    const digitsRegex = constants.onlyDigitsRegex;
    const dateRegex = constants.dateRegex;

function validateRegistrationFormFields(user, data) {
    const username = user.username;
    const password = user.password;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const number = user.phoneNumber;
    const country = user.country;
    const town = user.town;
    console.log('validate', password);
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
            validateUniqueValue(username, data, constants.uniqueUsername);
            resolve('Success');
        } catch (error) {
            reject(error);
        }
    });
}

function validateUserImage(image) {
    return new Promise((resolve, reject) => {
        try {
            validateValueLength(1, 1, image, constants.invalidUserImageLength);
            resolve('Success');
        } catch (error) {
            reject(error);
        }
    });
}

function validateCreateNewOfferForm(offer) {
    const destination = offer.destination;
    const city = offer.city;
    const validity = offer.validity;
    const price = offer.price;
    const description = offer.description;
    const files = offer.files;
    return new Promise((resolve, reject) => {
        try {
            const descriptionMessage = constants.invalidDescription;
            validateOfferType(destination, constants.invalidOfferType);
            validateValueLength(1, 30, city, constants.invalidTown);
            validateWithRegex(validity, dateRegex, constants.invalidDateFormat);
            validateWithRegex(price, digitsRegex, constants.invalidPrice);
            validateValueLength(5, 150, description, descriptionMessage);
            validateValueLength(0, 3, files, constants.invalidNumberOfPictures);
            resolve('Success');
        } catch (error) {
            reject(error);
        }
    });
}

function validateEditOfferForm(offer) {

}

function validateComment(comment) {

}

module.exports = { validateRegistrationFormFields,
    validateUserImage, validateCreateNewOfferForm };

function validateValueLength(min, max, value, errorMessage) {
    if (min > value.length || value.length > max) {
        throw errorMessage;
    }
}

function validateWithRegex(value, regex, errorMessage) {
    const regexExp = new RegExp(regex);
    if (!regexExp.exec(value)) {
        throw errorMessage;
    }
}

function validateUniqueValue(value, data, errorMessage) {
    if (data !== null && value === data.username) {
        throw errorMessage;
    }
}

function validateOfferType(value, errorMessage) {
    if (value !== 'Море' && value !== 'Планина'
    && value !== 'СПА' && value !== 'Екскурзия') {
        throw errorMessage;
    }
}
