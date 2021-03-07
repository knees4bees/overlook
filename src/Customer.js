class Customer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  getFirstName() {
    const splitName = this.name.split(' ');
    return splitName[0];
  }
};

export default Customer;