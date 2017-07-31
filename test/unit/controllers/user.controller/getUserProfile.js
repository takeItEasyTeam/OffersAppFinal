/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/user-controller');

describe('Users controller getUserProfile function', () => {
    const data = null;
    let controller = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
    });
    describe('When there is user', () => {
        it('expect to return the user profile', (done) => {
            Promise.resolve(controller.getUserProfile(req, res))
                .then(() => {
                    expect(res.viewName).to.be.equal('profile-view');
                    done();
                });
        });
    });
});
