/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const { setupDriver } = require('./utils/setup-driver.js');

describe('Home route', () => {
        let driver;

        beforeEach(() => {
            driver = setupDriver('chrome');
        });

        it('locahost:3001 title', () => {
            return driver.get('http://localhost:3001')
                .then(() => {
                    return driver.getTitle();
                })
                .then((title) => {
                    console.log(title);
                    expect(title).to.be.equal(title);
                });
        });
});

