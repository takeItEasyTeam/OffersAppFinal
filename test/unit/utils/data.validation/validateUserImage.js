/* eslint "no-unused-expressions": 0 */
/* eslint "no-undefined": 0 */

const { expect } = require('chai');

const validator = require('../../../../app/utils/data-validation');

const sinon = require('sinon');

describe('data-validation validateUserImage function',
    () => {
    let image = null;

    describe('when values are correct', () => {
        beforeEach(() => {
            image = [{ 'fieldname': 'image' }];
        });

        afterEach(() => {
            image = null;
        });

        it('expect to return Success message',
            (done) => {
            validator.validateUserImage(image)
                .then((response) => {
                    expect(response).to.be.deep.equal('Success');
                    done();
                });
        });
    });

    describe('when images are more then one ', () => {
        beforeEach(() => {
            image = [{ 'fieldname': 'image' }, { 'fieldname': 'image' }];
        });

        afterEach(() => {
            image = null;
        });

        it('expect to return error message',
            (done) => {
            const message='Трябва да изберете 1 снимка';
            validator.validateUserImage(image)
                .catch((error) => {
                    expect(error).to.be.deep.equal(message);
                    done();
                });
        });
    });
});
