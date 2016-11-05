import luhn from 'fast-luhn';
import masker from 'vanilla-masker';
import banksDB from 'banks-db';
import './style.css';

const billingForm = document.querySelector('.card');
const bankName = document.querySelector('.card__bank-name');
const cardNumber = document.getElementById('card__input_number');
const cardDate = document.getElementById('card__input_date');

masker(cardNumber).maskPattern('9999 9999 9999 9999 99');
masker(cardDate).maskPattern('99/99');

cardNumber.addEventListener('input', (event) => {
  const number = event.target.value;
  const bank = banksDB(number);

  if (number.length >= 14) {
    cardNumber.classList.toggle('card__input_invalid', !luhn(number.split(' ').join('')));
  }

  if (bank.code) {
    billingForm.className = (`card billing-form is-${(bank.code || 'other')}`);
    bankName.innerText = bank.country === 'ru' ? bank.localTitle : bank.engTitle;
  } else {
    billingForm.className = 'card billing-form';
    bankName.innerText = '';
  }
});
