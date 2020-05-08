# Bing Bot
This bot completes automatic searches on bing. You can set up a cron job to run this on a daily schedule.

### Coming soon:
- Microsoft Edge searches (once released for linux)
- Mobile browser searches

## Run it locally
### Install prerequisites:
  1. Install Homebrew
  ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  ```
  2. Install Node, Yarn & Docker
  ```bash
    brew install node yarn;
    brew cask install docker;
  ```

### Step 1:
Clone the repo
```bash
  git clone git@github.com:avarona/bing_bot.git
  cd bing_bot
```
Note: replace `{email}` & `{password}` below with your credentials
```bash
  echo "E={email}\nP={password}" > .env
```

### Step 2:
Setup docker container
```bash
  yarn docker:setup
```

### Step 3:
Run the script in docker
```bash
  yarn docker:start
``` 

## List of available scripts
### Docker
```bash
yarn docker:setup
yarn docker:start
yarn docker:prune
```

### Local
```bash
yarn install
yarn start
```