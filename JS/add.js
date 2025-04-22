document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    // Отмена добавления
    cancelBtn.addEventListener('click', () => {
        window.location.href = 'main.html';
    });
    
    // Добавление нового события
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventCategory = document.getElementById('eventCategory').value;
        const eventDescription = document.getElementById('eventDescription').value;
        
        // Получение текущего списка событий
        let events = JSON.parse(localStorage.getItem('events')) || [];
        
        // Добавление нового события
        events.push({
            name: eventName,
            date: eventDate,
            category: eventCategory,
            description: eventDescription
        });
        
        // Сохранение в localStorage
        localStorage.setItem('events', JSON.stringify(events));
        
        // Возврат на главную страницу
        window.location.href = 'main.html';
    });
});