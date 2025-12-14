// DOM элементы для формы
const registrationForm = document.getElementById('registration-form');
const confirmationModal = document.getElementById('confirmation-modal');
const confirmationMessage = document.getElementById('confirmation-message');
const closeModalBtn = document.getElementById('close-modal');

// Получение данных формы
function getFormData() {
    return {
        eventId: document.getElementById('event-select').value,
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        terms: document.getElementById('terms').checked
    };
}

// Отправка формы
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Показываем индикатор загрузки
        const submitBtn = registrationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        try {
            // Получаем данные формы
            const formData = getFormData();
            
            // Находим выбранное событие
            const selectedEvent = getEventById(formData.eventId);
            
            // Отправляем email участнику
            const emailResult = await sendRegistrationEmail(formData, selectedEvent);
            
            // Отправляем уведомление администратору (в фоновом режиме)
            sendAdminNotification(formData, selectedEvent);
            
            // Показываем подтверждение
            showConfirmation(formData, selectedEvent, emailResult);
            
            // Очищаем форму
            registrationForm.reset();
            
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            showError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
        } finally {
            // Восстанавливаем кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

// Показать модальное окно подтверждения
function showConfirmation(formData, selectedEvent, emailResult) {
    let message = `Уважаемый(ая) ${formData.firstName} ${formData.lastName}, вы успешно зарегистрировались на событие "${selectedEvent.title}", которое состоится ${selectedEvent.date}.`;
    
    if (emailResult.success) {
        message += ` Подтверждение отправлено на ваш email: ${formData.email}.`;
    } else {
        message += ` ${emailResult.message}`;
    }
    
    confirmationMessage.textContent = message;
    confirmationModal.style.display = 'flex';
}

// Показать ошибку
function showError(message) {
    alert(message); // Можно заменить на красивый toast или модальное окно ошибки
}

// Закрыть модальное окно
function closeModal() {
    confirmationModal.style.display = 'none';
}

// Инициализация обработчиков формы
function initFormHandlers() {
    // Отправка формы
    registrationForm.addEventListener('submit', handleFormSubmit);
    
    // Закрытие модального окна
    closeModalBtn.addEventListener('click', closeModal);
    
    // Клик вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            closeModal();
        }
    });
    
    // Инициализация EmailJS
    initEmailJS();
}