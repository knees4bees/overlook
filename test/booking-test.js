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
  room3 as testRoom3 
} from './test-data';

import { 
  booking1 as testBooking1, 
  booking2 as testBooking2, 
  booking3 as testBooking3, 
  booking4 as testBooking4
} from './test-data';



describe('Booking', function() {
  let customer1, customer2, customer3;
  let room1, room2, room3;
  let booking1, booking2, booking3, booking4;

  beforeEach(function() {
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
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of a Booking', function() {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should have a unique id', function() {
    expect(booking1.id).to.equal('0test5fwrgu4i7k55hl6sz');
    expect(booking2.id).to.not.equal('0test5fwrgu4i7k55hl6sz');
  });

  it('should have a guest', function() {
    expect(booking1.guest).to.be.an.instanceOf(Customer);
    expect(booking1.guest).to.eql(customer2); 
    expect(booking2.guest).to.eql(customer3); 
    expect(booking3.guest).to.eql(customer1); 
    expect(booking4.guest).to.eql(customer1); 
  });

  it('should have a date', function() {
    expect(booking1.date).to.equal('2020/04/22');
    expect(booking2.date).to.equal('2020/01/24');
  });

  it('should have a room', function() {
    expect(booking1.room).to.eql(room1); 
    expect(booking2.room).to.eql(room2); 
    expect(booking3.room).to.eql(room2); 
    expect(booking4.room).to.eql(room3); 
  });
});
