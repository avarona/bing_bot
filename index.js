require('dotenv').config();
const fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const { signIn, signOut } = require('./js/auth');
const { getKeywords, searchLoop } = require('./js/search');
const { randomNumber, sleep } = require('./js/utils');

const { URLS: { bingAccountURL }, XPATHS: { rewardsShortPath } } = require('./constants');

const firefoxOptions = new firefox.Options().headless();
const chromeOptions = new chrome.Options()
	.addArguments('--no-sandbox')
	.headless()
	.setMobileEmulation({ deviceName: 'iPhone X' });

// Create browser instance
const browser = new Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build();
const mobile = chrome.Driver.createSession(chromeOptions);

const { E, P } = process.env;

// Main script
const main = async (driver, min, max) => {
	try {
		// Sign in to user
		await signIn(driver, { E, P });
		
		// Calculate rewards before search
		const rewardsBefore = await driver.findElement(By.xpath(rewardsShortPath)).getText();

		// Fetch random words & start search loop
		const count = await randomNumber(min, max);
		const keywords = await getKeywords(count);
		await searchLoop(driver, keywords);

		// Show rewards earned
		await driver.get(bingAccountURL);
		const rewardsAfter = await driver.findElement(By.xpath(rewardsShortPath)).getText();
		console.log(`${rewardsBefore} -> ${rewardsAfter} earned!`);
		
		// Sign out of user
		await signOut(driver);
	} catch(err) {
		const screenshot = await driver.saveScreenshot(); // returns base64 string buffer
		await fs.writeFileSync('/tmp/screenshots/error.png', screenshot);
		throw new Error('Main script error: ', err);
	} finally {
		// Quit Selenium browser
		await driver.quit();
	}
};

(async () => {
	try {
		console.log('========== Starting mobile ==========');
		await main(mobile, 20, 35);
		console.log('Mobile done.');

		await sleep(5000);

		console.log('========== Starting browser ==========');
		await main(browser, 30, 45);
		console.log('Browser done');
	
		console.log('All searches completed');
	} catch(err) {
		throw new Error('Error in environment script: ', err, err.name, err.message);
	}
})();
