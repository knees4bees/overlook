import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import { customer1, customer2, customer3, customer4 } from './test-data';



describe('Customer', function() {
  let cust1, cust2;

  beforeEach(function() {
    cust1 = new Customer(customer1);
    cust2 = new Customer(customer2);
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of a Customer', function() {
    expect(cust1).to.be.an.instanceOf(Customer);
  });

  it('should have a name', function() {
    expect(cust1.name).to.equal(customer1.name);
  });

  it('should have a unique id', function() {
    expect(cust1.id).to.equal(customer1.id);
    expect(cust1.id).to.not.equal(customer2.id);
  });
});
