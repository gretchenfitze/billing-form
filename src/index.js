import luhn from 'fast-luhn';
import masker from 'vanilla-masker';
import banksDB from 'banks-db';
import './style.css';

const billingForm = document.querySelector('.card');
const bankName = document.querySelector('.card__bank-name');
const cardNumber = document.getElementById('card__input_number');
const cardMonth = document.getElementById('card__input_month');
const cardYear = document.getElementById('card__input_year');

masker(cardNumber).maskPattern('9999 9999 9999 9999 99');
masker(cardMonth).maskPattern('99');
masker(cardYear).maskPattern('9999');

cardNumber.addEventListener('input', (event) => {
  const number = event.target.value;
  const bank = banksDB(number);

  if (number.length >= 14) {
    const isLuhnCheckPassed = luhn(number.split(' ').join(''));
    cardNumber.classList.toggle('card__input_invalid', !isLuhnCheckPassed);
    cardNumber.classList.toggle('card__input_valid', isLuhnCheckPassed);
  } else {
    cardNumber.classList.remove('card__input_invalid', 'card__input_valid');
  }

  if (bank.code) {
    billingForm.classList.add(`card_bank-${(bank.code || 'other')}`);
    bankName.innerText = bank.country === 'ru' ? bank.localTitle : bank.engTitle;
  } else {
    billingForm.className = 'card';
    bankName.innerText = '';
  }
});
