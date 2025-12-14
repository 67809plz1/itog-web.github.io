// Инициализация обработчиков ввода
function initInputHandlers() {
    // Реальная валидация при вводе
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            
            // Убираем классы валидации при изменении
            this.classList.remove('valid', 'invalid');
            
            // Специальная обработка для телефона
            if (this.id === 'phone') {
                const formattedPhone = formatPhoneInput(this.value);
                if (formattedPhone !== this.value) {
                    this.value = formattedPhone;
                }
                // Валидируем телефон в реальном времени
                validatePhone(this.value.trim());
            }
        });
        
        // Валидация при потере фокуса
        input.addEventListener('blur', function() {
            switch(this.id) {
                case 'first-name':
                    validateFirstName(this.value.trim());
                    break;
                case 'last-name':
                    validateLastName(this.value.trim());
                    break;
                case 'email':
                    validateEmail(this.value.trim());
                    break;
                case 'phone':
                    validatePhone(this.value.trim());
                    break;
            }
        });
    });
    
    // Валидация чекбокса
  document.getElementById('terms').addEventListener('change', function() {
    document.getElementById('terms-error').style.display = 'none';
    const termsContainer = document.querySelector('.checkbox-container');
    termsContainer.classList.remove('invalid');
});
    
    // Валидация селекта
    eventSelect.addEventListener('change', function() {
        document.getElementById('event-error').style.display = 'none';
        this.classList.remove('invalid');
    });
}