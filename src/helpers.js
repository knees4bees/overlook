import Customer from '../src/Customer';
import Room from '../src/Room';
import Booking from '../src/Booking';

function createBookings(rawBookingsData, rawCustomersData, rawRoomsData) {
  const bookings = [];

  const bookingsData = rawBookingsData.bookings;
  const customersData = rawCustomersData.customers;
  const roomsData = rawRoomsData.rooms;

  bookingsData.forEach(bookingData => {
    const foundCustomer = customersData.find(customer => {
      return customer.id === bookingData.userID
    });
    const customer = new Customer(foundCustomer);

    const foundRoom = roomsData.find(room => {
      return room.number === bookingData.roomNumber;
    });
    const room = new Room(foundRoom);

    const booking = new Booking(bookingData, customer, room);
    bookings.push(booking);
  })

  return bookings;
}

function createRooms(rawRoomsData) {
  const rooms = [];

  const roomsData = rawRoomsData.rooms;

  roomsData.forEach(roomData => {
    const room = new Room(roomData);
    rooms.push(room);
  });

  return rooms;
}

function formatDate(date) {
  const prettyDate = date.replace(/-/g, '/');
  return prettyDate;
}


export { createBookings, createRooms, formatDate };