/* eslint "no-unused-expressions": 0 */
/* eslint "no-undefined": 0 */

const { expect } = require('chai');

const validator = require('../../../../app/utils/data-validation');

const sinon = require('sinon');

describe('data-validation validateComment function',
    () => {
    let comment = null;

    describe('when comment values are correct', () => {
        beforeEach(() => {
            comment = {
                'text': 'comment 1',
                'date': '2017-08-01T04:04:14.161Z',
                'user': '5979b383222a9f26d87a259d',
                'userName': 'username',
                'rate': 5,
            };
        });

        afterEach(() => {
            comment = null;
        });

        it('expect to return Success message',
            (done) => {
            validator.validateComment(comment)
                .then((response) => {
                    expect(response).to.be.deep.equal('Success');
                    done();
                });
        });
    });

    describe('when rate is invalid ', () => {
        beforeEach(() => {
            comment = {
                'text': 'comment',
                'date': '2017-08-01T04:04:14.161Z',
                'user': '5979b383222a9f26d87a259d',
                'userName': 'username',
                'rate': NaN,
            };
        });

        afterEach(() => {
            comment = null;
        });

        it('expect to return error message',
            (done) => {
            const mes='Стойността на полето Рейтинг трявбва да е между 1 и 5';
            validator.validateComment(comment)
                .catch((error) => {
                    expect(error).to.be.deep.equal(mes);
                    done();
                });
        });
    });
});
