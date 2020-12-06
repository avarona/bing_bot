module.exports = {
  URLS: {
    randomWordAPI: 'http://random-word-api.herokuapp.com/',
    bingLoginURL: 'https://login.live.com/',
    bingHomeURL: 'https://www.bing.com/',
    bingAccountURL: 'https://account.microsoft.com/',
    bingRewardsURL: 'https://account.microsoft.com/rewards/'
  },
  XPATHS: {
    emailInputPath: '/html/body/div/form[1]/div/div/div[1]/div[2]/div[2]/div/div/div/div[2]/div[2]/div/input[1]',
    passwordInputPath: '/html/body/div/form[1]/div/div/div[1]/div[2]/div[2]/div/div[2]/div/div[3]/div[2]/div/div/div/div/input',
    rewardsShortPath: '//*[@id="userBanner"]/mee-banner/div/div/div/div[2]/div[1]/mee-banner-slot-2/mee-rewards-user-status-item/mee-rewards-user-status-balance/div/div/div/div/div/p[1]/mee-rewards-counter-animation/span',
  }
}
