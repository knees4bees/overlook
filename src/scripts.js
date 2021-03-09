import Booking from "./Booking";
import Customer from "./Customer";
import Room from "./Room";
import BookingsRepo from "./BookingsRepo";


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
  const message = '';

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

  const allBookings = new BookingsRepo(createBookings(rawBookings, rawCustomers, rawRooms));

  // TODO change this later so the user is not hard-coded
  const currentUser = new Customer({
    id: 1,
    name: 'Sasha Sosure'
  });
  const userBookings = allBookings.filterByCustomer(currentUser.id);

  renderUserInfo(currentUser, userBookings);
  renderBookings(userBookings);
}

// function createBookings(rawBookingsData, rawCustomersData, rawRoomsData) {
//   const bookings = [];

//   const bookingsData = rawBookingsData.bookings;
//   const customersData = rawCustomersData.customers;
//   const roomsData = rawRoomsData.rooms;

//   bookingsData.forEach(bookingData => {
//     const foundCustomer = customersData.find(customer => customer.id === bookingData.userID);
//     const customer = new Customer(foundCustomer);

//     const foundRoom = roomsData.find(room => room.number === bookingData.roomNumber);
//     const room = new Room(foundRoom);

//     const booking = new Booking(bookingData, customer, room);
//     bookings.push(booking);
//   })

//   return bookings;
// }

function renderUserInfo(customer, userBookings) {
  const firstName = document.querySelector('#greetingName');
  const points = document.querySelector('#points');

  firstName.innerText = customer.getFirstName();
  points.innerText = userBookings.calculateTotalPoints(customer.id);

}

function renderBookings(bookingsRepo) {
  const bookingsGrid = document.querySelector('.bookings-container');

  bookingsRepo.bookings.forEach(booking => {
    bookingsGrid.innerHTML += `${booking.id}`;
  });
}

// ***** Event listeners *****
window.addEventListener('load', loadData);

export default createBookings;