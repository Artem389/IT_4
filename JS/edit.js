document.addEventListener('DOMContentLoaded', function() {
    const editEventForm = document.getElementById('editEventForm');
    const deleteBtn = document.getElementById('deleteBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    // Получение ID события из URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    // Загрузка события для редактирования
    let events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[eventId];
    
    // Заполнение формы данными события
    document.getElementById('editEventName').value = event.name;
    document.getElementById('editEventDate').value = event.date;
    document.getElementById('editEventCategory').value = event.category;
    document.getElementById('editEventDescription').value = event.description || '';
    
    // Отмена редактирования
    cancelEditBtn.addEventListener('click', () => {
        window.location.href = 'main.html';
    });
    
    // Сохранение изменений
    editEventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Обновление данных события
        events[eventId] = {
            name: document.getElementById('editEventName').value,
            date: document.getElementById('editEventDate').value,
            category: document.getElementById('editEventCategory').value,
            description: document.getElementById('editEventDescription').value
        };
        
        // Сохранение в localStorage
        localStorage.setItem('events', JSON.stringify(events));
        
        // Возврат на главную страницу
        window.location.href = 'main.html';
    });
    
    // Удаление события
    deleteBtn.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите удалить это событие?')) {
            events.splice(eventId, 1);
            localStorage.setItem('events', JSON.stringify(events));
            window.location.href = 'main.html';
        }
    });
});