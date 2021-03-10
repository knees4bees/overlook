class RoomsRepo {
  constructor(rooms) {
    this.rooms = [...rooms];
  }

  filterByType(type) {
    const filteredRooms = this.rooms.filter(room => room.type === type);
    return new RoomsRepo(filteredRooms);
  }

  filterByAvailability(bookingsRepo, date) {
    const roomNumbersNotAvailable = 
      bookingsRepo.filterByDate(date).bookings.map(booking => {
        return booking.room.number;
      });

    const availableRooms = this.rooms.filter(room => {
      return !roomNumbersNotAvailable.includes(room.number)
    });

    return new RoomsRepo(availableRooms);
  }
}

export default RoomsRepo;