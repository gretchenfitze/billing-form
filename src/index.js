import luhn from 'fast-luhn';
// import masker from 'vanilla-masker';
import banksDB from 'banks-db';
import './style.css';

const billingForm = document.querySelector('.card');
const bankName = document.querySelector('.card__bank-name');
const cardNumber = document.getElementById('card__input_number');
const cardMonth = document.getElementById('card__input_month');
const cardYear = document.getElementById('card__input_year');

// masker(cardNumber).maskPattern('9999 9999 9999 9999 99');
// masker(cardMonth).maskPattern('99');
// masker(cardYear).maskPattern('9999');
//
// cardNumber.addEventListener('input', (event) => {
//   const number = event.target.value;
//   const bank = banksDB(number);
//
//   if (number.length >= 14) {
//     cardNumber.classList.toggle('card__input_invalid', !luhn(number.split(' ').join('')));
//   } else {
//     cardNumber.classList.remove('card__input_invalid');
//   }
//
//   if (bank.code) {
//     billingForm.classList.add(`card_bank-${(bank.code || 'other')}`);
//     bankName.innerText = bank.country === 'ru' ? bank.localTitle : bank.engTitle;
//   } else {
//     billingForm.className = 'card';
//     bankName.innerText = '';
//   }
// });
