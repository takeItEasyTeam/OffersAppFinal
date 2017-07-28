/* eslint "no-unused-expressions": 0 */
const { getData } = require('../../app/data/offers-data');
const sinon = require('sinon');

const { expect } = require('chai');

describe('Users\' data getById()', () => {


    describe('When id is invalid', () => {
        beforeEach(() => {

        });

        afterEach(() => {

        });
        const db = {
            collection: () => { },
        };
        it('expect to return null', (done) => {
            const result = getData(db).getOfferCount('1');
            expect(result).to.equal(42);
            done();
        });
    });
});
