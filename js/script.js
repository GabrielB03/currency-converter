const apiKey = '1cfda6ba2a10ba39f184c229'; // Sua chave de API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            populateCurrencyOptions(currencies);
        });

    document.getElementById('convertButton').addEventListener('click', convertCurrency);
});

function populateCurrencyOptions(currencies) {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        fromCurrency.appendChild(option.cloneNode(true));
        toCurrency.appendChild(option.cloneNode(true));
    });
}

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rate;
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => console.error('Error:', error));
}