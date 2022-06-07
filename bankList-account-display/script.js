'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnLogout = document.querySelector('.logout__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const inputForm = document.querySelector('.login');


const displayMovement = (movements) => {
  containerMovements.innerHTML = '';
  movements.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${move.toFixed(2)}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

const createUserName = (accounts) => {
  accounts.forEach(account => {
    account.userName = account.owner.toLowerCase().split(' ').map(name => name.charAt(0)).join('');
  });
}

createUserName(accounts)

const calcDisplayBalance = (account) => {
  const balance = account.movements.reduce((acc, move) => acc + move, 0);
  account.balance = balance.toFixed(2);
  labelBalance.textContent = balance + ' €';
}

const calcDisplaySumary = (account) => {

  const sumIn = account.movements.filter(move => move > 0)
    .reduce((acc, move) => acc + move, 0);
  labelSumIn.textContent = sumIn.toFixed(2) + '€';

  const interestSum = account.movements.filter(move => move > 0)
    .map(deposit => deposit * account.interestRate / 100)
    .filter((int) => int >= 1)
    .reduce((acc, move) => acc + move, 0);
  labelSumInterest.textContent = interestSum.toFixed(2) + '€';

  const sumOut = account.movements.filter(move => move < 0)
    .reduce((acc, move) => acc + move, 0);
  labelSumOut.textContent = sumOut.toFixed(2) + '€';
}

const calcTimer = (time) => {
  var timer = time.split(':');
  let minute = Number(timer[0]);
  let second = Number(timer[1]);
  if (second === 0) {
    if (minute === 1) return '00:00';
    if (minute > 10) return `${minute - 1}:59`;
    return `0${minute - 1}:59`;
  } else {
    if (second > 10) return `${timer[0]}:${second - 1}`;
    return `${timer[0]}:0${second - 1}`;
  }
}

const convertDate = (date) => {
  const convertDate = new Date(date);
  return ((convertDate.getMonth() > 8) ? (convertDate.getMonth() + 1) : ('0' + (convertDate.getMonth() + 1))) + '/' + ((convertDate.getDate() > 9) ? convertDate.getDate() : ('0' + convertDate.getDate())) + '/' + convertDate.getFullYear()
    + ' ' + convertDate.getHours() + ':' + convertDate.getMinutes() + ':' + ((convertDate.getSeconds() > 9) ? convertDate.getSeconds() : ('0' + (convertDate.getSeconds() )));
}

const logout = (timer) => {
  containerMovements.innerHTML = '';
  labelBalance.textContent = '0000€';
  labelSumIn.textContent = '0000€';
  labelSumOut.textContent = '0000€';
  labelSumInterest.textContent = '0000€';
  inputForm.style.display = 'flex';
  labelWelcome.textContent = 'Log in to get started';
  containerApp.style.opacity = 0;
  containerApp.style.visibility = 'hidden';
  labelTimer.textContent = '05:00';
  btnLogout.style.display = 'none';
  clearInterval(timer);
}

const login = (account) => {
  displayMovement(account.movements);
  calcDisplaySumary(account);
  calcDisplayBalance(account);
  inputForm.style.display = 'none';
  labelWelcome.textContent = `Welcome ${account.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;
  containerApp.style.visibility = 'visible';
  btnLogout.style.display = 'block';
  let date = new Date();
  labelDate.textContent = convertDate(date);
  window.timer = setInterval(() => {
    labelTimer.textContent = calcTimer(labelTimer.textContent);
    date = new Date()
    labelDate.textContent = convertDate(date);
    if (labelTimer.textContent === '00:00') {
      console.log('Logout');
      logout(window.timer);
    }
  }, 1000)
}

const clearInput = () => {
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
}

var currentAccount = null;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  let userName = inputLoginUsername.value;
  let pin = inputLoginPin.value;
  if (userName === '' || pin === '') {
    return alert('Please fill all the fields');
  }
  if (isNaN(pin)) {
    return alert('Pin must be a number');
  }
  const account = accounts.find(acc => acc.userName === userName)
  if (!account) {
    return alert('Invalid Username');
  }
  if (account.pin !== Number(pin)) {
    return alert('Wrong pin number');
  }

  console.log('Login');
  currentAccount = account;
  clearInput();
  login(account);
})

btnLogout.addEventListener('click', (e) => {
  e.preventDefault();
  logout(window?.timer);
})

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amountTransfered = Number(inputTransferAmount?.value);
  if (amountTransfered <= 0) {
    return alert('Transfer amount must be greater than 0');
  }

  if (amountTransfered > currentAccount?.balance) {
    return alert('Transfer amount cannot be greater than balance');
  }

  if (inputTransferTo?.value === currentAccount?.userName) {
    return alert('You cannot transfer to yourself');
  }

  const receiver = accounts.find(acc => acc.userName === inputTransferTo?.value);
  if (!receiver) {
    return alert('Invalid receiver');
  }

  currentAccount?.movements?.push(amountTransfered * (-1));
  receiver?.movements?.push(amountTransfered);
  displayMovement(currentAccount?.movements);
  calcDisplaySumary(currentAccount);
  calcDisplayBalance(currentAccount);

  inputTransferAmount.value = '';
  inputTransferTo.value = '';
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loan = Math.floor(inputLoanAmount.value)
  if (loan <= 0)
    return alert('Loan must be greater or equal to 1')
  if (!currentAccount.movements.some(move => move >= loan / 10))
    return alert('At least one past movement of the account must be greater than 10 percent of loan')
  currentAccount?.movements?.push(loan);
  displayMovement(currentAccount?.movements);
  calcDisplaySumary(currentAccount);
  calcDisplayBalance(currentAccount);
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = inputClosePin.value;
  if (user !== currentAccount.userName)
    return alert('Wrong user name');
  if (Number(pin) !== currentAccount.pin)
    return alert('Wrong pin number');
  const index = accounts.findIndex(acc => acc.userName === user);
  if (index === -1)
    return alert('Invalid account');
  accounts.splice(index, 1);
  logout(window?.timer);
})
let isSort = false
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  const compare = (a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  }
  if (!isSort) {
    isSort = true
    const sortMovements = [...currentAccount?.movements].sort(compare);
    displayMovement(sortMovements);
  } else {
    isSort = false
    displayMovement(currentAccount?.movements);
  }
})

login(account1)
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
