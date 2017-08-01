/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/user-controller');

const sinon = require('sinon');

describe('Users controller getMyOrders function', () => {
    let controller = null;
    const currentUserId = '123';
    const orders = [{ '_id': '123', cart: [] }, { '_id': '321', cart: [] }];

    const data = {
            users: {
                getMyOrders: () => { },
            },

    };
    let req = null;
    let res = null;

    beforeEach(() => {
        sinon.stub(data.users, 'getMyOrders')
            .callsFake(() => {
                return Promise.resolve(orders);
            });

        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
        req.user = {};
        req.user._id = currentUserId;
    });

    afterEach(() => {
        data.users.getMyOrders.restore();
    });
    describe('when there are orders', () => {
        it('expect to return the correct result', (done) => {
            Promise.resolve(controller.getMyOrders(req, res))
                .then(() => {
                    expect(res.model).to.be.deep.equal({
                        context: orders,
                    });
                    expect(res.viewName).to.be.equal('myOrders-view');
                    done();
                });
        });
    });
});
