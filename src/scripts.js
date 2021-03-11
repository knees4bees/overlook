import Customer from "./Customer";
import BookingsRepo from "./BookingsRepo";
import RoomsRepo from "./RoomsRepo";
import { createBookings, createRooms, formatDate } from "./helpers";

// ***** Query selectors *****
const nameAndLogo = document.querySelector('.hotel-brand');
const dashboard = document.querySelector('.dashboard');
const dateSearchForm = document.querySelector('.date-search-form');
const chosenDate = document.querySelector('.date-selector');
const dateApologyMessage = document.querySelector('#dateApologyMessage');
const bookingsGrid = document.querySelector('.bookings-container');
const checkboxContainer = document.querySelector('.checkbox-container');
const checkboxes = document.querySelectorAll('.room-type');
const filterApologyMessage = document.querySelector('#filterApologyMessage');
const availableRooms = document.querySelector('.available-rooms');
const roomsGrid = document.querySelector('.rooms-container');
const bookRoomFetchErrorMessage = document.querySelector('#bookRoomErrorMessage');
const initialFetchErrorMessage = document.querySelector('#initialFetchErrorMessage');


let allBookings, allRooms, currentUser, userBookings, desiredDate;


// ***** API calls *****
const fetchCustomers = fetch('http://localhost:3001/api/v1/customers')
  .then(checkForError)
  .catch(err => initialFetchErrorMessage.innerText = displayErrorMessage(err));

const fetchRooms = fetch('http://localhost:3001/api/v1/rooms')
  .then(checkForError)
  .catch(err => initialFetchErrorMessage.innerText = displayErrorMessage(err));

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
    throw new Error('Something went wrong with your request. Please contact the site administrator for assistance.');
  } else {
    return response.json();
  }
}

function displayErrorMessage(err) {
  let message = '';

  if (err.message === 'Failed to fetch') {
    message = 'Something went wrong. Please check your internet connection.';
  } else {
    message = err.message;
  }

  return message;
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
  desiredDate = null;
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
  hide(dateApologyMessage);
  clear(bookingsGrid);

  if (bookingsRepo.bookings.length === 0) {
    show(dateApologyMessage);
  }

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
  desiredDate = date;
  const availableDate = document.querySelector('#availableDate');
  availableDate.innerText = desiredDate;
  desiredDate = formatDate(desiredDate);

  const roomsRepo = allRooms.filterByAvailability(allBookings, desiredDate);

  if (roomsRepo.rooms.length === 0) {
    show(dateApologyMessage);
  } else {
    hide(dashboard);
    show(availableRooms);
    checkboxes.forEach(checkbox => checkbox.checked = true);
    renderRooms(roomsRepo);
  }
}

function renderRooms(roomsRepo) {
  hide(filterApologyMessage);
  clear(roomsGrid);
  clear(bookRoomFetchErrorMessage);

  if (roomsRepo.rooms.length === 0) {
    show(filterApologyMessage);
  }

  let bidet = '';

  roomsRepo.rooms.forEach(room => {
    if (room.bidet) {
      bidet = '<i class="fas fa-toilet"></i> bidet';
    } else {
      bidet = '';
    }

    roomsGrid.innerHTML += `
      <div class="room">
        <div class=room-info">
          <p class="room-name">Room ${room.number}</p>
          <div class="room-details">
            <p>${room.type}</p>
            <p> <i class="fas fa-bed"></i> ${room.numBeds} ${room.bedSize}</p>
            <p> ${bidet}</p>
          </div>
        </div>
        <div class="reserve-room">
          <button class="book-room-button" id="${room.number}-${desiredDate}">book room</button>
          <div class="hidden confirmation-container" id="confirmation-for-${room.number}-${desiredDate}">
            <p class="confirmation-message">You're booked!</p>
            <p class="confirmation-message">Confirmation number <span id="confirmation-number-for-${room.number}-${desiredDate}"></span></p>
          </div>
        </div>
      </div>`
    ;
  });
}

function showFilteredRooms() {
  const types = getRoomTypes();
  const rooms = getRooms(types);
  renderRooms(rooms);
}

function getRoomTypes() {
  const types = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      types.push(checkbox.value);
    }
  });

  return types;
}

function getRooms(types) {
  let rooms = [];

  types.forEach(type => {
    const roomsOfThisType = allRooms.filterByType(type).rooms;
    rooms = [...rooms, ...roomsOfThisType];
  });

  const result = new RoomsRepo(rooms);

  return result;
}

function bookRoom(targetId) {
  const roomNumberComponent = targetId.split('-')[0];
  const dateComponent = targetId.split('-')[1];

  const room = {
    "userID": currentUser.id,
    "date": dateComponent,
    "roomNumber": parseInt(roomNumberComponent)
  };

  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(room),
  })
    .then(checkForError)
    .then(data => updateRoom(data.newBooking.id, targetId))
    .catch(err => bookRoomFetchErrorMessage.innerText = displayErrorMessage(err));
}

function updateRoom(newBookingId, targetId) {
  const targetButton = document.getElementById(targetId);
  const confirmationId = 'confirmation-for-' + targetId;
  const confirmationNumberId = 'confirmation-number-for-' + targetId;
  const confirmationContainer = document.getElementById(confirmationId);
  const confirmationNumber = document.getElementById(confirmationNumberId);
  confirmationNumber.innerText = newBookingId;
  hide(targetButton);
  show(confirmationContainer);
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

nameAndLogo.addEventListener('click', function() {
  renderLanding(currentUser, userBookings);
});

dateSearchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  showAvailableRooms(chosenDate.value);
});

roomsGrid.addEventListener('click', function(event) {
  bookRoom(event.target.id);
})

checkboxContainer.addEventListener('click', function() {
  showFilteredRooms();
});