const form = document.getElementById('registerForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phone = document.getElementById('phone');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const phoneError = document.getElementById('phoneError');
const successMessage = document.getElementById('successMessage');

function setValid(input, errorElem, message = '') {
    errorElem.textContent = message;
    input.classList.remove('invalid');
    input.classList.add('valid');
}

function setInvalid(input, errorElem, message) {
    errorElem.textContent = message;
    input.classList.remove('valid');
    input.classList.add('invalid');
}

function validateName() {
    if (fullName.value.trim() === '') {
        setInvalid(fullName, nameError, 'Full Name is required.');
        return false;
    }
    setValid(fullName, nameError);
    return true;
}

function validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        setInvalid(email, emailError, 'Email is required.');
        return false;
    } else if (!pattern.test(email.value.trim())) {
        setInvalid(email, emailError, 'Enter a valid email, e.g. name@example.com.');
        return false;
    }
    setValid(email, emailError);
    return true;
}

function validatePassword() {
    const value = password.value;
    if (value.length < 8) {
        setInvalid(password, passwordError, 'Password must be at least 8 characters.');
        return false;
    } else if (!/[!@#$%^&*]/.test(value)) {
        setInvalid(password, passwordError, 'Include at least one special character (!@#$%^&*).');
        return false;
    }
    setValid(password, passwordError);
    return true;
}

function validatePhone() {
    const digitsOnly = /^[0-9]{10}$/;
    if (!digitsOnly.test(phone.value.trim())) {
        setInvalid(phone, phoneError, 'Enter a 10-digit phone number.');
        return false;
    }
    setValid(phone, phoneError);
    return true;
}

// Real-time validation
fullName.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
phone.addEventListener('input', validatePhone);

form.addEventListener('submit', function (e) {
    e.preventDefault(); // stop default submit

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPhoneValid = validatePhone();

    if (isNameValid && isEmailValid && isPasswordValid && isPhoneValid) {
        successMessage.textContent = 'Registration successful!';
        form.reset();
        fullName.classList.remove('valid');
        email.classList.remove('valid');
        password.classList.remove('valid');
        phone.classList.remove('valid');
    } else {
        successMessage.textContent = '';
    }
});
