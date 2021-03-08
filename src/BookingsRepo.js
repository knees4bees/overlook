class BookingsRepo {
  // New plan: have this take in an array of pre-constructed Booking instances
  constructor(bookings) {
    this.bookings = [...bookings];
  }

  filterByCustomer(custId) {
    const filteredBookings = this.bookings.filter(booking => booking.guest.id === custId);
    return new BookingsRepo(filteredBookings);
  }

  calculateTotalSpent(custId) {
    const bookings = this.filterByCustomer(custId).bookings;

    const total = bookings.reduce((sum, booking) => {
      const costPerNight = parseFloat(booking.room.costPerNight);
      sum += costPerNight;
      return sum;
    }, 0);
    return total.toFixed(2);
  }
};

export default BookingsRepo;