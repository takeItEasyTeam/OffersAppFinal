/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/user-controller');

describe('Users controller logout function', () => {
    const data = null;
    let controller = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
        req.flash = () => {
            return Promise.resolve('flash');
        };
        req.logout = () => {
            return Promise.resolve('logout');
        };
    });
    describe('When is called', () => {
        it('expect to redirect to /', (done) => {
            Promise.resolve(controller.logout(req, res))
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/');
                    done();
                });
        });
    });
});
