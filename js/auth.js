const { By, Key, until } = require('selenium-webdriver');
const { URLS, XPATHS } = require('../constants');
const { sleep } = require('./utils');

const { bingLoginURL, bingHomeURL } = URLS;
const { 
  emailInputPath,
  passwordInputPath,
  avatarAnchorPath,
  signOutAnchorPath
} = XPATHS;

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
    console.log('Error logging in: ', err);
  }
};

const signOut = async (driver) => {
  try {
    console.log('Logging out...');
    // Go to bing homepage
    await driver.get(bingHomeURL);
    // Select avatar CTA
    await driver.wait(until.elementLocated(By.xpath(avatarAnchorPath)));
    await driver.findElement(By.xpath(avatarAnchorPath)).click();
    // Select logout CTA
    await driver.wait(until.elementLocated(By.xpath(signOutAnchorPath)));
    await driver.findElement(By.xpath(signOutAnchorPath)).click();
    // Wait 3 second for logout
    await sleep(3000);
    console.log('Done');
  } catch(err) {
    console.log('Error logging out: ', err);
  }
};

module.exports = { signIn, signOut };