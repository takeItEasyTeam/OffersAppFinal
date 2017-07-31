/* eslint "no-unused-expressions": 0 */
const { getData } = require('../../../app/data/users-data');
const sinon = require('sinon');

const { expect } = require('chai');

describe('Users data getById()', () => {
    const db = {
        collection: () => { },
    };
    let users = [];

    let data = null;

    const validator = {};
    const findOne = (props) => {
        const id = props._id.toString();
        const item = users.find((i) => i.id === id);
        return Promise.resolve(item || null);
    };

    describe('When user with this td does not exist', () => {
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect getById function to return null ', (done) => {
            const { ObjectID } = require('mongodb');
            const id = new ObjectID().toHexString();
            data.getById(id)
                .then((user) => {
                    expect(user).to.be.null;
                    done();
                });
        });
    });
    describe('When there is an user with this td', () => {
        const { ObjectID } = require('mongodb');
        const firstId = new ObjectID().toHexString();
        const secondId = new ObjectID().toHexString();
        const firstUser = { 'id': firstId, 'username': 'Pesho' };
        const secondUser = { 'id': secondId, 'username': 'Gosho' };

        beforeEach(() => {
            users = [firstUser, secondUser];
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });

            data = getData(db, validator);
        });

        afterEach(() => {
            users = [];
            db.collection.restore();
        });

        it('expect getById function to return correct user', (done) => {
            data.getById(firstId)
                .then((user) => {
                    expect(user).to.deep.equal(firstUser);
                    done();
                });
        });
    });
});

describe('Users data create()', () => {
    const db = {
        collection: () => { },
    };
    let users = [];

    let data = null;

    const { ObjectID } = require('mongodb');
    const id = new ObjectID().toHexString();

    const insert = (props) => {
        const item = props;
        item.id = id;
        users.push(item);
        return Promise.resolve(users[users.length - 1]);
    };

    const validator = {
        validateRegistrationFormFields: (props, response) => { },
    };

    describe('When user\'s data is valid', () => {

        const user = { 'username': 'Pesho', 'password': '123456',
        'firstName': 'fn', 'lastName': 'ln', 'email': 'aaa',
        'phoneNumber': '12', 'country': 'bg', 'town': 'sf' };
        const userPassword = '12';
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });
            sinon.stub(validator, 'validateRegistrationFormFields')
            .callsFake(() => {
                return Promise.resolve('Success');
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            users = [];
            db.collection.restore();
        });

        it('expect create function to return the correct user ', (done) => {
            data.create(user.username, user.password, user.firstName,
            user.lastName, user.email, user.phoneNumber,
            user.country, user.town, userPassword, user.response)
                .then((newUser) => {
                    expect(newUser).to.deep.include(user);
                    done();
                });
        });
    });
});

describe('Users data uploadImage()', () => {
    const db = {
        collection: () => { },
    };

    let data = null;

    const { ObjectID } = require('mongodb');
    const id = new ObjectID().toHexString();
    const users = [{ 'id': id, 'username': 'Pesho', 'password': '123456',
        'firstName': 'fn', 'lastName': 'ln', 'email': 'aaa',
        'phoneNumber': '12', 'country': 'bg', 'town': 'sf' }];

     const updateOne = (props, set) => {
        const userId = props._id.toString();
        const index = users.findIndex((i) => i.id === userId);
        users[index].files = set.$set.files;

        return Promise.resolve(users[0]);
    };

    const validator = {
        validateUserImage: (props) => { },
    };

    describe('When user\'s data is valid', () => {
        const image = 'image';
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { updateOne };
            });
            sinon.stub(validator, 'validateUserImage').callsFake(() => {
                return Promise.resolve('Success');
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect updateImage function to return the updated user ',
        (done) => {
            data.updateImage(id, image)
                .then((user) => {
                    expect(user.files).to.deep.equal(image);
                    done();
                });
        });
    });
});

