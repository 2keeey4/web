const cardData = [
    {id: 1, img: 'image.png', name: 'Антон', surname: 'Котиков', phone: '+7 920 472 32-23', category: 'no'},
    {id: 2, img: 'image1.png', name: 'Диана', surname: 'Фролова', phone: '+7 920 472 32-23', category: 'favorites'},
    {id: 3, img: 'image2.png', name: 'Анастасия', surname: 'Лебедева', phone: '+7 920 472 32-23', category: 'favorites'},
    {id: 4, img: 'image3.png', name: 'Алина', surname: 'Давыдова', phone: '+7 920 472 32-23', category: 'favorites'},
];

const cardsContainer = document.getElementById('cardContainer');

const categoryButtons = document.getElementById('button-group').querySelectorAll('button');//для фильтрации(получаем методы фильтрации из кнопок)
const sortItems = document.getElementById('cardFilter').querySelectorAll('.dropdown-item');//для сортировки(получаем методы сортировки из выпадающего списка)

let currentSort = 'default';//переменная для сортировки по умолчанию


//создание карточек
function createCard(data){
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
        <img src="${data.img}" alt="${data.name} ${data.surname}" width="100">
        <div class="name">${data.name} ${data.surname}</div>
        <div class="phone">${data.phone}</div>`
    ;
    return cardElement;
}

//отображение на сайте карточек 
function renderCards(data) {
    cardsContainer.innerHTML = '';
    data.forEach(item => cardsContainer.appendChild(createCard(item)));
}

//фильтрация
function filterCards(category) {
    let filteredData = cardData.filter(item => item.category === category || category === 'all');
    sortCards(filteredData);//если была до этого сортировка, то про неё не забываем
}

//сортировка
function sortCards(data) {
    switch (currentSort) {
        case 'lastName':
            data.sort((a, b) => a.surname.localeCompare(b.surname));
            break;
        case 'firstName':
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'default':
            break;
    }
    renderCards(data);//выводим нужные карто
}


//обрабатываем нажатия на кнопки для фильтрации, какая именно кнопка была нажата
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterCards(button.dataset.value);
    });
});


//обрабатываем нажатия на кнопки для сортировки
sortItems.forEach(item => {
    item.addEventListener('click', () => {
        currentSort = item.dataset.value;
        const dropdownLabel = document.querySelector('.dropdown-label');
        dropdownLabel.textContent = item.textContent;
        filterCards(document.querySelector('.button-group button.active')?.dataset.value || 'all');
    });
});

//изначально  все карточки выводим
renderCards(cardData);


//active по дефолту сначала у все контакты
const allContactsButton = document.querySelector('.Contact');
allContactsButton.classList.add('active');

//затем смотрим что нажато, то и переводим в active
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
    });
});



// Выпадающий список 
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownToggle.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function(event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const dropdownLabel = document.querySelector('.dropdown-label');
            dropdownLabel.textContent = this.textContent;
            dropdownMenu.style.display = 'none'; 
            filterCards(document.querySelector('.button-group button.active')?.dataset.value || 'all');
        });
    });
});

//перезагрузка
window.onload = function() {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setInterval(function() {
          preloader.classList.add('preloader-hidden');}, 990);
}

function input() {
    const input_taker = document.getElementById('input').value;//получаем значения из поля ввода
    const block = document.getElementById('block');//получаем поле вывода
  
    
    while (block.childElementCount > input_taker.length) {//удаление из вывода, если удалили из ввода
        block.removeChild(block.lastChild);
    }
  
  
    let leftOffset = 0;

    for (let i = 0; i < input_taker.length; i++) {//проходим по всем введённым символам
      const char = input_taker[i];
      let charSpan = block.children[i]; //Проверяем выведен символь или нет 
  
      if (!charSpan) { //если его нет, добавляем
        charSpan = document.createElement('span');//анимация
        block.appendChild(charSpan);
      }
      charSpan.textContent = char;//передвигаемся дальше 
      charSpan.style.left = `${leftOffset}px`;//выводи в строку, а не в столбец 
      leftOffset += charSpan.offsetWidth + 5;//отступ для нового символа
    }
    
  }

  function changeBorderColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    document.getElementById('block').style.borderColor = `rgb(${r}, ${g}, ${b})`;
  }
  
  // Пример: вызов функции каждые 2 секунды
  setInterval(changeBorderColor, 2000);
  
  
  
  
   
  










