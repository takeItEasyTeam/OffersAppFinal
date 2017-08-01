/* eslint "no-unused-expressions": 0 */
/* eslint "no-undefined": 0 */

const { expect } = require('chai');

const validator = require('../../../../app/utils/data-validation');

const sinon = require('sinon');

describe('data-validation validateRegistrationFormFields function',
    () => {
    let user = null;

    const data = {
            username: 'Pesho',
    };

    describe('when values are correct', () => {
        beforeEach(() => {
            user = {
                'username': 'rere',
                'password': '1234',
                'firstName': 'rere',
                'lastName': 'rere',
                'email': 'rere@abv.bg',
                'phoneNumber': '88888',
                'country': 'bg',
                'town': 'sf',
            };
        });

        afterEach(() => {
            user = null;
        });

        it('expect to return Success message',
            (done) => {
            validator.validateRegistrationFormFields(user, data)
                .then((response) => {
                    expect(response).to.be.deep.equal('Success');
                    done();
                });
        });
    });

    describe('when user with the same username exist', () => {
        beforeEach(() => {
            user = {
                'username': 'Pesho',
                'password': '1234',
                'firstName': 'rere',
                'lastName': 'rere',
                'email': 'rere@abv.bg',
                'phoneNumber': '88888',
                'country': 'bg',
                'town': 'sf',
            };
        });

        afterEach(() => {
            user = null;
        });

        it('expect to return error message',
            (done) => {
            const message='Вече съществува потребител с това потребителско име';
            validator.validateRegistrationFormFields(user, data)
                .catch((error) => {
                    expect(error).to.be.deep.equal(message);
                    done();
                });
        });
    });
});
