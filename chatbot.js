const readline = require('readline');
const currencyCodes = require('currency-codes');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayAllCurrencies() {
  currencyCodes.data.forEach((currency) => {
    console.log(`${currency.code} - ${currency.currency}`);
  });
}

async function getExchangeRate(baseCurrency, targetCurrency) {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const rates = response.data.rates;
      const exchangeRate = rates[targetCurrency];
  
      if (exchangeRate) {
        console.log(`Exchange Rate (${baseCurrency} to ${targetCurrency}): ${exchangeRate}`);
      } else {
        console.log(`Exchange rate not available for ${baseCurrency} to ${targetCurrency}`);
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error.message);
    }
  }

function chat() {
    rl.question('Enter a command (currencies/exchange): ', (command) => {
      if (command === 'currencies') {
        displayAllCurrencies();
        chat();
      } else if (command === 'exchange') {
        rl.question('Enter the base currency code: ', (baseCurrency) => {
          rl.question('Enter the target currency code: ', (targetCurrency) => {
            getExchangeRate(baseCurrency.toUpperCase(), targetCurrency.toUpperCase());
            chat();
          });
        });
      } else if (command === 'exit') {
        rl.close();
      } else {
        console.log('Invalid command. Please try again.');
        chat();
      }
    });
  }
  
  chat();