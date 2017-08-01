/* eslint "no-unused-expressions": 0 */
/* eslint "no-undefined": 0 */
const { expect } = require('chai');

const init = require('../../../../app/controllers/search-controller');

const sinon = require('sinon');

describe('Search controller findOffers function', () => {

    let controller = null;

    let offers = null;

    const data = {
            offers: {
                getOffersByFilter: () => { },
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
        sinon.stub(data.offers, 'getOffersByFilter')
            .callsFake(() => {
                return Promise.resolve(offers);
            });
        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
    });

    describe('when req.path is /sea', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/sea';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /sea/search', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/sea/search';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
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
            req.route = {};
            req.route.path = '/mountain';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /mountain/search', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/mountain/search';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
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
            req.route = {};
            req.route.path = '/spa';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /spa/search', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/spa/search';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
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
            req.route = {};
            req.route.path = '/excursion';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /excursion/search', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/excursion/search';
            req.query = {};
            req.query.city = 'София';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /profile/myOffers', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/profile/myOffers';
            req.query = {};
            req.query.city = 'София';
            req.user = {};
            req.user._id = '123';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            req.user = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path is /profile/myOffers/search', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/profile/myOffers/search';
            req.query = {};
            req.query.city = 'София';
            req.user = {};
            req.user._id = '123';
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            req.user = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('allOffers-view');
                    done();
                });
        });
    });

    describe('when req.path.city and req.user._id are unedfined', () => {
        beforeEach(() => {
            req.route = {};
            req.route.path = '/profile/myOffers/search';
            req.query = {};
            req.query.city = undefined;
            req.user = {};
            req.user._id = undefined;
        });

        afterEach(() => {
            req.route = {};
            req.query = {};
            req.user = {};
            data.offers.getOffersByFilter.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.findOffers(req, res))
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
