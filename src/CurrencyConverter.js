import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        setExchangeRates(response.data.rates);
      });
  }, [fromCurrency]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const getFlag = (currencyCode) => {
    const country = countries.find(country => country.currencies && Object.keys(country.currencies).includes(currencyCode));
    return country ? country.flags.png : '';
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <input type="number" value={amount} onChange={handleAmountChange} />
      <div className="currency-row">
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <img src={getFlag(fromCurrency)} alt="flag" />
      </div>
      <i className="fa fa-exchange converter-icon"></i>
      <div className="currency-row">
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {Object.keys(exchangeRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <img src={getFlag(toCurrency)} alt="flag" />
      </div>
      <h2>{amount} {fromCurrency} = {(amount * exchangeRates[toCurrency]).toFixed(2)} {toCurrency}</h2>
    </div>
  );
};

export default CurrencyConverter;
