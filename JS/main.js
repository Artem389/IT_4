document.addEventListener('DOMContentLoaded', function() {
    const eventsList = document.getElementById('eventsList');
    const addEventBtn = document.getElementById('addEventBtn');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateSort = document.getElementById('dateSort');
    
    // Загрузка событий из localStorage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Отображение событий
    function displayEvents() {
        // Добавляем класс для анимации перемещения
        eventsList.classList.add('moving');
        
        // Получаем текущие карточки перед обновлением
        const currentCards = Array.from(eventsList.children);
        
        // Фильтрация и сортировка 
        let filteredEvents = events;
        if (categoryFilter.value !== 'all') {
            filteredEvents = events.filter(event => event.category === categoryFilter.value);
        }
        
        filteredEvents.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateSort.value === 'newest' ? dateA - dateB : dateB - dateA;
        });
        
        // Временно скрываем список
        eventsList.style.opacity = '0';
        
        // Используем requestAnimationFrame для плавной анимации
        requestAnimationFrame(() => {
            // Очищаем список после начала анимации
            eventsList.innerHTML = '';
            
            // Создаем карточки с анимацией
            filteredEvents.forEach((event, index) => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.innerHTML = `
                    <h3>${event.name}</h3>
                    <p><strong>Дата:</strong> ${formatDate(event.date)}</p>
                    <p><strong>Категория:</strong> <span class="event-category category-${event.category}">${event.category}</span></p>
                    ${event.description ? `<p>${event.description}</p>` : ''}
                `;
                
                // Добавляем задержку для последовательного появления
                eventCard.style.animationDelay = `${index * 0.05}s`;
                
                eventCard.addEventListener('click', () => {
                    window.location.href = `edit-event.html?id=${events.indexOf(event)}`;
                });
                
                eventsList.appendChild(eventCard);
            });
            
            // Плавное появление списка
            eventsList.style.opacity = '1';
            eventsList.style.transition = 'opacity 0.3s ease';
            
            // Удаляем класс перемещения после анимации
            setTimeout(() => {
                eventsList.classList.remove('moving');
            }, 500);
        });
    }
    
    // Форматирование даты
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }
    
    // Переход на страницу добавления
    addEventBtn.addEventListener('click', () => {
        window.location.href = 'add.html';
    });
    
    // Применение фильтров
    categoryFilter.addEventListener('change', displayEvents);
    dateSort.addEventListener('change', displayEvents);
    
    // Первоначальное отображение
    displayEvents();
});