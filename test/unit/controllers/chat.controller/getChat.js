/* eslint "no-unused-expressions": 0 */

const { expect } = require('chai');

const init = require('../../../../app/controllers/chat-controller');

describe('Chat controller getChat function', () => {
    const data = null;
    let controller = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = init(data);
        req = require('../mocks/res-req').getRequestMock();
        res = require('../mocks/res-req').getResponseMock();
    });
    describe('When is called', () => {
        it('expect to return chat view', (done) => {
            Promise.resolve(controller.getChat(req, res))
                .then(() => {
                    expect(res.viewName).to.be.equal('chat-view');
                    done();
                });
        });
    });
});
