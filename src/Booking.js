class Booking {
  constructor(data, customer, room) {
    this.id = data.id;
    this.guest = customer;
    this.date = data.date;
    this.room = room;
  }
};

export default Booking;