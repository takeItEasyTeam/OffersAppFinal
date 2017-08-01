/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/offers-controller');

const sinon = require('sinon');

describe('Offers controller delete function', () => {

    let controller = null;
    const offer= { '_id': '123456', 'destination': 'Море', 'city': 'Варна',
        'validity': '07/25/2017 11:59 PM', 'price': '12',
        'description': 'Offer1', 'files': [], 'author': '123', 'comments': [],
         };

    const data = {
            offers: {
                delete: () => { },
            },

    };
    let req = null;
    let res = null;

    beforeEach(() => {
         controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
        sinon.stub(data.offers, 'delete')
            .callsFake(() => {
                return Promise.resolve(res.send('Success'));
            });
            req.body = offer;
            req.user = {};
            req.user._id = '789456';
            req.params = {};
            req.params.id = offer._id;
    });

    afterEach(() => {
        req.body = {};
        req.params = {};
        req.user = {};
        data.offers.delete.restore();
    });
    describe('when there are offers in db', () => {
        it('expect to res.send success message', (done) => {
            Promise.resolve(controller.delete(req, res))
                .then(() => {
                    expect(res.body).to.be.equal('Success');
                    done();
                });
        });
    });
});
