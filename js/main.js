// Инициализация приложения
function init() {
    loadEvents();
    initFormHandlers();
    initNavigationHandlers();
    initInputHandlers();
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', init);