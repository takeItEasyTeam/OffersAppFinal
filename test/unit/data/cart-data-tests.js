const { getData } = require('../../../app/data/cart-data');
const sinon = require('sinon');

const { expect } = require('chai');

describe('Cart data createOrder()', () => {
    const db = {
        collection: () => { },
    };
    let orders = [];

    let data = null;

    const validator = {};

    const { ObjectID } = require('mongodb');
    const id = new ObjectID().toHexString();

    const insert = (props) => {
        const item = props;
        item.id = id;
        orders.push(item);
        return Promise.resolve(orders[orders.length - 1]);
    };

    describe('When order\'s data is valid', () => {

        const order = { 'username': 'Pesho', 'password': '123456',
        'firstName': 'fn', 'lastName': 'ln', 'email': 'aaa',
        'phoneNumber': '12', 'country': 'bg', 'town': 'sf' };
        const userPassword = '12';
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            orders= [];
            db.collection.restore();
        });

        it('expect createOrder function to return the correct order ',
        (done) => {
            data.createOrder(order)
                .then((newOrder) => {
                    expect(newOrder).to.deep.equal(order);
                    done();
                });
        });
    });
});
