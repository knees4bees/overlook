class Customer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  getFirstName() {
    console.log('yo');
  }
};

export default Customer;