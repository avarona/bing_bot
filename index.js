require('dotenv').config();
const { Builder } = require('selenium-webdriver');
const { signIn, signOut } = require('./js/auth');
const { getKeyWords, searchLoop } = require('./js/search');

// Create browser instance
const driver = new Builder().forBrowser('chrome').build();

const { E, P } = process.env;

// Main script
const main = (async () => {
	try{
		// Sign in to user
		await signIn(driver, { E, P });
		
		// Fetch random words & start search loop
		const keywords = await getKeyWords(30);
		await searchLoop(driver, keywords);
		
		// Sign out of user
		await signOut(driver);
	} finally {
		// Quit Selenium browser
		await driver.quit();
	}
})();
