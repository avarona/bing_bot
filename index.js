const { Builder } = require('selenium-webdriver');
const { getKeyWords, searchLoop } = require('./js/search');

// Create browser instance
const driver = new Builder().forBrowser('chrome').build();

// Main script
const main = (async () => {
	const keywords = await getKeyWords(30);
	await searchLoop(driver, keywords);
})();
