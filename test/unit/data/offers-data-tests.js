/* eslint "no-unused-expressions": 0 */
const { getData } = require('../../../app/data/offers-data');
const sinon = require('sinon');

const { expect } = require('chai');

describe('Offers data getAll()', () => {
    const db = {
        collection: () => { },
    };
    const offers = [{ '_id': '1', 'description': 'offer1' },
            { '_id': '2', 'description': 'offer2' }];

    let data = null;

    const validator = {};

    const toArray = () => {
        return Promise.resolve(offers);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    describe('When there are offers in db', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect getAll function to return an array with the correct result',
            (done) => {
            data.getAll()
                .then((res) => {
                    const expectedValue = offers.map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                    expect(res).to.deep.equal(expectedValue);
                    done();
                });
        });
    });
});

describe('Offers data getById()', () => {
    const db = {
        collection: () => { },
    };
    let offers = [];

    let data = null;
    const validator = {};

    const findOne = (props) => {
        const id = props._id.toString();
        const item = offers.find((i) => i.id === id);
        return Promise.resolve(item || null);
    };

    describe('When there is not an offers with this id', () => {
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
                .then((offer) => {
                    expect(offer).to.be.null;
                    done();
                });
        });
    });
    describe('When there is an offer with this id', () => {
        const { ObjectID } = require('mongodb');
        const firstId = new ObjectID().toHexString();
        const secondId = new ObjectID().toHexString();
        const firstOffer = { 'id': firstId, 'description': 'Offer1' };
        const secondOffer = { 'id': secondId, 'description': 'Offer2' };

        beforeEach(() => {
            offers = [firstOffer, secondOffer];
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });

            data = getData(db, validator);
        });

        afterEach(() => {
            db.collection.restore();
            offers = [];
        });

        it('expect getById function to return correct offer', (done) => {
            data.getById(firstId)
                .then((offer) => {
                    expect(offer).to.deep.equal(firstOffer);
                    done();
                });
        });
    });
});

describe('Offers data getByOfferType()', () => {
    const db = {
        collection: () => { },
    };

    const offers = [{ '_id': '1', 'destination': 'Море' },
    { '_id': '2', 'destination': 'Планина' },
    { '_id': '3', 'destination': 'Море' }];

    let data = null;

    const validator = {};

    const find = (props) => {
        const items = offers.filter((i) => i.destination === props.destination);
        return {
            toArray: () => {
                return Promise.resolve(items);
            },
        };
    };

    describe('When there are offers with different destinations', () => {
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect getByOfferType function to return the correct result ',
        (done) => {
            data.getByOfferType('Море')
                .then((res) => {
                    const value = offers.filter((i) => i.destination === 'Море')
                    .map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                    expect(res).to.deep.equal(value);
                    done();
                });
        });
    });
});

describe('Offers data getMyOffers()', () => {
    const db = {
        collection: () => { },
    };
    const offers = [{ '_id': '1', 'destination': 'Море', 'author': '456' },
    { '_id': '2', 'destination': 'Планина', 'author': '123' },
    { '_id': '3', 'destination': 'Море', 'author': '456' }];

    let data = null;

    const validator = {};

    const find = (props) => {
        const items = offers.filter((i) => i.author === props.author);
        return {
            toArray: () => {
                return Promise.resolve(items);
            },
        };
    };

    describe('When there are offers created by different users', () => {
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect getByOfferType function to return the correct result ',
        (done) => {
            const userId = '123';
            data.getMyOffers(userId)
                .then((res) => {
                    const value = offers.filter((i) => i.author === userId)
                    .map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                    expect(res).to.deep.equal(value);
                    done();
                });
        });
    });
});

describe('Offers data create()', () => {
    const db = {
        collection: () => { },
    };
    let offers = [];

    let data = null;

    const { ObjectID } = require('mongodb');
    const id = new ObjectID().toHexString();

    const insert = (props) => {
        const item = props;
        item.id = id;
        offers.push(item);
        return Promise.resolve(offers[offers.length - 1]);
    };

    const validator = {
        validateCreateNewOfferForm: (offer) => { },
    };

    describe('When offer\'s data is valid', () => {
        const offer = { 'destination': 'Море', 'city': 'София',
        'validity': '07/25/2017 11:59 PM', 'price': '12',
        'description': 'Offer1', 'files': [], 'author': '123', 'comments': [] };
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });
            sinon.stub(validator, 'validateCreateNewOfferForm')
            .callsFake(() => {
                return Promise.resolve('Success');
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            offers = [];
            db.collection.restore();
        });

        it('expect create function to return the correct user ', (done) => {
            data.create(offer)
                .then((newOffer) => {
                    expect(newOffer).to.deep.include(offer);
                    done();
                });
        });
    });
});

describe('Offers data edit()', () => {
    const db = {
        collection: () => { },
    };

    let data = null;

    const { ObjectID } = require('mongodb');
    const id = new ObjectID().toHexString();
    const offers =[{ '_id': id, 'destination': 'Море', 'city': 'София',
        'validity': '07/25/2017 11:59 PM', 'price': '12',
        'description': 'Offer1', 'files': [],
        'author': '123', 'comments': [] }];

     const updateOne = (props, set) => {
        const offerId = props._id.toString();
        const index = offers.findIndex((i) => i._id === offerId);
        offers[index].files = set.$set.files;

        return Promise.resolve(offers[0]);
    };

    const validator = {
        validateUserImage: (props) => { },
    };

    describe('When offer\'s data is valid', () => {
        const updates = { 'files': { 'fiendname': 'image' } };
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

        it('expect edit function to return the updated offer ',
        (done) => {
            data.edit(updates, id)
                .then((offer) => {
                    expect(offer).to.deep.include(updates);
                    done();
                });
        });
    });
});

describe('Offers data getOffersByFilter()', () => {
    const db = {
        collection: () => { },
    };

    const offers = [{ '_id': '1', 'destination': 'Море', 'city': 'Варна' },
    { '_id': '2', 'destination': 'Планина', 'city': 'София' },
    { '_id': '3', 'destination': 'Море', 'city': 'Созопол' }];

    let data = null;

    const validator = {};

    const find = (props) => {
        const items = offers.filter((i) => i.city === props);
        return {
            toArray: () => {
                return Promise.resolve(items);
            },
        };
    };

    describe('When there are offers in db', () => {
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect getOffersByFilter() function to return the correct result ',
        (done) => {
            data.getOffersByFilter( 'София' )
                .then((res) => {
                    const value = offers.filter((i) => i.city === 'София')
                    .map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                    expect(res).to.deep.equal(value);
                    done();
                });
        });
    });
});

describe('Offers data rate()', () => {
    const db = {
        collection: () => { },
    };

    let data = null;

    const { ObjectID } = require('mongodb');
    const id = new ObjectID().toHexString();
    const offers =[{ '_id': id, 'destination': 'Море', 'city': 'София',
        'validity': '07/25/2017 11:59 PM', 'price': '12',
        'description': 'Offer1', 'files': [],
        'author': '123', 'comments': [] }];

     const updateOne = (props, query) => {
        const offerId = props._id.toString();
        const index = offers.findIndex((i) => i._id.toString() === offerId);
       offers[index].comments.push(query.$push.comments);

        return Promise.resolve(offers[index]);
    };

    const validator = {
        validateComment: (props) => { },
    };

    describe('When comment\'s data is valid', () => {
        const comment = {
            'text': 'comment',
            'date': '2017-08-01T04:04:14.161Z',
            'user': '5979b383222a9f26d87a259d',
            'userName': 'username',
            'rate': NaN,
        };
        beforeEach(() => {
           sinon.stub(db, 'collection').callsFake(() => {
                return { updateOne };
            });
            sinon.stub(validator, 'validateComment').callsFake(() => {
                return Promise.resolve('Success');
            });
            data = getData(db, validator);
        });

        afterEach(() => {
            validator.validateComment.restore();
            db.collection.restore();
        });

        it('expect rate function to return the updated offer ',
        (done) => {
            data.rate(comment, id)
                .then((offer) => {
                    expect(offer.comments).to.deep.include(comment);
                    done();
                });
        });
    });
});

