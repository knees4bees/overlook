import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import Room from '../src/Room';
import Booking from '../src/Booking';
import { customer1 as testCustomer1, customer2 as testCustomer2, customer3 as testCustomer3, customer4 as testCustomer4 } from './test-data';
import { room1 as testRoom1, room2 as testRoom2, room3 as testRoom3, room4 as testRoom4 } from './test-data';
import { booking1 as testBooking1, booking2 as testBooking2, booking3 as testBooking3, booking4 as testBooking4, booking5 as testBooking5, booking6 as testBooking6, booking7 as testBooking7} from './test-data';
import BookingsRepo from '../src/BookingsRepo';
import RoomsRepo from '../src/RoomsRepo';



describe('RoomsRepo', function() {
  let customer1, customer2, customer3, customer4;
  let room1, room2, room3, room4;
  let booking1, booking2, booking3, booking4, booking5, booking6, booking7;
  let bookingsRepo;
  let roomsRepo;

  beforeEach(function() {
    customer1 = new Customer(testCustomer1);
    customer2 = new Customer(testCustomer2);
    customer3 = new Customer(testCustomer3);
    customer4 = new Customer(testCustomer4);
    room1 = new Room(testRoom1);
    room2 = new Room(testRoom2);
    room3 = new Room(testRoom3);
    room4 = new Room(testRoom4);
    roomsRepo = new RoomsRepo([room1, room2, room3, room4]);

    booking1 = new Booking(testBooking1, customer2, room1);
    booking2 = new Booking(testBooking2, customer3, room2);
    booking3 = new Booking(testBooking3, customer1, room2);
    booking4 = new Booking(testBooking4, customer1, room3);
    booking5 = new Booking(testBooking5, customer2, room1);
    booking6 = new Booking(testBooking6, customer1, room2);
    booking7 = new Booking(testBooking7, customer3, room4);
    bookingsRepo = new BookingsRepo([booking1, booking2, booking3, booking4, booking5, booking6, booking7]);
  });

  it('should be a function', function() {
    expect(RoomsRepo).to.be.a('function');
  });

  it('should be an instance of a RoomsRepo', function() {
    expect(roomsRepo).to.be.an.instanceOf(RoomsRepo);
  });

  it('should hold all rooms in an array', function() {
    expect(roomsRepo.rooms).to.have.length(4);
    expect(roomsRepo.rooms[0]).to.be.an.instanceOf(Room);
  });

  it('should filter rooms by type', function() {
    const singleRoomsRepo = roomsRepo.filterByType('single room');
    const juniorRoomsRepo = roomsRepo.filterByType('junior suite');
    const suiteRoomsRepo = roomsRepo.filterByType('suite');
    const residentialRoomsRepo = roomsRepo.filterByType('residential suite');

    const filteredSingleRepo = new RoomsRepo([room3]);
    const filteredJuniorRepo = new RoomsRepo([]);
    const filteredSuiteRepo = new RoomsRepo([room2]);
    const filteredResidentialRepo = new RoomsRepo([room1, room4]);

    expect(singleRoomsRepo.rooms).to.have.length(1);
    expect(singleRoomsRepo).to.eql(filteredSingleRepo);
    expect(juniorRoomsRepo.rooms).to.have.length(0);
    expect(juniorRoomsRepo).to.eql(filteredJuniorRepo);
    expect(suiteRoomsRepo.rooms).to.have.length(1);
    expect(suiteRoomsRepo).to.eql(filteredSuiteRepo);
    expect(residentialRoomsRepo.rooms).to.have.length(2);
    expect(residentialRoomsRepo).to.eql(filteredResidentialRepo);
  });

  it('should filter rooms by availability', function() {
    const date1RoomsRepo = roomsRepo.filterByAvailability(bookingsRepo, '2020/04/22');
    const date2RoomsRepo = roomsRepo.filterByAvailability(bookingsRepo, '2020/01/24');
    const date3RoomsRepo = roomsRepo.filterByAvailability(bookingsRepo, '2020/02/16');

    const filteredDate1Repo = new RoomsRepo([room2, room3, room4]);
    const filteredDate2Repo = new RoomsRepo([room1, room3, room4]);
    const filteredDate3Repo = new RoomsRepo([]);

    expect(date1RoomsRepo.rooms).to.have.length(3);
    expect(date1RoomsRepo).to.eql(filteredDate1Repo);
    expect(date2RoomsRepo.rooms).to.have.length(3);
    expect(date2RoomsRepo).to.eql(filteredDate2Repo);
    expect(date3RoomsRepo.rooms).to.have.length(0);
    expect(date3RoomsRepo).to.eql(filteredDate3Repo);
  });
});
