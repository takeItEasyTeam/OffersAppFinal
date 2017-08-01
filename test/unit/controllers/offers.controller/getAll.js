/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/offers-controller');

const sinon = require('sinon');

describe('Offers controller getAll function', () => {

    let controller = null;
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
                getAll: () => { },
            },

    };
    let req = null;
    let res = null;

    beforeEach(() => {
        sinon.stub(data.offers, 'getAll')
            .callsFake(() => {
                return Promise.resolve(offers);
            });

        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
    });

    afterEach(() => {
        data.offers.getAll.restore();
    });
    describe('when there are offers in db', () => {
        it('expect to render the correct view with offers', (done) => {
            Promise.resolve(controller.getAll(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });
});
