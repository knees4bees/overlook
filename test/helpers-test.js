import chai from 'chai';
const expect = chai.expect;

import { createBookings, createRooms, formatDate } from '../src/helpers';
import Customer from '../src/Customer';
import Room from '../src/Room';
import Booking from '../src/Booking';

import { 
  customer1 as testCustomer1, 
  customer2 as testCustomer2, 
  customer3 as testCustomer3 
} from './test-data';

import { 
  room1 as testRoom1, 
  room2 as testRoom2, 
  room3 as testRoom3 
} from './test-data';

import { 
  booking1 as testBooking1, 
  booking2 as testBooking2, 
  booking3 as testBooking3, 
  booking4 as testBooking4
} from './test-data';


describe('createBookings', function() {
  let customer1, customer2, customer3;
  let room1, room2, room3;
  let booking1, booking2, booking3, booking4;
  let bookings;
  let rawBookingsData, rawCustomersData, rawRoomsData;

  beforeEach(function() {
    rawBookingsData = {
      bookings: [testBooking1, testBooking2, testBooking3, testBooking4]
    };
    rawCustomersData = {
      customers: [testCustomer1, testCustomer2, testCustomer3]
    };
    rawRoomsData = {
      rooms: [testRoom1, testRoom2, testRoom3]
    };

    customer1 = new Customer(testCustomer1);
    customer2 = new Customer(testCustomer2);
    customer3 = new Customer(testCustomer3);
    room1 = new Room(testRoom1);
    room2 = new Room(testRoom2);
    room3 = new Room(testRoom3);
    booking1 = new Booking(testBooking1, customer2, room1);
    booking2 = new Booking(testBooking2, customer3, room2);
    booking3 = new Booking(testBooking3, customer1, room2);
    booking4 = new Booking(testBooking4, customer1, room3);
    bookings = [booking1, booking2, booking3, booking4];
  });

  it('should be a function', function() {
    expect(createBookings).to.be.a('function');
  });

  it('should return an array of Booking instances', function() {
    const myBookings = 
      createBookings(rawBookingsData, rawCustomersData, rawRoomsData);
    expect(myBookings).to.have.length(4);
    expect(myBookings).to.eql(bookings);
  });
});


describe('createRooms', function() {
  let room1, room2, room3;
  let rooms;
  let rawRoomsData;

  beforeEach(function() {
    rawRoomsData = {
      rooms: [testRoom1, testRoom2, testRoom3]
    };

    room1 = new Room(testRoom1);
    room2 = new Room(testRoom2);
    room3 = new Room(testRoom3);

    rooms = [room1, room2, room3];
  });

  it('should be a function', function() {
    expect(createRooms).to.be.a('function');
  });

  it('should return an array of Room instances', function() {
    const myRooms = createRooms(rawRoomsData);

    expect(myRooms).to.have.length(3);
    expect(myRooms).to.eql(rooms);
  });
});


describe('formatDate', function() {
  it('should be a function', function() {
    expect(formatDate).to.be.a('function');
  });

  it('should return an array of Room instances', function() {
    const rawDate1 = '2020-02-29';
    const rawDate2 = '2020-12-30';
    const niceDate1 = '2020/02/29';
    const niceDate2 = '2020/12/30';
    const formattedDate1 = formatDate(rawDate1);
    const formattedDate2 = formatDate(rawDate2);

    expect(formattedDate1).to.equal(niceDate1);
    expect(formattedDate2).to.equal(niceDate2);
  });
});
