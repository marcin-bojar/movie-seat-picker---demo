//DOM Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

//Save selected movie and price in localStorage
function setMovieData(select) {
    const selectedMovieIndex = select.selectedIndex;
    const selectedMoviePrice = select.value;

    localStorage.setItem('selectedMoviePrice', selectedMoviePrice);
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex);
    
};

//Get data from localStorage
function getLocalStorage() {
    const moviePrice = localStorage.getItem('selectedMoviePrice');
    const movieIndex = localStorage.getItem('selectedMovieIndex');
    const seatsIndex = JSON.parse(localStorage.getItem('selectedSeatsIndex'));
    
    if(movieIndex !== null) movieSelect.selectedIndex = +movieIndex;
    if(moviePrice !== null) ticketPrice = +moviePrice;
    if(seatsIndex !== null && seatsIndex.length > 0) {
        seatsIndex.forEach(el => {
            [...seats][el].classList.add('selected');
        });
    }

    updateCount();
};


// Update the seats count and total price
function updateCount() {
    const selectedSeatsList = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeatsList.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    //Save selected seats in localStorage
   const seatsIndex = [...selectedSeatsList].map(el => [...seats].indexOf(el));

    localStorage.setItem('selectedSeatsIndex', JSON.stringify(seatsIndex));  
};


//Select film event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateCount();
    setMovieData(e.target);
});

//Seat picking event
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateCount();
    }
});

//Page load event
window.addEventListener('load', () => {
    getLocalStorage();
});