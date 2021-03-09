import chai from 'chai';
const expect = chai.expect;

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
  room3 as testRoom3, 
  room4 as testRoom4
} from './test-data';

import { 
  booking1 as testBooking1, 
  booking2 as testBooking2, 
  booking3 as testBooking3, 
  booking4 as testBooking4, 
  booking5 as testBooking5, 
  booking6 as testBooking6, 
  booking7 as testBooking7
} from './test-data';

import BookingsRepo from '../src/BookingsRepo';



describe('BookingsRepo', function() {
  let customer1, customer2, customer3;
  let room1, room2, room3, room4;
  let booking1, booking2, booking3, booking4, booking5, booking6, booking7;
  let bookingsRepo;

  beforeEach(function() {
    customer1 = new Customer(testCustomer1);
    customer2 = new Customer(testCustomer2);
    customer3 = new Customer(testCustomer3);
    room1 = new Room(testRoom1);
    room2 = new Room(testRoom2);
    room3 = new Room(testRoom3);
    room4 = new Room(testRoom4);
    booking1 = new Booking(testBooking1, customer2, room1);
    booking2 = new Booking(testBooking2, customer3, room2);
    booking3 = new Booking(testBooking3, customer1, room2);
    booking4 = new Booking(testBooking4, customer1, room3);
    booking5 = new Booking(testBooking5, customer2, room1);
    booking6 = new Booking(testBooking6, customer1, room2);
    booking7 = new Booking(testBooking7, customer3, room4);
    bookingsRepo = new BookingsRepo([
      booking1, 
      booking2, 
      booking3, 
      booking4, 
      booking5, 
      booking6, 
      booking7
    ]);
  });

  it('should be a function', function() {
    expect(BookingsRepo).to.be.a('function');
  });

  it('should be an instance of a BookingsRepo', function() {
    expect(bookingsRepo).to.be.an.instanceOf(BookingsRepo);
  });

  it('should hold all bookings in an array', function() {
    expect(bookingsRepo.bookings).to.have.length(7);
    expect(bookingsRepo.bookings[0]).to.be.an.instanceOf(Booking);
  });

  it('should filter bookings by customer', function() {
    const cust1BookingsRepo = bookingsRepo.filterByCustomer(1);
    const cust2BookingsRepo = bookingsRepo.filterByCustomer(2);
    const cust3BookingsRepo = bookingsRepo.filterByCustomer(3);
    const cust1FilteredRepo = new BookingsRepo([booking3, booking4, booking6]);
    const cust2FilteredRepo = new BookingsRepo([booking1, booking5]);
    const cust3FilteredRepo = new BookingsRepo([booking2, booking7]);

    expect(cust1BookingsRepo.bookings).to.have.length(3);
    expect(cust1BookingsRepo).to.eql(cust1FilteredRepo);
    expect(cust2BookingsRepo.bookings).to.have.length(2);
    expect(cust2BookingsRepo).to.eql(cust2FilteredRepo);
    expect(cust3BookingsRepo.bookings).to.have.length(2);
    expect(cust3BookingsRepo).to.eql(cust3FilteredRepo);
  });

  it('should calculate the total spent by a customer for all time', function() {
    const cust1spent = bookingsRepo.calculateTotalSpent(1);
    const cust2spent = bookingsRepo.calculateTotalSpent(2);
    const cust3spent = bookingsRepo.calculateTotalSpent(3);

    expect(cust1spent).to.equal('1445.90');
    expect(cust2spent).to.equal('716.80');
    expect(cust3spent).to.equal('730.48');
  });

  it('should calculate a customer\'s total points', function() {
    const cust1points = bookingsRepo.calculateTotalPoints(1);
    const cust2points = bookingsRepo.calculateTotalPoints(2);
    const cust3points = bookingsRepo.calculateTotalPoints(3);

    expect(cust1points).to.equal('144590');
    expect(cust2points).to.equal('71680');
    expect(cust3points).to.equal('73048');
  });

  it('should filter bookings by date', function() {
    const date1BookingsRepo = bookingsRepo.filterByDate('2020/04/22');
    const date2BookingsRepo = bookingsRepo.filterByDate('2020/01/24');
    const date3BookingsRepo = bookingsRepo.filterByDate('2020/02/16');
    const date4BookingsRepo = bookingsRepo.filterByDate('2020/03/01');

    const filteredDate1Repo = new BookingsRepo([booking1]);
    const filteredDate2Repo = new BookingsRepo([booking2]);
    const filteredDate3Repo = 
      new BookingsRepo([booking4, booking5, booking6, booking7]);
    const filteredDate4Repo = new BookingsRepo([]);

    expect(date1BookingsRepo.bookings).to.have.length(1);
    expect(date1BookingsRepo).to.eql(filteredDate1Repo);
    expect(date2BookingsRepo.bookings).to.have.length(1);
    expect(date2BookingsRepo).to.eql(filteredDate2Repo);
    expect(date3BookingsRepo.bookings).to.have.length(4);
    expect(date3BookingsRepo).to.eql(filteredDate3Repo);
    expect(date4BookingsRepo.bookings).to.have.length(0);
    expect(date4BookingsRepo).to.eql(filteredDate4Repo);
  });
});
