/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/offers-controller');

const sinon = require('sinon');

describe('Offers controller getOfferType function', () => {
    let controller = null;

    let offers = null;

    const data = {
            offers: {
                getByOfferType: () => { },
            },

    };

    let req = null;
    let res = null;

    beforeEach(() => {
        offers = [{ 'destination': 'Море', 'city': 'Варна',
            'validity': '07/25/2017 11:59 PM', 'price': '12',
            'description': 'Offer1', 'files': [],
            'author': '123', 'comments': [],
            },
            { 'destination': 'Планина', 'city': 'София',
            'validity': '07/25/2017 11:59 PM', 'price': '12',
            'description': 'Offer2', 'files': [], 'author': '456',
            'comments': [],
        }];
        sinon.stub(data.offers, 'getByOfferType')
            .callsFake(() => {
                return Promise.resolve(offers);
            });
        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
    });

    describe('when req.path is /sea', () => {
        beforeEach(() => {
            req.path = '/sea';
        });

        afterEach(() => {
            req.path = {};
            data.offers.getByOfferType.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.getByOfferType(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /mountain', () => {
        beforeEach(() => {
            req.path = '/mountain';
        });

        afterEach(() => {
            req.path = {};
            data.offers.getByOfferType.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.getByOfferType(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /spa', () => {
        beforeEach(() => {
            req.path = '/spa';
        });

        afterEach(() => {
            req.path = {};
            data.offers.getByOfferType.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.getByOfferType(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /excursion', () => {
        beforeEach(() => {
            req.path = '/excursion';
        });

        afterEach(() => {
            req.path = {};
            data.offers.getByOfferType.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.getByOfferType(req, res))
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
