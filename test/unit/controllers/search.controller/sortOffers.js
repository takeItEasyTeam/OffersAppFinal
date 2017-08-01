/* eslint "no-unused-expressions": 0 */
/* eslint "no-undefined": 0 */
const { expect } = require('chai');

const init = require('../../../../app/controllers/search-controller');

const sinon = require('sinon');

describe('Search controller sortOffers function', () => {
    let controller = null;

    let offers = null;

    const data = {
            offers: {
                sortOffers: () => { },
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
        sinon.stub(data.offers, 'sortOffers')
            .callsFake(() => {
                return Promise.resolve(offers);
            });
        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
    });

    describe('when path is /sea', () => {
        beforeEach(() => {
            req.body = {};
            req.body.sorting = 'date';
            req.body.order = 'ASC';
            req.body.path = '/sea';
        });

        afterEach(() => {
            req.body = {};
            data.offers.sortOffers.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.sortOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('partialOffers-view');
                    done();
                });
        });
    });

    describe('when path is /mountain', () => {
        beforeEach(() => {
            req.body = {};
            req.body.sorting = 'date';
            req.body.order = 'ASC';
            req.body.path = '/mountain';
        });

        afterEach(() => {
            req.body = {};
            data.offers.sortOffers.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.sortOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('partialOffers-view');
                    done();
                });
        });
    });

    describe('when path is /spa', () => {
        beforeEach(() => {
            req.body = {};
            req.body.sorting = 'date';
            req.body.order = 'ASC';
            req.body.path = '/spa';
        });

        afterEach(() => {
            req.body = {};
            data.offers.sortOffers.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.sortOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('partialOffers-view');
                    done();
                });
        });
    });

    describe('when path is /excursion', () => {
        beforeEach(() => {
            req.body = {};
            req.body.sorting = 'date';
            req.body.order = 'ASC';
            req.body.path = '/excursion';
        });

        afterEach(() => {
            req.body = {};
            data.offers.sortOffers.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.sortOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('partialOffers-view');
                    done();
                });
        });
    });

    describe('when path is /', () => {
        beforeEach(() => {
            req.body = {};
            req.body.sorting = 'date';
            req.body.order = 'ASC';
            req.body.path = '/';
        });

        afterEach(() => {
            req.body = {};
            data.offers.sortOffers.restore();
        });

        it('expect to return the correct data',
            (done) => {
            Promise.resolve(controller.sortOffers(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: offers,
                    });
                    expect(res.viewName).to.be.equal('partialOffers-view');
                    done();
                });
        });
    });
});
