const webdriver = require('selenium-webdriver');
require('chromedriver');

const setupDriver = (browser) => {
const driver = new webdriver.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities({
    browserName: browser,
    })
    .build();

    return driver;
};

module.exports = { setupDriver };
