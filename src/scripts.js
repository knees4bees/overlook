// put DOM manipulation, fetch calls, and helper functions in here
// (can move fetch calls out to a separate file later)

import Booking from "./Booking";
import Customer from "./Customer";
import Room from "./Room";

function createBookings(rawBookingsData, rawCustomersData, rawRoomsData) {
  const bookings = [];

  const bookingsData = rawBookingsData.bookings;
  const customersData = rawCustomersData.customers;
  const roomsData = rawRoomsData.rooms;

  bookingsData.forEach(bookingData => {
    const foundCustomer = customersData.find(customer => customer.id === bookingData.userID);
    const customer = new Customer(foundCustomer);

    const foundRoom = roomsData.find(room => room.number === bookingData.roomNumber);
    const room = new Room(foundRoom);

    const booking = new Booking(bookingData, customer, room);
    bookings.push(booking);
  })

  return bookings;
}

export default createBookings;