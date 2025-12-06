
// DOM элементы для событий
const eventsContainer = document.getElementById('events-container');
const eventSelect = document.getElementById('event-select');

// Загрузка событий на страницу
function loadEvents() {
    eventsContainer.innerHTML = '';
    
    eventsData.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')"></div>
            <div class="event-content">
                <span class="event-date">${event.date}</span>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <span>${event.time}</span>
                    <span>${event.location}</span>
                </div>
                <div class="event-details" id="event-details-${event.id}" style="display: none;">
                    <div class="event-full-description">
                        <h4>Подробное описание:</h4>
                        <p>${event.fullDescription || 'Подробное описание мероприятия будет доступно ближе к дате проведения.'}</p>
                    </div>
                    <div class="event-additional-info">
                        <h4>Дополнительная информация:</h4>
                        <ul>
                            <li><strong>Формат:</strong> ${event.format || 'Офлайн/Онлайн'}</li>
                            <li><strong>Количество участников:</strong> ${event.participants || 'до 100 человек'}</li>
                            <li><strong>Язык мероприятия:</strong> ${event.language || 'Русский'}</li>
                           
                        </ul>
                    </div>
                </div>
                <div class="event-actions">
                    <button class="btn btn-outline select-event" data-id="${event.id}">Выбрать</button>
                    <button class="btn btn-secondary toggle-details" data-id="${event.id}">Подробнее</button>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
    
    // Заполнение выпадающего списка событий
    populateEventSelect();
}

// Заполнение выпадающего списка событий
function populateEventSelect() {
    eventSelect.innerHTML = '<option value="">-- Выберите событие --</option>';
    eventsData.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = event.title;
        eventSelect.appendChild(option);
    });
}

// Получение события по ID
function getEventById(eventId) {
    return eventsData.find(event => event.id === parseInt(eventId));
}

// Переключение отображения подробной информации
function toggleEventDetails(eventId) {
    const detailsElement = document.getElementById(`event-details-${eventId}`);
    const button = document.querySelector(`.toggle-details[data-id="${eventId}"]`);
    
    if (detailsElement.style.display === 'none') {
        detailsElement.style.display = 'block';
        button.textContent = 'Скрыть';
        button.classList.add('active');
    } else {
        detailsElement.style.display = 'none';
        button.textContent = 'Подробнее';
        button.classList.remove('active');
    }
}
