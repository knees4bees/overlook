import Customer from "./Customer";
import BookingsRepo from "./BookingsRepo";
import RoomsRepo from "./RoomsRepo";
import { createBookings, createRooms, formatDate } from "./helpers";

// ***** Query selectors *****
// const searchByDateButton = document.querySelector('#searchByDateButton');
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


let allBookings, allRooms, currentUser, userBookings;


// ***** API calls *****
// TODO move these to a separate file later?
const fetchCustomers = fetch('http://localhost:3001/api/v1/customers')
  .then(checkForError)
  // TODO wrap displayErrorMessage in function that puts message in the right place (in this case, on the landing display)

    // bigErrorMessage.innerText = message;
    // show(bigErrorMessage);
    // hide(formErrorMessage);
  .catch(err => displayErrorMessage(err));

const fetchRooms = fetch('http://localhost:3001/api/v1/rooms')
  .then(checkForError)
  // TODO wrap displayErrorMessage in function that puts message in the right place (in this case, on the landing display)
  .catch(err => displayErrorMessage(err));

const fetchBookings = fetch('http://localhost:3001/api/v1/bookings')
  .then(checkForError)
  // TODO wrap displayErrorMessage in function that puts message in the right place (in this case, on the landing display)
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
  console.log("message in displayErrorMessage: ", message);
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
  hide(dashboard);
  show(availableRooms);

  const availableDate = document.querySelector('#availableDate');
  availableDate.innerText = date;
  date = formatDate(date);

  const rooms = allRooms.filterByAvailability(allBookings, date);

  checkboxes.forEach(checkbox => checkbox.checked = true);
  renderRooms(rooms, date);
}

function renderRooms(roomsRepo, desiredDate) {
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
          <div class="book-room-button" id="${room.number}-${desiredDate}">book room</div>
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
  // TODO first convert roomNumber into var room holding data object of required format
    // required format for POST request
    // { "userID": 48, "date": "2019/09/23", "roomNumber": 4 }

  // split targetId into two pieces, one for roomNumber and other for date
  console.log("targetId: ", targetId);
  const roomNumber = targetId.split('-')[0];
  console.log("roomNumber: ", roomNumber);
  const desiredDate = targetId.split('-')[1];
  console.log("desiredDate: ", desiredDate);

  // TODO figure out why this format isn't working
  // ... but first use this opportunity to handle 422s gracefully!
  const room = {
    "userID": currentUser.id,
    "date": desiredDate,
    "roomNumber": roomNumber
  };
  console.log("room: ", room);


  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(room),
  })
    .then(checkForError)
    // TODO move returned data into whatever function needs it (render, etc.)
    .then(data => console.log("here's the data: ", data))

    .catch(err => bookRoomFetchErrorMessage.innerText = displayErrorMessage(err));
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
  console.log("hi, here's the target id: ", event.target.id);
  bookRoom(event.target.id);
})

checkboxContainer.addEventListener('click', showFilteredRooms);