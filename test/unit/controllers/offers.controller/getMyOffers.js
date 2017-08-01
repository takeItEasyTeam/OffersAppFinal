/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/offers-controller');

const sinon = require('sinon');

describe('Offers controller getMyOffers function', () => {

    let controller = null;

    const currentUserId = '123';

    const offers = [{ 'destination': 'Море', 'city': 'Варна',
        'validity': '07/25/2017 11:59 PM', 'price': '12',
        'description': 'Offer1', 'files': [], 'author': '123', 'comments': [],
         },
        { 'destination': 'Планина', 'city': 'София',
        'validity': '07/25/2017 11:59 PM', 'price': '12',
        'description': 'Offer2', 'files': [], 'author': '456',
        'comments': [],
        }];

    const data = {
            offers: {
                getMyOffers: () => { },
            },

    };
    let req = null;
    let res = null;

    beforeEach(() => {
        sinon.stub(data.offers, 'getMyOffers')
            .callsFake(() => {
                return Promise.resolve(offers);
            });

        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
        req.user = {};
        req.user._id = currentUserId;
    });

    afterEach(() => {
        data.offers.getMyOffers.restore();
    });
    describe('when there are offers', () => {
        it('expect to return the correct result', (done) => {
            Promise.resolve(controller.getMyOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('myOffers-view');
                    done();
                });
        });
    });
});