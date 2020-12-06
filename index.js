require('dotenv').config();
const fs = require('fs');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const { signIn, signOut } = require('./js/auth');
const { getKeywords, searchLoop } = require('./js/search');
const { randomNumber, sleep } = require('./js/utils');
const { getRewardsTotal } = require('./js/rewards');

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
		const rewardsBefore = await getRewardsTotal();

		// Fetch random words & start search loop
		const count = await randomNumber(min, max);
		const keywords = await getKeywords(count);
		await searchLoop(driver, keywords);

		// Show rewards earned
		const rewardsAfter = await getRewardsTotal();
		console.log(`${rewardsBefore} -> ${rewardsAfter} earned!`);
		
		// Sign out of user
		await signOut(driver);
	} catch(err) {
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
		await driver.takeScreenshot().then(
			function(image, err) {
				fs.writeFile('err.png', image, 'base64', function(err) {
					throw new Error('Error in environment script: ', err);
				});
			}
		);
	}
})();
