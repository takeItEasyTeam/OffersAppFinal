/* eslint "no-unused-expressions": 0 */
/* eslint "no-undefined": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/offers-controller');

const sinon = require('sinon');

describe('Offers controller getOffersDetails function', () => {

    let controller = null;

    let offer = null;

    const data = {
            offers: {
                getById: () => { },
            },

    };

    let req = null;
    let res = null;

    beforeEach(() => {
        offer = { 'destination': 'Море', 'city': 'Варна',
            'validity': '07/25/2017 11:59 PM', 'price': '12',
            'description': 'Offer1', 'files': [],
            'author': '123', 'comments': [],
            };
        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
    });

    describe('when an offer exist', () => {
        beforeEach(() => {
            sinon.stub(data.offers, 'getById')
                .callsFake(() => {
                    return Promise.resolve(offer);
                });
            req.params = {};
            req.params.id = '123';
        });

        afterEach(() => {
            req.params = {};
            data.offers.getById.restore();
        });

        it('expect to return the correct data',
            (done) => {
            controller.getOfferDetails(req, res)
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offer,
                    });
                    expect(res.viewName).to.be.equal('offerDetails-view');
                    done();
                });
        });
    });

    describe('when an offer does not exist', () => {
        beforeEach(() => {
            sinon.stub(data.offers, 'getById')
                .callsFake(() => {
                    return Promise.resolve(undefined);
            });
            req.params = {};
            req.params.id = '123';
        });

        afterEach(() => {
            req.params = {};
            data.offers.getById.restore();
        });

        it('expect to return status 404 and redirect to /offer/all',
            (done) => {
            controller.getOfferDetails(req, res)
                .then(() => {
                    expect(res.status).to.be.equal(404);
                    expect(res.redirectUrl).to.be.equal('/offer/all');
                    done();
                });
        });
    });

    describe('when data.offers.getById return an error', () => {
        beforeEach(() => {
            sinon.stub(data.offers, 'getById')
                .callsFake(() => {
                    return Promise.reject('error');
            });
            req.params = {};
            req.params.id = '123';
        });

        afterEach(() => {
            req.params = {};
            data.offers.getById.restore();
        });

        it('expect to return status 404 and redirect to /offer/all',
            (done) => {
            controller.getOfferDetails(req, res)
                .then(() => {
                    expect(res.status).to.be.equal(404);
                    expect(res.redirectUrl).to.be.equal('/offer/all');
                    done();
                });
        });
    });
});
