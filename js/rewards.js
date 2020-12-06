const { By } = require('selenium-webdriver');
const { URLS, XPATHS } = require('../constants');
const { sleep } = require('./utils');

const { bingRewardsURL } = URLS;
const { rewardsShortPath } = XPATHS;

const getRewardsTotal = async (driver) => {
  try {
    console.log('Getting rewards total...');
    // Go to rewards page
    await driver.get(bingRewardsURL);
    // Get rewards total
    const rewardsTotal = await driver.findElement(By.xpath(rewardsShortPath)).getText();
    
    await sleep(3000);
    console.log('Done');
    
    return rewardsTotal;
  } catch(err) {
    throw new Error('Error getting rewards total', err);
  }
};

module.exports = { getRewardsTotal };