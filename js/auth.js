const { By, Key, until } = require('selenium-webdriver');
const { URLS, XPATHS } = require('../constants');
const { sleep } = require('./utils');

const { bingLoginURL, bingAccountURL } = URLS;
const { emailInputPath, passwordInputPath } = XPATHS;

const signIn = async (driver, { E, P }) => {
  try {
    console.log('Logging in...');
    // Go to login page
    await driver.get(bingLoginURL);
    // Enter user email & submit
    await driver.wait(until.elementLocated(By.xpath(emailInputPath)));
    await driver.findElement(By.xpath(emailInputPath)).sendKeys(E, Key.RETURN);
    // Enter password & submit
    await driver.wait(until.elementLocated(By.xpath(passwordInputPath)));
    await driver.findElement(By.id('i0118')).sendKeys(P, Key.RETURN);
    // Wait for sign in to complete
    await sleep(3000);
    console.log('Done');
  } catch(err) {
    throw new Error('Error logging in: ', err);
  }
};

const signOut = async (driver) => {
  try {
    console.log('Logging out...');
    // Go to bing homepage
    await driver.get(bingAccountURL);
    // Select avatar CTA
    await driver.wait(until.elementLocated(By.id('mectrl_main_trigger')));
    await driver.findElement(By.id('mectrl_main_trigger')).click();
    // Select logout CTA
    await driver.wait(until.elementLocated(By.id('mectrl_body_signOut')));
    await driver.findElement(By.id('mectrl_body_signOut')).click();
    // Wait 3 second for logout
    await sleep(3000);
    console.log('Done');
  } catch(err) {
    throw new Error('Error logging out: ', err);
  }
};

module.exports = { signIn, signOut };