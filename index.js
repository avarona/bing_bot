require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const { signIn, signOut } = require('./js/auth');
const { getKeywords, searchLoop } = require('./js/search');
const { randomNumber, sleep } = require('./js/utils');

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
const main = async (driver, min, max, isBrowser) => {
	try {
		// Sign in to user
		await signIn(driver, { E, P });
		// Fetch random words & start search loop
		const count = await randomNumber(min, max);
		const keywords = await getKeywords(count);
		await searchLoop(driver, keywords);
		// Rewards print
		let rewardsCount;
		if(isBrowser) {
			await driver.wait(until.elementLocated(By.id('id_rc')));
			rewardsCount = await driver.findElement(By.id('id_rc')).getText();
		} else {
			await driver.findElement(By.id('mHamburger')).click();
			await driver.wait(until.elementLocated(By.id('fly_id_rc')));
			rewardsCount = await driver.findElement(By.id('fly_id_rc')).getText();
		}
		console.log(`${rewardsCount} earned!`);
		// Sign out of user
		await signOut(driver);
	} catch(err) {
		console.log('Main script error', err);
	} finally {
		// Quit Selenium browser
		await driver.quit();
	}
};

(async () => {
	try {
		console.log('========== Starting mobile ==========');
		await main(mobile, 20, 35, false);
		console.log('Mobile done.');

		await sleep(5000);

		console.log('========== Starting browser ==========');
		await main(browser, 30, 45, true);
		console.log('Browser done');
	
	} catch(err) {
		console.log('Error in Browser: ', err);
	} finally {
		console.log('All searches completed');
	}
})();
