import chai from 'chai';
const expect = chai.expect;

import Room from '../src/Room';
import { room1 as testRoom1, room2 as testRoom2, room3 as testRoom3 } from './test-data';



describe('Room', function() {
  let room1, room2, room3;

  beforeEach(function() {
    room1 = new Room(testRoom1);
    room2 = new Room(testRoom2);
    room3 = new Room(testRoom3);
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of a Room', function() {
    expect(room1).to.be.an.instanceOf(Room);
  });

  it('should have a unique number', function() {
    expect(room1.number).to.equal(1);
    expect(room2.number).to.not.equal(1);
  });

  it('should have a room type', function() {
    expect(room1.type).to.equal('residential suite');
    expect(room2.type).to.equal('suite');
    expect(room3.type).to.equal('single room');
  });

  it('should say whether or not it has a bidet', function() {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
    expect(room3.bidet).to.equal(false);
  });

  it('should have a bed size', function() {
    expect(room1.bedSize).to.equal('queen');
    expect(room2.bedSize).to.equal('full');
    expect(room3.bedSize).to.equal('king');
  });

  it('should have a number of beds', function() {
    expect(room1.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
    expect(room3.numBeds).to.equal(1);
  });

  it('should have a cost per night with two decimal places', function() {
    expect(room1.costPerNight).to.equal('358.40');
    expect(room2.costPerNight).to.equal('477.38');
    expect(room3.costPerNight).to.equal('491.14');
  });
});
