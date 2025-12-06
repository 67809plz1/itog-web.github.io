// Инициализация EmailJS
function initEmailJS() {
    // Замените 'YOUR_PUBLIC_KEY' на ваш публичный ключ из EmailJS
    emailjs.init('1t_5Sv8tQIIqloxWP');
}

// Отправка email с данными регистрации
async function sendRegistrationEmail(formData, selectedEvent) {
    try {
        const templateParams = {
            to_name: `${formData.firstName} ${formData.lastName}`,
            to_email: formData.email,
            event_name: selectedEvent.title,
            event_date: selectedEvent.date,
            event_time: selectedEvent.time,
            event_location: selectedEvent.location,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || 'Не указан',
            registration_date: new Date().toLocaleDateString('ru-RU'),
            event_description: selectedEvent.description,
            event_full_description: selectedEvent.fullDescription || selectedEvent.description
        };

        // Замените 'YOUR_SERVICE_ID' и 'YOUR_TEMPLATE_ID' на ваши реальные ID
        const response = await emailjs.send(
            'service_u6ubpzi',
            'template_rbe9e3s',
            templateParams
        );

        console.log('Email отправлен успешно:', response);
        return { success: true, message: 'Письмо с подтверждением отправлено' };
    } catch (error) {
        console.error('Ошибка отправки email:', error);
        return { 
            success: false, 
            message: 'Регистрация прошла успешно, но не удалось отправить письмо с подтверждением' 
        };
    }
}

// Отправка уведомления администратору
async function sendAdminNotification(formData, selectedEvent) {
    try {
        const templateParams = {
            event_name: selectedEvent.title,
            event_date: selectedEvent.date,
            participant_name: `${formData.firstName} ${formData.lastName}`,
            participant_email: formData.email,
            participant_phone: formData.phone || 'Не указан',
            registration_date: new Date().toLocaleDateString('ru-RU'),
            registration_time: new Date().toLocaleTimeString('ru-RU')
        };

        // Замените на ID шаблона для администратора
        const response = await emailjs.send(
            'service_u6ubpzi',
            'template_rbe9e3s',
            templateParams
        );

        console.log('Уведомление администратору отправлено:', response);
        return true;
    } catch (error) {
        console.error('Ошибка отправки уведомления администратору:', error);
        return false;
    }
}