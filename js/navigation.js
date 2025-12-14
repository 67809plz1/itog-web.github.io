
// DOM элементы для навигации
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Переключение мобильного меню
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

// Выбор события из карточки
function handleEventSelection(e) {
    if (e.target.classList.contains('select-event')) {
        const eventId = e.target.getAttribute('data-id');
        eventSelect.value = eventId;
        
        // Скрываем ошибку выбора события
        document.getElementById('event-error').style.display = 'none';
        
        // Прокрутка к форме
        document.getElementById('registration').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
    
    // Обработка кнопки "Подробнее"
    if (e.target.classList.contains('toggle-details')) {
        const eventId = e.target.getAttribute('data-id');
        toggleEventDetails(eventId);
    }
}

// Плавная прокрутка для навигации
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Закрытие мобильного меню
        navLinks.classList.remove('active');
    }
}

// Инициализация обработчиков навигации
function initNavigationHandlers() {
    // Мобильное меню
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Выбор события из карточки и переключение деталей
    document.addEventListener('click', handleEventSelection);
    
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}
