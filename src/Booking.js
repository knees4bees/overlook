class Booking {
  constructor(bookingData, customer, room) {
    this.id = bookingData.id;
    this.guest = customer;
    this.date = bookingData.date;
    this.room = room;
  }
};

export default Booking;