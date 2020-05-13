const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

const randomNumber = (min = 30, max = 40) => {
  const num = Math.floor(Math.random() * (max - min) + min);
  console.log('Random number: ', num)
  return num;
}
  
module.exports = { sleep, randomNumber };
