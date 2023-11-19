let cardContainers = document.querySelectorAll('.card-container');
let today = new Date();

cardContainers.forEach(container => {

    let card = container.querySelector('.card');
    let specialCard = container.querySelector('.special-card');

    
    card.addEventListener('mouseover', () => {
        specialCard.style.display = 'block'; // special-card를 보이게 설정
        card.style.display = 'none';
    });

    
    card.addEventListener('mouseout', () => {
        specialCard.style.display = 'none'; // special-card를 숨김
        card.style.display = 'block';
    });
});

let year = today.getFullYear();
let month = today.getMonth() + 1; // JavaScript에서 월은 0-11로 표현됩니다.
let day = today.getDate();


let formattedMonth = month < 10 ? `0${month}` : month;
let formattedDay = day < 10 ? `0${day}` : day;

let dateString = `🗓️ ${year}.${formattedMonth}.${formattedDay}`;


document.getElementById('Topdiv').textContent = dateString;