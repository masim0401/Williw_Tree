import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import {validatePhoneNumberLength} from "libphonenumber-js";

const stars = document.querySelectorAll('.stars');
stars.forEach(star => {
    const starItem = star.querySelectorAll('.stars__item');
    starItem.forEach(element => element.addEventListener('click', function (e) {
        let index = [...starItem].indexOf(e.target);
        for (let i = 0; i < starItem.length; i++) {
            if(i<= index) {
                starItem[i].classList.add('stars__item_active');
            } else {
                starItem[i].classList.remove('stars__item_active');
            }
        }
        const starInput = star.parentElement.querySelector("input");
        starInput.value = index + 1;
    }))

});
const switchLang = document.querySelector('.switch-lang');
const modalLang = document.querySelector('.switch-modal');
const modalBlockLang = document.querySelector('.switch-lang__wrap');
const closeModal = document.querySelector('.switch-modal__close');
const modalText = document.querySelectorAll('.switch_modal__text');
const modalImg = document.querySelectorAll('.switch_modal__text img')
switchLang.addEventListener('click', function (e) {
    modalLang.style.display = 'block';
})

closeModal.addEventListener('click', function (e) {
    modalLang.style.display = 'none'
})
window.onclick = function (event) {
    if (event.target.contains(modalBlockLang) && event.target !== modalBlockLang) {
        modalLang.style.display = 'none'
    }
}
modalText.forEach(element => element.addEventListener('click', function (e) {
    const imgPath = element.querySelector('img').getAttribute('src');
    const switchLang = document.querySelector('.switch-lang__language img');
    switchLang.src = imgPath;
    modalLang.style.display = 'none'
}))

const input = fileUpload;
const trash = document.querySelector('.remove-photo');
const customImg = document.querySelector('.custom-file-upload');

trash.addEventListener('click', function (e) {
    customImg.style.display = 'block';
    trash.style.display = 'none';
    filePreview.style.display = 'none';
    fileUpload.value = '';
})

const previewPhoto = () => {
    const file = input.files;
    customImg.style.display = 'none';
    filePreview.style.display = 'block';
    trash.style.display = 'flex';
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = event => {
            filePreview.setAttribute('src', event.target.result);
        }
        fileReader.readAsDataURL(file[0]);

    }
}
input.addEventListener('change',previewPhoto);

const phone = document.querySelector("#phone");
intlTelInput(phone, {
    initialCountry: "ua",
    onlyCountries: ["ua", "au", "at", "az", "al", "ar", "be", "bg", "gb", "hu", "de", "gr", "dk", "il", "ie",
        "is", "es", "it", "kz", "ca", "kg", "lv", "lt", "md", "nl", "no", "ae", "pl", "pt", "ro", "rs", "sk",
        "sl", "us", "tj", "tr", "tm", "uz", "fi", "fr", "hr", "me", "cz", "ch", "se", "ee", "jp"],
    preferredCountries: [],

    dropdownContainer: document.body,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
});

phone.addEventListener("countrychange", (e) => {
    e.target.value = '';
});

phone.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    let numericValue = inputValue.replace(/\D/g, "");

    if (numericValue.length > 16) {
        numericValue = numericValue.slice(0, 16);
    }

    event.target.value = numericValue;
});



const form = document.querySelector('.form-block');

const formValidator = (() => {

    const clearErrors = () => {
        const errorMessage = document.querySelectorAll('.form-error');
        const removeError = document.querySelectorAll('input');
        removeError.forEach(el => el.classList.remove('error'));
        errorMessage.forEach(el => el.textContent = '');
        errorMessage.forEach(el => el.style.display = 'none');
    }
    const showError = (key, message) => {
        const name = document.getElementById(key);
        const inputParent = name.closest('.form-group');
        const inputError  = inputParent.querySelector('.form-error');
        name.classList.add('error');
        inputError.textContent = message;
        inputError.style.display = 'block';
    }

    const validateFormPhoneInput = (input) => {
        let hasError = false
        console.log(window.intlTelInputGlobals)
        const itiInstance = window.intlTelInputGlobals.getInstance(input);
        const {iso2} = itiInstance.getSelectedCountryData()
        hasError = validatePhoneNumberLength(input.value, iso2.toUpperCase())
        if (hasError) {
            showError('phone', 'Невірний формат телефону')
        }
        return hasError;
    }

    const validate = (formData) => {
        const inputPhone = form.querySelector('input[name="phone"]');
        let hasError = false;
        clearErrors();
        if (!formData.get('email')) {
            showError('email', 'Це поле повинно бути заповнене');
            hasError = true;
        }
        if (inputPhone) {
            if (!formData.get('phone')) {
                showError('phone', 'Це поле повинно бути заповнене');
                hasError = true;
            } else {
                hasError = validateFormPhoneInput(inputPhone);
            }
        }
        return !hasError
    }
    return {validate}
})()

form.addEventListener('submit', saveForm);
async function saveForm(event){
    event.preventDefault();
    const formData = new FormData(form);
    if (!formValidator.validate(formData)) {}
    else {
        await  fetch('http://localhost:8080/form',{
            method: 'POST',
            body: formData
        });
    }

    // form.reset();
}




