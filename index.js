require('dotenv').config();
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const { signIn, signOut } = require('./js/auth');
const { getKeywords, searchLoop } = require('./js/search');

const firefoxOptions = new firefox.Options().headless();
const chromeOptions = new chromeOptions.Options().headless();

// Create browser instance
const driver = new Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build();

const { E, P } = process.env;

// Main script
const main = (async () => {
	try{
		// Sign in to user
		await signIn(driver, { E, P });
		
		// Fetch random words & start search loop
		const keywords = await getKeywords(30);
		await searchLoop(driver, keywords);
		
		// Sign out of user
		await signOut(driver);
	} finally {
		// Quit Selenium browser
		await driver.quit();
	}
})();
