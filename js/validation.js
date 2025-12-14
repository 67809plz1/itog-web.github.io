// Валидация формы
function validateForm() {
    let isValid = true;
    
    // Получаем значения полей напрямую из DOM
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const eventId = document.getElementById('event-select').value;
    const terms = document.getElementById('terms').checked;
    
    // Валидация всех полей
    isValid = validateFirstName(firstName) && isValid;
    isValid = validateLastName(lastName) && isValid;
    isValid = validateEmail(email) && isValid;
    isValid = validatePhone(phone) && isValid;
    isValid = validateEvent(eventId) && isValid;
    isValid = validateTerms(terms) && isValid;
    
    return isValid;
}

// Валидация имени
function validateFirstName(firstName) {
    const firstNameError = document.getElementById('first-name-error');
    const firstNameField = document.getElementById('first-name');
    
    // Убираем предыдущие классы
    firstNameField.classList.remove('valid', 'invalid');
    
    if (!firstName) {
        firstNameError.textContent = 'Поле обязательно для заполнения';
        firstNameError.style.display = 'block';
        firstNameField.classList.add('invalid');
        return false;
    } else if (firstName.length < 2) {
        firstNameError.textContent = 'Имя должно содержать минимум 2 символа';
        firstNameError.style.display = 'block';
        firstNameField.classList.add('invalid');
        return false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(firstName)) {
        firstNameError.textContent = 'Имя может содержать только буквы, пробелы и дефисы';
        firstNameError.style.display = 'block';
        firstNameField.classList.add('invalid');
        return false;
    } else {
        firstNameError.style.display = 'none';
        firstNameField.classList.add('valid');
        return true;
    }
}

// Валидация фамилии
function validateLastName(lastName) {
    const lastNameError = document.getElementById('last-name-error');
    const lastNameField = document.getElementById('last-name');
    
    lastNameField.classList.remove('valid', 'invalid');
    
    if (!lastName) {
        lastNameError.textContent = 'Поле обязательно для заполнения';
        lastNameError.style.display = 'block';
        lastNameField.classList.add('invalid');
        return false;
    } else if (lastName.length < 2) {
        lastNameError.textContent = 'Фамилия должна содержать минимум 2 символа';
        lastNameError.style.display = 'block';
        lastNameField.classList.add('invalid');
        return false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(lastName)) {
        lastNameError.textContent = 'Фамилия может содержать только буквы, пробелы и дефисы';
        lastNameError.style.display = 'block';
        lastNameField.classList.add('invalid');
        return false;
    } else {
        lastNameError.style.display = 'none';
        lastNameField.classList.add('valid');
        return true;
    }
}

// Валидация email
function validateEmail(email) {
    const emailError = document.getElementById('email-error');
    const emailField = document.getElementById('email');
    
    emailField.classList.remove('valid', 'invalid');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'Поле обязательно для заполнения';
        emailError.style.display = 'block';
        emailField.classList.add('invalid');
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Введите корректный email адрес';
        emailError.style.display = 'block';
        emailField.classList.add('invalid');
        return false;
    } else if (email.length > 100) {
        emailError.textContent = 'Email не должен превышать 100 символов';
        emailError.style.display = 'block';
        emailField.classList.add('invalid');
        return false;
    } else {
        emailError.style.display = 'none';
        emailField.classList.add('valid');
        return true;
    }
}

// Валидация телефона (необязательное поле)
function validatePhone(phone) {
    const phoneError = document.getElementById('phone-error');
    const phoneField = document.getElementById('phone');
    
    phoneField.classList.remove('valid', 'invalid');
    
    // Если поле пустое - это валидно (поле необязательное)
    if (!phone) {
        phoneError.style.display = 'none';
        return true;
    }
    
    // Очищаем телефон от всех нецифровых символов, кроме +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Проверяем различные форматы телефонов
    const phonePatterns = {
        // Российские форматы
        ru: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
        // Международный формат (E.164)
        international: /^\+(?:[0-9] ?){6,14}[0-9]$/,
        // Общий формат с 10-15 цифрами
        general: /^[\+]?[0-9\s\-\(\)]{10,15}$/
    };
    
    let isValid = false;
    let errorMessage = '';
    
    // Проверяем длину
    if (cleanPhone.length < 10) {
        errorMessage = 'Телефон должен содержать минимум 10 цифр';
    } else if (cleanPhone.length > 15) {
        errorMessage = 'Телефон не должен превышать 15 цифр';
    }
    // Проверяем российский формат
    else if (phonePatterns.ru.test(phone)) {
        isValid = true;
    }
    // Проверяем международный формат
    else if (phonePatterns.international.test(phone)) {
        isValid = true;
    }
    // Проверяем общий формат
    else if (phonePatterns.general.test(phone)) {
        isValid = true;
    } else {
        errorMessage = 'Введите корректный номер телефона';
    }
    
    if (!isValid) {
        phoneError.textContent = errorMessage || 'Неверный формат телефона. Пример: +7 (999) 123-45-67';
        phoneError.style.display = 'block';
        phoneField.classList.add('invalid');
        return false;
    } else {
        phoneError.style.display = 'none';
        phoneField.classList.add('valid');
        return true;
    }
}

// Форматирование телефона в реальном времени
function formatPhoneInput(phone) {
    // Убираем все нецифровые символы, кроме +
    let cleaned = phone.replace(/[^\d+]/g, '');
    
    // Если начинается с 8, меняем на +7
    if (cleaned.startsWith('8') && !cleaned.startsWith('+')) {
        cleaned = '+7' + cleaned.substring(1);
    }
    // Если начинается с 7 и нет + в начале, добавляем +
    else if (cleaned.startsWith('7') && !cleaned.startsWith('+7')) {
        cleaned = '+' + cleaned;
    }
    // Если номер российский и нет кода страны, добавляем +7
    else if (cleaned.length === 10 && !cleaned.startsWith('+')) {
        cleaned = '+7' + cleaned;
    }
    
    // Форматируем российский номер
    if (cleaned.startsWith('+7')) {
        const match = cleaned.match(/^(\+7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
            let formatted = '+7';
            if (match[2]) formatted += ` (${match[2]}`;
            if (match[3]) formatted += `) ${match[3]}`;
            if (match[4]) formatted += `-${match[4]}`;
            if (match[5]) formatted += `-${match[5]}`;
            return formatted;
        }
    }
    
    return phone;
}

// Валидация выбора события
function validateEvent(eventId) {
    const eventError = document.getElementById('event-error');
    const eventField = document.getElementById('event-select');
    
    eventField.classList.remove('valid', 'invalid');
    
    if (!eventId) {
        eventError.textContent = 'Пожалуйста, выберите событие для регистрации';
        eventError.style.display = 'block';
        eventField.classList.add('invalid');
        return false;
    } else {
        eventError.style.display = 'none';
        eventField.classList.add('valid');
        return true;
    }
}

// Валидация согласия с условиями
function validateTerms(terms) {
    const termsError = document.getElementById('terms-error');
    const termsContainer = document.querySelector('.checkbox-container');
    
    termsContainer.classList.remove('valid', 'invalid');
    
    if (!terms) {
        termsError.textContent = 'Необходимо принять условия для продолжения';
        termsError.style.display = 'block';
        termsContainer.classList.add('invalid');
        return false;
    } else {
        termsError.style.display = 'none';
        termsContainer.classList.add('valid');
        return true;
    }
}
