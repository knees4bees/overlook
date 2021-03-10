import Customer from "./Customer";
import BookingsRepo from "./BookingsRepo";
import RoomsRepo from "./RoomsRepo";
import { createBookings, createRooms, formatDate } from "./helpers";

// ***** Query selectors *****
// const searchByDateButton = document.querySelector('#searchByDateButton');
const nameAndLogo = document.querySelector('.hotel-brand');
const dashboard = document.querySelector('.dashboard');
const dateInput = document.querySelector('.date-input');
const dateSearchForm = document.querySelector('.date-search-form');
const dateApologyMessage = document.querySelector('#dateApologyMessage');
const displayBookings = document.querySelector('.display-bookings');
const bookingsGrid = document.querySelector('.bookings-container');
const filterSearchForm = document.querySelector('.filter-search-form');
const filterApologyMessage = document.querySelector('#filterApologyMessage');
const availableRooms = document.querySelector('.available-rooms');
const roomsGrid = document.querySelector('.rooms-container');


let allBookings, allRooms, currentUser, userBookings;


// ***** API calls *****
// TODO move these to a separate file later?
const fetchCustomers = fetch('http://localhost:3001/api/v1/customers')
  .then(checkForError)
  .catch(err => displayErrorMessage(err));

const fetchRooms = fetch('http://localhost:3001/api/v1/rooms')
  .then(checkForError)
  .catch(err => displayErrorMessage(err));

const fetchBookings = fetch('http://localhost:3001/api/v1/bookings')
  .then(checkForError)
  .catch(err => displayErrorMessage(err));


// ***** Functions *****
function loadData() {
  Promise.all([fetchBookings, fetchCustomers, fetchRooms])
    .then(values => createDashboard(values));
}

function checkForError(response) {
  if (!response.ok) {
    // TODO tweak error message to make it actually helpful
    throw new Error('There has been an error.');
  } else {
    return response.json();
  }
}

function displayErrorMessage(err) {
  let message = '';

  if (err.message === 'Failed to fetch') {
    message = 'Something went wrong. Please check your internet connection.';
    // TODO tweak this to use query selector and show things in the right place
    // bigErrorMessage.innerText = message;
    // show(bigErrorMessage);
    // hide(formErrorMessage);
  } else {
    message = err.message;
    // TODO tweak this to use query selector and show things in the right place
    // formErrorMessage.innerText = message;
    // show(formErrorMessage);
    // hide(bigErrorMessage);
  }
}

function createDashboard(values) {
  const rawBookings = values[0];
  const rawCustomers = values[1];
  const rawRooms = values[2];

  allBookings = 
    new BookingsRepo(createBookings(rawBookings, rawCustomers, rawRooms));

  allRooms = new RoomsRepo(createRooms(rawRooms));

  // TODO change this later so the user is not hard-coded
  currentUser = new Customer({
    id: 1,
    name: 'Sasha Sosure'
  });

  userBookings = allBookings.filterByCustomer(currentUser.id);

  renderLanding(currentUser, userBookings);
}

function renderLanding(currentUser, userBookings) {
  show(dashboard);
  hide(availableRooms);
  renderUserInfo(currentUser, userBookings);
  renderBookings(userBookings);
}

function renderUserInfo(customer, userBookings) {
  const firstName = document.querySelector('#greetingName');
  const points = document.querySelector('#points');

  firstName.innerText = customer.getFirstName();
  points.innerText = userBookings.calculateTotalPoints(customer.id);
}

function renderBookings(bookingsRepo) {
  clear(bookingsGrid);

  bookingsRepo.bookings.forEach(booking => {
    bookingsGrid.innerHTML += `
      <div class="booking" id="${booking.id}">
        <div>
          <p class="booking-date">${booking.date}</p>
          <p>$${booking.room.costPerNight}</p>
        </div>
        <div class="booking-room-details">
          <p>${booking.room.type}</p>
          <p>${booking.room.numBeds} ${booking.room.bedSize}</p>
        </div>
      </div>`
    ;
  });
}

function showAvailableRooms(date) {
  hide(dashboard);
  show(availableRooms);

  const availableDate = document.querySelector('#availableDate');
  availableDate.innerText = date;
  // console.log("date in findAvailableRooms: ", date);
  // console.log("raw date: ", date);
  date = formatDate(date);
  // console.log("formatted date: ", date);
  // console.log('all bookings: ', allBookings);
  // console.log('all rooms: ', allRooms);
  const rooms = allRooms.filterByAvailability(allBookings, date);
  console.log(rooms);
  renderRooms(rooms);
}

function renderRooms(rooms) {
  clear(roomsGrid);

  let bidet = '';

  rooms.rooms.forEach(room => {
    if (room.bidet) {
      bidet = '<i class="fas fa-toilet"></i> bidet';
    } else {
      bidet = '';
    }

    roomsGrid.innerHTML += `
      <div class="room" id="${room.number}">
        <div class=room-info">
          <p class="room-name">Room ${room.number}</p>
          <div class="room-details">
            <p>${room.type}</p>
            <p> <i class="fas fa-bed"></i> ${room.numBeds} ${room.bedSize}</p>
            <p> ${bidet}</p>
          </div>
        </div>
        <div class="reserve-room">
          <div class="book-room-button">book room</div>
        </div>
      </div>`
    ;
  });
}

function clear(HTMLelement) {
  HTMLelement.innerHTML = '';
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}


// ***** Event listeners *****
window.addEventListener('load', loadData);

dateSearchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const date = document.querySelector('.date-selector').value;
  // console.log("date in event listener: ", date);
  // console.log("type of date in event listener: ", typeof(date));
  showAvailableRooms(date);
});

nameAndLogo.addEventListener('click', function() {
  renderLanding(currentUser, userBookings);
});