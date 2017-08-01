/* eslint "no-unused-expressions": 0 */
/* eslint "no-undefined": 0 */

const { expect } = require('chai');

const validator = require('../../../../app/utils/data-validation');

const sinon = require('sinon');

describe('data-validation validateCreateNewOfferForm function',
    () => {
    let offer = null;

    describe('when values are correct', () => {
        beforeEach(() => {
            offer = {
                'destination': 'Екскурзия',
                'city': 'София',
                'validity': '07/27/2017 11:59 PM',
                'price': 12,
                'description': 'Description',
                'files': [],
                'author': '5979b58a222a9f26d87a25a2',
                'comments': [],
            };
        });

        afterEach(() => {
            offer = null;
        });

        it('expect to return Success message',
            (done) => {
            validator.validateCreateNewOfferForm(offer)
                .then((response) => {
                    expect(response).to.be.deep.equal('Success');
                    done();
                });
        });
    });

    describe('when price value is invalid', () => {
        beforeEach(() => {
            offer = {
                'destination': 'Екскурзия',
                'city': 'София',
                'validity': '07/27/2017 11:59 PM',
                'price': '12А',
                'description': 'description',
                'files': [],
                'author': '5979b58a222a9f26d87a25a2',
                'comments': [],
            };
        });

        afterEach(() => {
            offer = null;
        });

        it('expect to return error message',
            (done) => {
            const message='Полето Цена може да съдърша само цифри';
            validator.validateCreateNewOfferForm(offer)
                .catch((error) => {
                    expect(error).to.be.deep.equal(message);
                    done();
                });
        });
    });

    describe('when destination value is invalid', () => {
        beforeEach(() => {
            offer = {
                'destination': '',
                'city': 'София',
                'validity': '07/27/2017 11:59 PM',
                'price': '12',
                'description': 'description',
                'files': [],
                'author': '5979b58a222a9f26d87a25a2',
                'comments': [],
            };
        });

        afterEach(() => {
            offer = null;
        });

        it('expect to return error message',
            (done) => {
            const message='Невалидна дестинация';
            validator.validateCreateNewOfferForm(offer)
                .catch((error) => {
                    expect(error).to.be.deep.equal(message);
                    done();
                });
        });
    });
});
