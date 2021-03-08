import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import Room from '../src/Room';
import Booking from '../src/Booking';
import { customer1 as testCustomer1, customer2 as testCustomer2, customer3 as testCustomer3, customer4 as testCustomer4 } from './test-data';
import { room1 as testRoom1, room2 as testRoom2, room3 as testRoom3 } from './test-data';
import { booking1 as testBooking1, booking2 as testBooking2, booking3 as testBooking3, booking4 as testBooking4} from './test-data';
import BookingsRepo from '../src/BookingsRepo';



describe('BookingsRepo', function() {
  let customer1, customer2, customer3, customer4;
  let room1, room2, room3;
  let booking1, booking2, booking3, booking4;
  let bookingsRepo;

  beforeEach(function() {
    customer1 = new Customer(testCustomer1);
    customer2 = new Customer(testCustomer2);
    customer3 = new Customer(testCustomer3);
    customer4 = new Customer(testCustomer4);
    room1 = new Room(testRoom1);
    room2 = new Room(testRoom2);
    room3 = new Room(testRoom3);
    booking1 = new Booking(testBooking1, customer2, room1);
    booking2 = new Booking(testBooking2, customer3, room2);
    booking3 = new Booking(testBooking3, customer1, room2);
    booking4 = new Booking(testBooking4, customer1, room3);
    bookingsRepo = new BookingsRepo(booking1, booking2, booking3, booking4);
  });

  it('should be a function', function() {
    expect(BookingsRepo).to.be.a('function');
  });

  it('should be an instance of a BookingsRepo', function() {
    expect(bookingsRepo).to.be.an.instanceOf(BookingsRepo);
  });

  it('should hold all bookings in an array', function() {
    expect(bookingsRepo.bookings).to.have.length(4);
    expect(bookingsRepo.bookings[0]).to.be.an.instanceOf(Booking);
  });
});