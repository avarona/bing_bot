const { By, Key, until } = require('selenium-webdriver');
const fetch = require('node-fetch');
const { sleep } = require('./utils');
const { URLS } = require('../constants');

const { randomWordAPI, bingHomeURL } = URLS;

const getKeywords = async (number) => {
  try {
    const res = await fetch(`${randomWordAPI}/word?number=${number}`);
    const parsed = await res.json();
    console.log('Word list: ', parsed);
    return parsed;
  } catch(err) {
    throw new Error('Error while fetching random words: ', err);
  }
};

const searchLoop = async (driver, arr) => {
  try {
    console.log('Starting search loop...')
    let total = 0;
    // Load the page
    await driver.get(bingHomeURL);
    await driver.wait(until.elementLocated(By.name('q')));
    
    for(let i = 0; i < arr.length; i++) {
      // Clear input box
      await driver.findElement(By.name('q')).clear();
      // Find the search box
      await driver.findElement(By.name('q')).click();
      // Enter word and click enter
      await driver.findElement(By.name('q')).sendKeys(arr[i], Key.RETURN);
      // Wait for the results box by id
      await driver.wait(until.elementLocated(By.id('b_content')));

      console.log(`Searched ${arr[i]}`)
      // Wait 3 seconds between searches
      await sleep(3000);
      total += 1;
    }
    console.log(`Finished searching ${total} words`);
  } catch(err) {
    throw new Error('Error while searching: ', err);
  }
};

module.exports = { getKeywords, searchLoop };
