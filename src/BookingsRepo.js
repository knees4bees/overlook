class BookingsRepo {
  constructor(bookings) {
    this.bookings = [...bookings];
  }

  filterByCustomer(custId) {
    const bookings = this.bookings.filter(booking => {
      return booking.guest.id === custId;
    });

    return new BookingsRepo(bookings);
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

  calculateTotalPoints(custId) {
    const dollarAmount = this.calculateTotalSpent(custId);
    const totalPoints = Math.round(parseFloat(dollarAmount) * 100).toString();
    return totalPoints;
  }

  filterByDate(date) {
    const bookings = this.bookings.filter(booking => booking.date === date);
    return new BookingsRepo(bookings);
  }
}

export default BookingsRepo;