const { By, Key, until } = require('selenium-webdriver');
const fetch = require('node-fetch');
const { sleep } = require('./utils');
const { URLS } = require('../constants');

const { randomWordAPI, bingHomeURL } = URLS;

const getKeywords = async (number) => {
  const res = await fetch(`${randomWordAPI}/word?number=${number}`);
  const parsed = await res.json();
  console.log('Word list: ', parsed);
  return parsed;
};

const searchLoop = async (driver, arr) => {
  console.log('Starting search loop...')
  // Load the page
  await driver.get(bingHomeURL);
  await driver.wait(until.elementLocated(By.name('q')))
  
  for(let i = 0; i < arr.length; i++) {
    // Clear input box
    await driver.findElement(By.name('q')).clear();
    // Find the search box
    await driver.findElement(By.name('q')).click();
    // Enter word and click enter
    await driver.findElement(By.name('q')).sendKeys(arr[i], Key.RETURN);
    // Wait for the results box by id
    await driver.wait(until.elementLocated(By.id('b_content')), 10000)

    // Log searched word and rewards points
    const rewardsCount = await driver.findElement(By.id('id_rc')).getText();
    console.log(`searched: ${arr[i]} @${rewardsCount} points`);

    // Wait 5 seconds between searches
    await sleep(3000);
  }
  console.log('Finished search')
};

module.exports = { getKeywords, searchLoop };
