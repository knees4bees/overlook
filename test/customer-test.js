import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import { customer1 as testCustomer1, customer2 as testCustomer2, customer3 as testCustomer3, customer4 as testCustomer4 } from './test-data';



describe('Customer', function() {
  let customer1, customer2;

  beforeEach(function() {
    customer1 = new Customer(testCustomer1);
    customer2 = new Customer(testCustomer2);
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of a Customer', function() {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should have a unique id', function() {
    expect(customer1.id).to.equal(testCustomer1.id);
    expect(customer1.id).to.not.equal(testCustomer2.id);
  });

  it('should have a name', function() {
    expect(customer1.name).to.equal(testCustomer1.name);
    expect(customer2.name).to.not.equal(testCustomer1.name);
  });

  it('should be able to return first name only', function() {
    const firstName1 = customer1.getFirstName();
    const firstName2 = customer2.getFirstName();

    expect(firstName1).to.equal('Bob');
    expect(firstName2).to.equal('Kelly');
  });
});
